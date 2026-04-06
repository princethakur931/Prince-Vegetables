import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import styles from './ProductCarousel.module.css';

const AUTO_SLIDE_MS = 2400;
const SWIPE_THRESHOLD = 56;

const getCardsPerView = () => (window.innerWidth >= 1024 ? 3 : 2);

const chunkProducts = (items, size) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const ProductCarousel = ({ products, autoSlideDelay = AUTO_SLIDE_MS }) => {
  const [cardsPerView, setCardsPerView] = useState(() => getCardsPerView());
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const pages = useMemo(() => chunkProducts(products, cardsPerView), [products, cardsPerView]);
  const totalPages = pages.length;

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setActivePage((prev) => {
      if (totalPages === 0) {
        return 0;
      }

      return Math.min(prev, totalPages - 1);
    });
  }, [totalPages]);

  useEffect(() => {
    if (isPaused || totalPages <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActivePage((prev) => (prev + 1) % totalPages);
    }, autoSlideDelay);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoSlideDelay, isPaused, totalPages]);

  const handleDragEnd = (_event, info) => {
    const offsetX = info.offset.x;

    if (offsetX <= -SWIPE_THRESHOLD) {
      setActivePage((prev) => (prev + 1) % totalPages);
      setIsPaused(false);
      return;
    }

    if (offsetX >= SWIPE_THRESHOLD) {
      setActivePage((prev) => (prev - 1 + totalPages) % totalPages);
      setIsPaused(false);
      return;
    }

    setIsPaused(false);
  };

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className={styles.carousel}>
        <motion.div
          className={styles.track}
          animate={{ x: `-${activePage * 100}%` }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          drag={totalPages > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {pages.map((page, pageIndex) => (
            <div key={`page-${pageIndex}`} className={styles.page}>
              <div className={styles.pageGrid}>
                {page.map((product) => (
                  <div key={product.id} className={styles.slide}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {totalPages > 1 ? (
        <div className={styles.pageDots}>
          {pages.map((_page, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              className={`${styles.dot} ${index === activePage ? styles.dotActive : ''}`}
              onClick={() => setActivePage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductCarousel;
