import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './Home.module.css';

// We import the hero image we generated
import heroBg from '../assets/hero_vegetables_1775370899939.png';

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const [isMobile, setIsMobile] = useState(false);

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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Fresh Vegetables,
            <br />
            Zero Compromise.
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div>
              <strong>1200+</strong>
              <span>happy homes</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>daily farm partners</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>same-day delivery</span>
            </div>
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
            animate={isMobile ? undefined : { y: [0, -15, 0] }}
            transition={isMobile ? undefined : { repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.section>

      <section className={styles.features}>
        <motion.div 
          className={`${styles.featureCard} glass`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3>Farm Verified</h3>
          <p>Every batch is sourced from monitored farms with traceable quality checks.</p>
        </motion.div>
        <motion.div 
          className={`${styles.featureCard} glass`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Fast Delivery Slots</h3>
          <p>Book preferred time slots and receive freshly packed vegetables in hours.</p>
        </motion.div>
        <motion.div 
          className={`${styles.featureCard} glass`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Earth-Friendly Packs</h3>
          <p>Low-waste recyclable packaging designed to keep produce crisp for longer.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
