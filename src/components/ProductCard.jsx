import React from 'react';
import { Plus } from 'lucide-react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper} style={{ backgroundColor: product.bgColor }}>
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
          <span className={styles.price}>${product.price}</span>
          <button className={styles.addButton}>
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
