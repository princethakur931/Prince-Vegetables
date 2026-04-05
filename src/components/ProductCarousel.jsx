import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ products }) => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }

      setIsMobile(window.innerWidth <= 768);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [products]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={`${styles.navBtn} ${styles.left}`} onClick={scrollLeft}>
        <ArrowLeft size={20} />
      </button>
      
      <motion.div ref={carouselRef} className={styles.carousel} whileTap={{ cursor: "grabbing" }}>
        <motion.div 
          drag={isMobile ? false : 'x'} 
          dragConstraints={{ right: 0, left: -width }} 
          className={styles.innerCarousel}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </motion.div>

      <button className={`${styles.navBtn} ${styles.right}`} onClick={scrollRight}>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default ProductCarousel;
