import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import aiBotGif from '../assets/AI Bot.gif';
import VegetableInfoModal from './VegetableInfoModal';

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2
});

const ProductCard = ({ product }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {product.discount && (
            <div className={styles.badge}>{product.discount}% OFF</div>
          )}
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.weight}>{product.weight}</p>
          </div>
          <div className={styles.footer}>
            <span className={styles.price}>{priceFormatter.format(product.price)}</span>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => setIsInfoOpen(true)}
              aria-label={`Open AI info for ${product.name}`}
              title={`AI info for ${product.name}`}
            >
              <img src={aiBotGif} alt="" aria-hidden="true" className={styles.addButtonGif} />
            </button>
          </div>
        </div>
      </div>
      <VegetableInfoModal product={product} isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </>
  );
};

export default ProductCard;
