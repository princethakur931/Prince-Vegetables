import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import styles from './Products.module.css';

// Import images
import carrotImg from '../assets/fresh_carrot_1775370917174.png';
import capsicumImg from '../assets/fresh_capsicum_1775370933456.png';
import broccoliImg from '../assets/fresh_broccoli_1775370956760.png';
import radishImg from '../assets/fresh_radish_1775370973039.png';

const SECTION_ORDER = [
  'daily-essentials',
  'leafy-greens',
  'root-vegetables',
  'fruit-vegetables',
  'beans-and-peas',
  'salad-picks'
];

const VEGETABLE_SECTIONS = {
  'daily-essentials': {
    title: 'Daily Essentials',
    items: [
      {
        id: 'de-1',
        name: 'Fresh! Carrot',
        weight: 'orange (loose), 1 kg',
        price: 2.9,
        discount: 22,
        image: carrotImg,
        bgColor: '#fff1e6'
      },
      {
        id: 'de-2',
        name: 'Daily Capsicum',
        weight: 'red (loose), 1 kg',
        price: 3.2,
        discount: 18,
        image: capsicumImg,
        bgColor: '#ffe5e5'
      },
      {
        id: 'de-3',
        name: 'Fresh Radish',
        weight: 'purple (loose), 1 kg',
        price: 2.7,
        discount: 12,
        image: radishImg,
        bgColor: '#fae8ff'
      }
    ]
  },
  'leafy-greens': {
    title: 'Leafy Greens',
    items: [
      {
        id: 'lg-1',
        name: 'Mustard Greens',
        weight: 'fresh bunch, 500 g',
        price: 1.9,
        discount: 20,
        image: broccoliImg,
        bgColor: '#ecfccb'
      },
      {
        id: 'lg-2',
        name: 'Spinach Basket',
        weight: 'farm fresh, 500 g',
        price: 1.8,
        discount: 15,
        image: broccoliImg,
        bgColor: '#e7f7d9'
      },
      {
        id: 'lg-3',
        name: 'Fenugreek Leaves',
        weight: 'cleaned pack, 300 g',
        price: 1.4,
        discount: 10,
        image: broccoliImg,
        bgColor: '#e2f3d2'
      }
    ]
  },
  'root-vegetables': {
    title: 'Root Vegetables',
    items: [
      {
        id: 'rv-1',
        name: 'Premium Carrot',
        weight: 'orange (loose), 1 kg',
        price: 2.6,
        discount: 16,
        image: carrotImg,
        bgColor: '#ffefe1'
      },
      {
        id: 'rv-2',
        name: 'Farm Radish',
        weight: 'crunchy roots, 1 kg',
        price: 2.4,
        discount: 11,
        image: radishImg,
        bgColor: '#f5e8ff'
      },
      {
        id: 'rv-3',
        name: 'Red Carrot',
        weight: 'seasonal, 1 kg',
        price: 2.8,
        discount: 14,
        image: carrotImg,
        bgColor: '#ffe8dc'
      }
    ]
  },
  'fruit-vegetables': {
    title: 'Fruit Vegetables',
    items: [
      {
        id: 'fv-1',
        name: 'Fresh! Capsicum',
        weight: 'red (loose), 1 kg',
        price: 2.9,
        discount: 30,
        image: capsicumImg,
        bgColor: '#ffe5e5'
      },
      {
        id: 'fv-2',
        name: 'Green Capsicum',
        weight: 'green (loose), 1 kg',
        price: 2.7,
        discount: 15,
        image: capsicumImg,
        bgColor: '#e9f8dc'
      },
      {
        id: 'fv-3',
        name: 'Yellow Capsicum',
        weight: 'yellow (loose), 1 kg',
        price: 3.4,
        discount: 9,
        image: capsicumImg,
        bgColor: '#fff6cc'
      }
    ]
  },
  'beans-and-peas': {
    title: 'Beans & Peas',
    items: [
      {
        id: 'bp-1',
        name: 'Green Peas',
        weight: 'shelled, 500 g',
        price: 2.3,
        discount: 13,
        image: broccoliImg,
        bgColor: '#edfad9'
      },
      {
        id: 'bp-2',
        name: 'French Beans',
        weight: 'tender, 500 g',
        price: 2.1,
        discount: 12,
        image: broccoliImg,
        bgColor: '#e7f4cf'
      },
      {
        id: 'bp-3',
        name: 'Cluster Beans',
        weight: 'fresh, 500 g',
        price: 1.9,
        discount: 8,
        image: broccoliImg,
        bgColor: '#edf8db'
      }
    ]
  },
  'salad-picks': {
    title: 'Salad Picks',
    items: [
      {
        id: 'sp-1',
        name: 'Carrot Salad Cut',
        weight: 'ready to use, 400 g',
        price: 2.4,
        discount: 12,
        image: carrotImg,
        bgColor: '#fff2e3'
      },
      {
        id: 'sp-2',
        name: 'Radish Salad Mix',
        weight: 'washed, 400 g',
        price: 2.2,
        discount: 10,
        image: radishImg,
        bgColor: '#f8ebff'
      },
      {
        id: 'sp-3',
        name: 'Broccoli Florets',
        weight: 'cleaned, 400 g',
        price: 3.1,
        discount: 14,
        image: broccoliImg,
        bgColor: '#e8f7d2'
      }
    ]
  }
};

