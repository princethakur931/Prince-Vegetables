import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useCatalog } from '../context/CatalogContext';
import styles from './Home.module.css';

// We import the hero image we generated
import heroBg from '../assets/hero_vegetables_1775370899939.png';
import farmVerifiedIcon from '../assets/Farm Verified.png';
import establishedIcon from '../assets/Established in 2022.png';
import handpickedIcon from '../assets/Handpicked Quality.png';

const titleContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.1,
    },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const statsContainer = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12
    }
  }
};

const statCard = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
  }
};

const featureGrid = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15
    }
  }
};

const featureCard = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const AnimatedStatValue = ({ value, label, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const duration = 1400;
    const startedAt = performance.now();
    let frameId = null;

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(value * eased);
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isInView, value]);

  return (
    <>
      <strong ref={ref}>
        {prefix}
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const [isMobile, setIsMobile] = useState(false);
  const { getSection } = useCatalog();

  const dailyBestsellers = useMemo(() => {
    const dailySection = getSection('daily-essentials');

    if (!dailySection?.items?.length) {
      return [];
    }

    return dailySection.items.slice(0, 8).map((item) => item.name);
  }, [getSection]);

  const statsData = [
    { value: 1200, suffix: '+', label: 'happy homes' },
    { value: 40, suffix: '+', label: 'daily farm partners' },
    { value: 2022, prefix: 'Since ', label: 'trusted local shop' }
  ];

  const featureCards = [
    {
      title: 'Farm Verified',
      icon: farmVerifiedIcon,
      copy: 'Fresh vegetables sourced from trusted farms with regular quality checks.'
    },
    {
      title: 'Established in 2022',
      icon: establishedIcon,
      copy: 'Serving fresh, quality vegetables with trust and consistency since 2022.'
    },
    {
      title: 'Handpicked Quality',
      icon: handpickedIcon,
      copy: 'Every vegetable is carefully selected to ensure freshness and better taste.'
    }
  ];

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.title}
            variants={titleContainer}
            initial="hidden"
            animate="show"
          >
            <motion.span className={styles.titleLine} variants={titleLine}>
              Fresh Vegetables,
            </motion.span>
            <motion.span className={styles.titleLine} variants={titleLine}>
              Zero Compromise.
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Seasonal produce from trusted local farms, packed with care and delivered to your doorstep every day.
          </motion.p>
          
          <motion.div
            className={styles.ctaWrap}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button onClick={() => navigate('/products')} className={styles.ctaButton}>
              Explore Fresh Picks
            </Button>
          </motion.div>

          <motion.div
            className={styles.stats}
            variants={statsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-70px' }}
          >
            {statsData.map((item) => (
              <motion.div key={item.label} className={styles.statCard} variants={statCard} whileHover={{ y: -5, scale: 1.02 }}>
                <AnimatedStatValue value={item.value} prefix={item.prefix} suffix={item.suffix} label={item.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className={styles.heroImageContainer}
          style={isMobile ? undefined : { y: y1 }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img 
            src={heroBg} 
            alt="Fresh Organic Vegetables" 
            className={styles.heroImage}
            animate={{ y: isMobile ? [0, -7, 0] : [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: isMobile ? 4.8 : 6, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.section>

      <motion.section
        className={`${styles.dailySpotlight} glass`}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
        <div className={styles.spotlightHeader}>
          <h2>Daily Essentials - Top Selling</h2>
          <p>Most ordered vegetables from our regular buyers.</p>
        </div>

        <div className={styles.chipGrid}>
          {dailyBestsellers.map((item) => (
            <motion.span
              key={item}
              className={styles.vegChip}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="about"
        className={styles.features}
        variants={featureGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {featureCards.map((card) => (
          <motion.div
            key={card.title}
            className={`${styles.featureCard} glass`}
            variants={featureCard}
            whileHover={{ y: -8, scale: 1.015 }}
          >
            <div className={styles.featureHeader}>
              <img src={card.icon} alt={card.title} className={styles.featureIcon} />
              <h3>{card.title}</h3>
            </div>
            <p>{card.copy}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default Home;
