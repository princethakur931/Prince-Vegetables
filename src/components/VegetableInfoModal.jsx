import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BadgeInfo, Globe2, HeartPulse, Leaf, Languages, Sparkles, X, Volume2, Bot } from 'lucide-react';
import styles from './VegetableInfoModal.module.css';
import { MODAL_TRANSLATIONS, SUPPORTED_LANGUAGES, getVegetableInfo } from '../data/vegetableInfo';

const VegetableInfoModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const info = useMemo(() => getVegetableInfo(product, language), [product, language]);
  const copy = MODAL_TRANSLATIONS[language] ?? MODAL_TRANSLATIONS.en;

  useEffect(() => {
    const browserLanguage = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2).toLowerCase() : 'en';
    const savedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('prince-veg-language') : null;
    const preferredLanguage = SUPPORTED_LANGUAGES.some((entry) => entry.code === savedLanguage)
      ? savedLanguage
      : browserLanguage;

    if (SUPPORTED_LANGUAGES.some((entry) => entry.code === preferredLanguage)) {
      setLanguage(preferredLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('prince-veg-language', language);
    }
  }, [language]);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;

    const synth = window.speechSynthesis;
    const handleEnd = () => setIsSpeaking(false);
    const handleCancel = () => setIsSpeaking(false);

    synth.addEventListener('end', handleEnd);
    synth.addEventListener('cancel', handleCancel);

    return () => {
      synth.removeEventListener('end', handleEnd);
      synth.removeEventListener('cancel', handleCancel);
    };
  }, []);

  const localeMap = {
    en: 'en-US',
    hi: 'hi-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    ta: 'ta-IN'
  };

  const buildReadText = () => {
    const parts = [];
    parts.push(info.displayTitle);
    if (info.subtitle) parts.push(info.subtitle);
    if (info.description) parts.push(info.description);

    if (info.benefits && info.benefits.length) {
      parts.push(`${copy.health}: ${info.benefits.join(', ')}`);
    }

    if (info.bestFor && info.bestFor.length) {
      parts.push(`${copy.bestFor}: ${info.bestFor.join(', ')}`);
    }

    if (info.caution && info.caution.length) {
      parts.push(info.caution.join('. '));
    }

    if (info.famousFor && info.famousFor.length) {
      parts.push(`${copy.famousIn}: ${info.famousFor.join(', ')}`);
    }

    if (info.production && info.production.length) {
      parts.push(`${copy.production}: ${info.production.join(', ')}`);
    }

    if (info.stats && info.stats.length) {
      const statText = info.stats.map((s) => `${s.label} ${s.value}`).join(', ');
      parts.push(statText);
    }

    return parts.join('. ');
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // graceful fallback
      return;
    }

    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      setCurrentUtterance(null);
      return;
    }

    const text = buildReadText();
    if (!text) return;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = localeMap[language] || 'en-US';
    u.rate = 1;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);

    setCurrentUtterance(u);
    synth.speak(u);
  };

  const handleCloseClick = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    onClose();
  };

  const handleGetMoreInfo = () => {
    handleCloseClick();
    const vegName = product?.name || info.displayTitle;
    navigate(`/agent?query=Give me detailed information about ${encodeURIComponent(vegName)} including calories, proteins, descriptions, health benefits, advantages, disadvantages, etc in a beautiful way.`);
  };

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseDown={onClose}
      >
        <motion.section
          className={styles.window}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.985 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`${info.displayTitle} information popup`}
        >
          <header className={styles.chrome}>
            <div className={styles.chromeDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.chromeTitleBlock}>
              <p className={styles.chromeTitle}>{product?.name || info.displayTitle}</p>
              <p className={styles.chromeSubtitle}>{info.subtitle}</p>
            </div>
            <div className={styles.chromeActions}>
              <label className={styles.languagePicker}>
                <Languages size={14} />
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  aria-label={copy.languageLabel}
                >
                  {SUPPORTED_LANGUAGES.map((entry) => (
                    <option key={entry.code} value={entry.code}>
                      {entry.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className={`${styles.voiceButton} ${isSpeaking ? styles.voicePlaying : ''}`}
                onClick={handleToggleVoice}
                aria-pressed={isSpeaking}
                aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
              >
                <Volume2 size={14} />
              </button>
              <button type="button" className={styles.closeButton} onClick={handleCloseClick} aria-label="Close info popup">
                <X size={16} />
              </button>
            </div>
          </header>

          <div className={styles.commandBar}>
            <span className={styles.commandPill}>
              <Sparkles size={14} /> {copy.commandLabel ?? 'AI Veg Info'}
            </span>
          </div>

          <div className={styles.body}>
            <aside className={styles.leftPane}>
              <div className={styles.heroCard}>
                <div className={styles.heroFrame}>
                  <img src={product?.image} alt={info.imageAlt} className={styles.heroImage} loading="lazy" />
                </div>
                <div className={styles.heroCopy}>
                  <p className={styles.heroEyebrow}>{copy.snapshot}</p>
                  <h2>{product?.name || info.displayTitle}</h2>
                  <p className={styles.heroDescription}>{info.description}</p>
                </div>
              </div>

              <div className={styles.statGrid}>
                {info.stats.map((stat) => (
                  <article key={stat.label} className={styles.statCard}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <strong className={styles.statValue}>{stat.value}</strong>
                    <span className={styles.statHint}>{stat.hint}</span>
                  </article>
                ))}
              </div>

              <button className={styles.aiButton} onClick={handleGetMoreInfo} type="button">
                <Bot size={15} /> Get more info via AI
                <ArrowUpRight size={14} />
              </button>
            </aside>

            <div className={styles.rightPane}>
              <section className={styles.sectionBlock}>
                <div className={styles.sectionHead}>
                  <div>
                    <p className={styles.sectionKicker}>{copy.quickNotes}</p>
                    <h3>{copy.health}</h3>
                  </div>
                  <BadgeInfo size={18} />
                </div>
                <ul className={styles.bulletList}>
                  {info.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.sectionBlock}>
                <div className={styles.sectionHead}>
                  <div>
                    <p className={styles.sectionKicker}>{copy.bestFor}</p>
                    <h3>{copy.bestForHint}</h3>
                  </div>
                  <HeartPulse size={18} />
                </div>
                <div className={styles.tagRow}>
                  {info.bestFor.map((item) => (
                    <span key={item} className={styles.tag}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className={styles.noteText}>
                  {info.caution.join(' ')}
                </p>
              </section>

              <section className={styles.sectionBlock}>
                <div className={styles.sectionHead}>
                  <div>
                    <p className={styles.sectionKicker}>{copy.generalKnowledge}</p>
                    <h3>{copy.famousIn}</h3>
                  </div>
                  <Leaf size={18} />
                </div>
                <div className={styles.dualColumn}>
                  <div>
                    <h4>{copy.famousIn}</h4>
                    <ul className={styles.compactList}>
                      {info.famousFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>{copy.production}</h4>
                    <ul className={styles.compactList}>
                      {info.production.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default VegetableInfoModal;