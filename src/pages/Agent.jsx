import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SendHorizontal, Sparkles } from 'lucide-react';
import styles from './Agent.module.css';
import aiBotGif from '../assets/AI Bot.gif';
import { useCatalog } from '../context/CatalogContext';

const SYSTEM_PROMPT = [
  'You are Prince AI Assistant for Prince Vegetables.',
  'Help users with fresh vegetables, availability, shopping guidance, product sections, and general store questions.',
  'Keep replies very short, friendly, practical, and fast to read.',
  'Respond in clean plain text only. Do not use markdown symbols like **, *, #, or backticks.',
  'If the user asks about a specific vegetable, suggest the most relevant category or shopping tip.',
  'If the user asks for image/photo/pic, mention the exact vegetable names clearly so matching images can be shown in chat.',
  'When the user asks for WhatsApp, call, email, or any page/section link, use the exact links from websiteContext.contactPage.contactDetails and websiteContext.pageLinks.',
].join(' ');

const WELCOME_HEADING = 'Hello! How Can I Help You Today?';
const IMAGE_MARKDOWN_REGEX = /!\[[^\]]*\]\(([^)\s]+)\)/gi;
const LINK_MARKDOWN_REGEX = /\[([^\]]+)]\(([^)]+)\)/g;
const RAW_URL_REGEX = /(https?:\/\/[^\s<>"'\])]+|\/assets\/[^\s<>"'\])]+|data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+)/gi;
const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_REGEX = /(?:\+?91[\s-]?)?[6-9]\d{9}\b/g;
const APP_ROUTE_LINKS = {
  home: '/',
  shop: '/shop',
  products: '/shop',
  agent: '/agent',
  ai: '/agent',
  contact: '/#contact'
};
const CONTACT_DETAILS = {
  phone: '+91 8669193011',
  email: 'princethakur545454@gmail.com',
  address: 'Street No. 5, Shree Guru Datta Colony 1, Walhekarwadi, Sector No. 30, Nigdi, Pimpri-Chinchwad, Maharashtra 411033',
  whatsapp: 'https://wa.me/918669193011?text=Hello%20Prince%20Vegetables%2C%20I%20want%20to%20place%20an%20order.',
  call: 'tel:+918669193011',
  gmail: 'mailto:princethakur545454@gmail.com?subject=Order%20Enquiry%20-%20Prince%20Vegetables&body=Hi%20Prince%20Vegetables%2C%0A%0AI%20want%20to%20know%20more%20about%20today%27s%20fresh%20stock.'
};

const CONTACT_ACTIONS = [
  {
    key: 'whatsapp',
    label: 'WhatsApp Now',
    href: CONTACT_DETAILS.whatsapp,
    keywords: ['whatsapp', 'wa.me', 'message', 'chat']
  },
  {
    key: 'call',
    label: 'Call Now',
    href: CONTACT_DETAILS.call,
    keywords: ['call', 'phone', 'ring', 'contact number', 'mobile']
  },
  {
    key: 'gmail',
    label: 'Email Now',
    href: CONTACT_DETAILS.gmail,
    keywords: ['gmail', 'email', 'mail', 'inbox']
  }
];

const sanitizeUrl = (url) =>
  String(url ?? '')
    .trim()
    .replace(/^['"(<\[]+/, '')
    .replace(/[>'")\].,;:!?]+$/g, '')
    .trim();

const normalizeImageUrl = (url) => {
  const candidate = sanitizeUrl(url);

  if (!candidate) {
    return '';
  }

  if (candidate.startsWith('/assets/') && typeof window !== 'undefined') {
    return `${window.location.origin}${candidate}`;
  }

  return candidate;
};

const normalizeHref = (href) => {
  const candidate = sanitizeUrl(href);

  if (!candidate) {
    return '';
  }

  if (/^(https?:|mailto:|tel:|data:|\/)/i.test(candidate)) {
    return candidate;
  }

  const routeHref = APP_ROUTE_LINKS[candidate.toLowerCase()];
  return routeHref || candidate;
};

const getFriendlyLinkLabel = (href, fallbackLabel = '') => {
  const candidate = String(href ?? '').toLowerCase();

  if (candidate.startsWith('https://wa.me/') || candidate.startsWith('whatsapp:')) {
    return 'WhatsApp Now';
  }

  if (candidate.startsWith('tel:')) {
    return 'Call Now';
  }

  if (candidate.startsWith('mailto:')) {
    return 'Email Now';
  }

  if (candidate === '/' || candidate === '/shop' || candidate === '/products' || candidate === '/agent' || candidate === '/#contact') {
    return 'Open Page';
  }

  return fallbackLabel || href || 'Open Link';
};

const isContactHref = (href) => {
  const candidate = String(href ?? '').toLowerCase();

  return candidate.startsWith('https://wa.me/')
    || candidate.startsWith('whatsapp:')
    || candidate.startsWith('tel:')
    || candidate.startsWith('mailto:');
};

const isLikelyImageUrl = (url) => {
  const value = String(url ?? '').toLowerCase();

  if (value.startsWith('data:image/')) {
    return true;
  }

  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/.test(value)
    || value.startsWith('/assets/')
    || value.includes('images.unsplash.com')
    || value.includes('pexels.com/photo')
    || value.includes('pixabay.com')
    || value.includes('cloudinary.com')
    || value.includes('googleusercontent.com');
};

const extractImageUrls = (text) => {
  const source = String(text ?? '');
  const urls = new Set();
  let match;

  while ((match = IMAGE_MARKDOWN_REGEX.exec(source)) !== null) {
    const candidate = normalizeImageUrl(match[1]);

    if (candidate && isLikelyImageUrl(candidate)) {
      urls.add(candidate);
    }
  }

  while ((match = RAW_URL_REGEX.exec(source)) !== null) {
    const candidate = normalizeImageUrl(match[1]);

    if (candidate && isLikelyImageUrl(candidate)) {
      urls.add(candidate);
    }
  }

  return Array.from(urls);
};

const stripImageReferences = (text) => {
  const source = String(text ?? '');

  return source
    .replace(IMAGE_MARKDOWN_REGEX, '')
    .replace(RAW_URL_REGEX, (value) => (isLikelyImageUrl(value) ? '' : value))
    .replace(EMAIL_REGEX, '')
    .replace(PHONE_REGEX, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const removeImageTokensFromText = (text) => {
  const source = String(text ?? '');
  return source
    .replace(IMAGE_MARKDOWN_REGEX, '')
    .replace(RAW_URL_REGEX, (value) => (isLikelyImageUrl(value) ? '' : value))
    .replace(EMAIL_REGEX, '')
    .replace(PHONE_REGEX, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const renderAssistantText = (text) => {
  const source = stripImageReferences(text);

  if (!source) {
    return null;
  }

  const lines = source.split(/\n+/).map((line) => line.trim()).filter(Boolean);

  return lines.map((line, lineIndex) => {
    const nodes = [];
    let lastIndex = 0;
    const inlineMatches = [
      ...Array.from(line.matchAll(LINK_MARKDOWN_REGEX)).map((match) => ({
        index: match.index ?? 0,
        length: match[0].length,
        type: 'link',
        label: match[1],
        href: match[2]
      })),
      ...Array.from(line.matchAll(RAW_URL_REGEX)).map((match) => ({
        index: match.index ?? 0,
        length: match[0].length,
        type: 'url',
        value: match[1]
      }))
    ].sort((left, right) => left.index - right.index || left.length - right.length);

    for (const match of inlineMatches) {
      const before = line.slice(lastIndex, match.index);

      if (before) {
        nodes.push(before.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*\n]+)\*/g, '$1').replace(/`([^`]+)`/g, '$1'));
      }

      if (match.type === 'link') {
        const friendlyHref = normalizeHref(match.href);

        if (isContactHref(friendlyHref)) {
          lastIndex = match.index + match.length;
          continue;
        }

        nodes.push(
          <a
            key={`${lineIndex}-${match.index}`}
            href={friendlyHref}
            target={/^https?:/i.test(friendlyHref) ? '_blank' : undefined}
            rel={/^https?:/i.test(friendlyHref) ? 'noreferrer' : undefined}
            className={styles.inlineActionLink}
          >
            {getFriendlyLinkLabel(friendlyHref, match.label)}
          </a>
        );
      } else {
        const href = normalizeHref(match.value);

        if (isContactHref(href)) {
          lastIndex = match.index + match.length;
          continue;
        }

        if (/^(https?:|mailto:|tel:|\/)/i.test(href)) {
          nodes.push(
            <a
              key={`${lineIndex}-${match.index}`}
              href={href}
              target={/^https?:/i.test(href) ? '_blank' : undefined}
              rel={/^https?:/i.test(href) ? 'noreferrer' : undefined}
              className={styles.inlineActionLink}
            >
              {getFriendlyLinkLabel(href)}
            </a>
          );
        } else {
          nodes.push(match.value);
        }
      }

      lastIndex = match.index + match.length;
    }

    const remainder = line.slice(lastIndex);

    if (remainder) {
      nodes.push(remainder.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*\n]+)\*/g, '$1').replace(/`([^`]+)`/g, '$1'));
    }

    return <p key={`assistant-line-${lineIndex}`}>{nodes.length > 0 ? nodes : line}</p>;
  });
};

const getAssistantContactActions = (text, hintText = '') => {
  const source = `${String(text ?? '')} ${String(hintText ?? '')}`.toLowerCase();

  return CONTACT_ACTIONS.filter((action) => action.keywords.some((keyword) => source.includes(keyword)));
};

const Agent = () => {
  const { sections, adBanners, sectionOrder, storageStatus, resolveImageRef, resolveBannerRef } = useCatalog();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [failedImageUrls, setFailedImageUrls] = useState(() => new Set());
  const scrollerRef = useRef(null);

  const shouldShowWelcome = useMemo(() => !hasStartedChat && messages.length === 0, [hasStartedChat, messages.length]);
  const catalogImageIndex = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items.map((item) => {
          const normalizedName = String(item.name ?? '').toLowerCase();
          const simplifiedName = normalizedName.replace(/\s*\([^)]*\)\s*/g, '').trim();

          return {
            name: normalizedName,
            simplifiedName,
            imageUrl: resolveImageRef(item.imageRef)
          };
        })
      ),
    [resolveImageRef, sections]
  );

  const websiteContext = useMemo(() => {
    const totalProducts = sections.reduce((count, section) => count + section.items.length, 0);
    const lightweightCatalog = sections.map((section) => ({
      id: section.id,
      title: section.title,
      subtitle: section.subtitle,
      unit: section.unit,
      items: section.items.map((item) => ({
        id: item.id,
        name: item.name,
        weight: item.weight,
        price: item.price,
        discount: item.discount
      }))
    }));

    return {
      permissions: 'read-only',
      pageLinks: APP_ROUTE_LINKS,
      shopPage: {
        storageStatus,
        sectionOrder,
        totalSections: sections.length,
        totalProducts,
        adBanners: adBanners.length,
        sections: lightweightCatalog
      },
      contactPage: {
        available: true,
        contactDetails: CONTACT_DETAILS,
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
  }, [adBanners.length, sectionOrder, sections, storageStatus]);

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

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
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
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

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
      ].slice(-6);

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

  const markImageAsFailed = (imageUrl) => {
    setFailedImageUrls((previous) => {
      const next = new Set(previous);
      next.add(imageUrl);
      return next;
    });
  };

  const getAssistantImageUrls = (text, hintText = '') => {
    const explicitUrls = extractImageUrls(text);
    const source = `${String(text ?? '')} ${String(hintText ?? '')}`.toLowerCase();

    if (!source) {
      return explicitUrls;
    }

    const matchedFallbackUrls = catalogImageIndex
      .filter((entry) => {
        if (!entry.imageUrl) {
          return false;
        }

        return (
          entry.simplifiedName.length > 2 && source.includes(entry.simplifiedName)
        ) || (
          entry.name.length > 2 && source.includes(entry.name)
        );
      })
      .map((entry) => entry.imageUrl);

    return Array.from(new Set([...explicitUrls, ...matchedFallbackUrls])).slice(0, 3);
  };

  const getPreviousUserText = (index) => {
    for (let currentIndex = index - 1; currentIndex >= 0; currentIndex -= 1) {
      const candidate = messages[currentIndex];

      if (candidate?.role === 'user') {
        return candidate.text;
      }
    }

    return '';
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
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`${styles.bubbleRow} ${message.role === 'user' ? styles.userRow : styles.assistantRow}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24 }}
                  >
                    {message.role === 'assistant'
                      ? (() => {
                          const assistantText = stripImageReferences(message.text);
                          const assistantImageUrls = getAssistantImageUrls(message.text, getPreviousUserText(index));
                          const assistantContactActions = getAssistantContactActions(message.text, getPreviousUserText(index));

                          return (
                            <div className={`${styles.bubble} ${styles.assistantBubble}`}>
                              {assistantText ? renderAssistantText(assistantText) : null}
                              {assistantImageUrls.length > 0 ? (
                                <div className={styles.messageImageGrid}>
                                  {assistantImageUrls.map((imageUrl) => (
                                    failedImageUrls.has(imageUrl) ? (
                                      <div key={imageUrl} className={styles.imageFallbackCard}>
                                        Image unavailable
                                      </div>
                                    ) : (
                                      <img
                                        key={imageUrl}
                                        src={imageUrl}
                                        alt="Shared by AI assistant"
                                        className={styles.messageImage}
                                        loading="lazy"
                                        onError={() => markImageAsFailed(imageUrl)}
                                      />
                                    )
                                  ))}
                                </div>
                              ) : null}
                              {assistantContactActions.length > 0 ? (
                                <div className={styles.contactActionRow}>
                                  {assistantContactActions.map((action) => (
                                    <a
                                      key={action.key}
                                      href={action.href}
                                      target={action.href.startsWith('http') ? '_blank' : undefined}
                                      rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                                      className={styles.contactActionChip}
                                    >
                                      {action.label}
                                    </a>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          );
                        })()
                      : (
                        <div className={`${styles.bubble} ${styles.userBubble}`}>
                          {removeImageTokensFromText(message.text) ? <p>{removeImageTokensFromText(message.text)}</p> : null}
                        </div>
                      )}
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
