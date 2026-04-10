import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SendHorizontal, Sparkles } from 'lucide-react';
import styles from './Agent.module.css';
import aiBotGif from '../assets/AI Bot.gif';
import { useCatalog } from '../context/CatalogContext';

const SYSTEM_PROMPT = [
  'You are Prince AI Assistant for Prince Vegetables.',
  'Help users with fresh vegetables, availability, shopping guidance, product sections, and general store questions.',
  'Keep replies short, friendly, practical, and fast to read.',
  'If the user asks about a specific vegetable, suggest the most relevant category or shopping tip.',
  'If the user asks for image/photo/pic, provide direct image URLs from the provided shop image library context.',
].join(' ');

const WELCOME_HEADING = 'Hello! How Can I Help You Today?';
const IMAGE_MARKDOWN_REGEX = /!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/gi;
const IMAGE_URL_REGEX = /(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|svg))/gi;

const extractImageUrls = (text) => {
  const source = String(text ?? '');
  const urls = new Set();
  let match;

  while ((match = IMAGE_MARKDOWN_REGEX.exec(source)) !== null) {
    urls.add(match[1]);
  }

  while ((match = IMAGE_URL_REGEX.exec(source)) !== null) {
    urls.add(match[1]);
  }

  return Array.from(urls);
};