const Products = () => {
  const [selectedSections, setSelectedSections] = useState(SECTION_ORDER);

  const allSelected = selectedSections.length === SECTION_ORDER.length;

  const visibleSections = useMemo(
    () => SECTION_ORDER.filter((sectionKey) => selectedSections.includes(sectionKey)),
    [selectedSections]
  );

  const toggleSection = (sectionKey) => {
    setSelectedSections((prev) => {
      if (prev.includes(sectionKey)) {
        return prev.filter((key) => key !== sectionKey);
      }

      return [...prev, sectionKey];
    });
  };

  const toggleAllSections = () => {
    setSelectedSections((prev) => (prev.length === SECTION_ORDER.length ? [] : SECTION_ORDER));
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <motion.div 
          className={styles.titleSection}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.pageTitle}>From farm to your kitchen</h1>
          <p className={styles.pageSubtitle}>
            Explore vegetables category-wise and quickly find exactly what you need for daily cooking.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className={styles.catalogLayout}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <aside className={`${styles.filterPanel} glass`}>
          <h3 className={styles.filterTitle}>Filter By Section</h3>

          <label className={styles.filterRow}>
            <input type="checkbox" checked={allSelected} onChange={toggleAllSections} />
            <span>All Vegetables</span>
          </label>

          {SECTION_ORDER.map((sectionKey) => (
            <label key={sectionKey} className={styles.filterRow}>
              <input
                type="checkbox"
                checked={selectedSections.includes(sectionKey)}
                onChange={() => toggleSection(sectionKey)}
              />
              <span>{VEGETABLE_SECTIONS[sectionKey].title}</span>
            </label>
          ))}

          <button
            type="button"
            className={styles.resetButton}
            onClick={() => setSelectedSections(SECTION_ORDER)}
          >
            Reset Filters
          </button>
        </aside>

        <div className={styles.sectionsColumn}>
          {visibleSections.length === 0 ? (
            <div className={`${styles.emptyState} glass`}>
              <h4>No Section Selected</h4>
              <p>Select one or more filters to view vegetables.</p>
            </div>
          ) : (
            visibleSections.map((sectionKey, idx) => {
              const section = VEGETABLE_SECTIONS[sectionKey];

              return (
                <motion.section
                  key={sectionKey}
                  className={styles.sectionBlock}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                >
                  <div className={styles.sectionHead}>
                    <h2>{section.title}</h2>
                  </div>

                  <div className={styles.sectionGrid}>
                    {section.items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </motion.section>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Products;