const removeImageTokensFromText = (text) => {
  const source = String(text ?? '');
  return source
    .replace(IMAGE_MARKDOWN_REGEX, '')
    .replace(IMAGE_URL_REGEX, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const Agent = () => {
  const { sections, adBanners, sectionOrder, storageStatus, resolveImageRef, resolveBannerRef } = useCatalog();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const scrollerRef = useRef(null);

  const shouldShowWelcome = useMemo(() => !hasStartedChat && messages.length === 0, [hasStartedChat, messages.length]);

  const websiteContext = useMemo(() => {
    const totalProducts = sections.reduce((count, section) => count + section.items.length, 0);
    const shopImageLibrary = sections.flatMap((section) =>
      section.items.map((item) => ({
        id: item.id,
        name: item.name,
        category: section.title,
        imageUrl: resolveImageRef(item.imageRef)
      }))
    );
    const bannerImageLibrary = adBanners.map((bannerRef, index) => ({
      id: `banner-${index + 1}`,
      imageUrl: resolveBannerRef(bannerRef)
    }));

    return {
      permissions: 'read-only',
      generatedAt: new Date().toISOString(),
      shopPage: {
        storageStatus,
        sectionOrder,
        totalSections: sections.length,
        totalProducts,
        shopImageLibrary,
        bannerImageLibrary,
        adBanners,
        sections: sections.map((section) => ({
          id: section.id,
          title: section.title,
          subtitle: section.subtitle,
          unit: section.unit,
          productCount: section.items.length,
          items: section.items.map((item) => ({
            id: item.id,
            name: item.name,
            weight: item.weight,
            price: item.price,
            discount: item.discount,
            imageUrl: resolveImageRef(item.imageRef)
          }))
        }))
      },
      contactPage: {
        available: true,
        source: 'contact branch snapshot',
        note: 'Read-only contact information imported from the contact branch implementation.',
        contactDetails: {
          phone: '+91 8669193011',
          email: 'princethakur545454@gmail.com',
          address:
            'Street No. 5, Shree Guru Datta Colony 1, Walhekarwadi, Sector No. 30, Nigdi, Pimpri-Chinchwad, Maharashtra 411033',
          whatsapp: 'https://wa.me/918669193011?text=Hello%20Prince%20Vegetables%2C%20I%20want%20to%20place%20an%20order.',
          call: 'tel:+918669193011',
          gmail:
            'mailto:princethakur545454@gmail.com?subject=Order%20Enquiry%20-%20Prince%20Vegetables&body=Hi%20Prince%20Vegetables%2C%0A%0AI%20want%20to%20know%20more%20about%20today%27s%20fresh%20stock.'
        },
        map: {
          desktop: 'https://www.google.com/maps/place/Prince+Vegetables/@18.6400846,73.7597022,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b9ec5107d9a1:0x12872532b0000000!8m2!3d18.6400846!4d73.7622771!16s%2Fg%2F11rsslnq8q?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D',
          mobile: 'https://maps.app.goo.gl/j6F3K9MrbL2EWhAp8?g_st=aw',
          embed: 'https://www.google.com/maps?q=18.6400846,73.7622771&z=17&output=embed'
        },
        businessHours: [
          { day: 'Friday', hours: '7 am-10 pm' },
          { day: 'Saturday', hours: '7 am-10 pm' },
          { day: 'Sunday', hours: '7 am-10 pm' },
          { day: 'Monday', hours: '7 am-10 pm' },
          { day: 'Tuesday', hours: '7 am-10 pm' },
          { day: 'Wednesday', hours: '7 am-10 pm' },
          { day: 'Thursday', hours: '7 am-10 pm' }
        ]
      }
    };
  }, [adBanners, resolveBannerRef, resolveImageRef, sectionOrder, sections, storageStatus]);

  useEffect(() => {
    let currentLength = 0;
    let isDeleting = false;
    let pauseTicks = 0;

    const timerId = window.setInterval(() => {
      if (pauseTicks > 0) {
        pauseTicks -= 1;
        return;
      }

      if (!isDeleting) {
        currentLength = Math.min(currentLength + 1, WELCOME_HEADING.length);
        if (currentLength === WELCOME_HEADING.length) {
          isDeleting = true;
          pauseTicks = 10;
        }
      } else {
        currentLength = Math.max(currentLength - 1, 0);
        if (currentLength === 0) {
          isDeleting = false;
          pauseTicks = 4;
        }
      }

      setTypewriterText(WELCOME_HEADING.slice(0, currentLength));
    }, 45);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const scrollToBottom = () => {
    if (!scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  };

  const callAgentApi = async (conversationMessages) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 18000);

    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        systemPrompt: SYSTEM_PROMPT,
        messages: conversationMessages,
        websiteContext,
      }),
    });

    window.clearTimeout(timeoutId);

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload?.message || 'Unable to contact the AI assistant right now.');
    }

    return payload.reply || payload.message || 'I could not generate a response just now.';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextMessage = inputValue.trim();
    if (!nextMessage) {
      return;
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: nextMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInputValue('');
    setHasStartedChat(true);
    setIsTyping(true);

    window.requestAnimationFrame(scrollToBottom);

    try {
      const conversationHistory = [
        ...messages.map((message) => ({ role: message.role, content: message.text })),
        { role: 'user', content: nextMessage }
      ].slice(-8);

      const assistantReply = await callAgentApi(conversationHistory);

      const assistantMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        text: assistantReply,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      const assistantMessage = {
        id: `${Date.now()}-assistant-error`,
        role: 'assistant',
        text: error instanceof Error ? error.message : 'The AI assistant is temporarily unavailable. Please try again.',
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } finally {
      setIsTyping(false);
      window.requestAnimationFrame(scrollToBottom);
    }
  };

  return (
    <div className={styles.agentPage}>
      <section className={`${styles.chatShell} glass`}>
        <header className={styles.chatHeader}>
          <div className={styles.headerBadge}>
            <Sparkles size={16} />
            <span>Prince AI Assistant</span>
          </div>
        </header>

        <div className={styles.chatViewport} ref={scrollerRef}>
          <AnimatePresence mode="wait">
            {shouldShowWelcome ? (
              <motion.div
                key="welcome"
                className={styles.welcomeScreen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.28 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className={styles.welcomeHeading}>
                  <span className={styles.typewriterText}>{typewriterText || '\u00A0'}</span>
                </h1>
                <motion.img
                  src={aiBotGif}
                  alt="Prince AI assistant"
                  className={styles.welcomeGif}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="conversation"
                className={styles.messageList}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`${styles.bubbleRow} ${message.role === 'user' ? styles.userRow : styles.assistantRow}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className={`${styles.bubble} ${message.role === 'user' ? styles.userBubble : styles.assistantBubble}`}>
                      {removeImageTokensFromText(message.text) ? <p>{removeImageTokensFromText(message.text)}</p> : null}
                      {message.role === 'assistant' ? (
                        <div className={styles.messageImageGrid}>
                          {extractImageUrls(message.text).map((imageUrl) => (
                            <img key={imageUrl} src={imageUrl} alt="Shared by AI assistant" className={styles.messageImage} loading="lazy" />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}

                {isTyping ? (
                  <div className={`${styles.bubbleRow} ${styles.assistantRow}`}>
                    <p className={`${styles.bubble} ${styles.assistantBubble} ${styles.typingBubble}`}>
                      Prince AI is typing
                    </p>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form className={styles.chatInputWrap} onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Ask anything..."
            aria-label="Ask Prince AI"
          />
          <button type="submit" aria-label="Send message">
            <SendHorizontal size={17} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Agent;
