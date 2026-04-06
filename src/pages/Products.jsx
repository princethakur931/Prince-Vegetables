import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import styles from './Products.module.css';

import carrotImg from '../assets/fresh_carrot_1775370917174.png';
import capsicumImg from '../assets/fresh_capsicum_1775370933456.png';
import potatoImg from '../assets/potato.png';
import tomatoImg from '../assets/tomato.png';
import chiliImg from '../assets/green chili.png';
import gingerImg from '../assets/Ginger.png';
import garlicImg from '../assets/Garlic bulbs with seasoning and parsley.png';
import lemonImg from '../assets/Bright lemon on green backdrop.png';
import corianderImg from '../assets/Fresh bunch of cilantro on green background.png';
import cabbageImg from '../assets/Fresh green cabbage on wood.png';
import cauliflowerImg from '../assets/Fresh cauliflower on rustic wood.png';
import palakImg from '../assets/Fresh desi palak on burlap cloth.png';
import okraImg from '../assets/Fresh okra with star-shaped seeds.png';
import brinjalImg from '../assets/Fresh eggplant on soft purple background.png';
import onionImg from '../assets/Fresh red onion and sliced beauty.png';
import beetrootImg from '../assets/Vibrant beetroot against soft pink backdrop.png';
import peasImg from '../assets/Fresh green peas on wooden surface.png';
import lettuceImg from '../assets/Fresh green lettuce on wooden surface.png';
import beansImg from '../assets/Fresh green beans on beige surface.png';
import gawarBeansImg from '../assets/Fresh green beans on slate background.png';
import cucumberImg from '../assets/Fresh cucumber with slices on green.png';
import radishImg from '../assets/Fresh daikon radish and slices.png';

const SECTION_ORDER = [
  'daily-essentials',
  'leafy-greens',
  'root-vegetables',
  'fruit-vegetables',
  'beans-and-peas',
  'salad-picks'
];

const SECTION_META = {
  'daily-essentials': {
    title: 'Daily Essentials',
    subtitle: 'Most ordered vegetables for everyday cooking.',
    unit: 'fresh, 1 kg',
    items: [
      'Potato (Aloo)',
      'Onion (Pyaaz)',
      'Tomato (Tamatar)',
      'Green Chilli (Hari Mirch)',
      'Ginger (Adrak)',
      'Garlic (Lahsun)',
      'Coriander Leaves (Dhaniya Patta)',
      'Lemon (Nimbu)',
      'Spinach (Palak)',
      'Cabbage (Patta Gobhi)',
      'Cauliflower (Phool Gobhi)',
      'Brinjal (Baingan)',
      'Capsicum (Shimla Mirch)',
      'Okra (Bhindi)'
    ]
  },
  'leafy-greens': {
    title: 'Leafy Greens',
    subtitle: 'Healthy, fresh and nutrient-rich green picks.',
    unit: 'fresh bunch, 250 g',
    items: [
      'Spinach (Palak)',
      'Fenugreek Leaves (Methi)',
      'Mustard Greens (Sarson)',
      'Mint Leaves (Pudina)',
      'Coriander Leaves (Dhaniya Patta)',
      'Amaranth Leaves (Chaulai)',
      'Bathua (Bathua)',
      'Dill Leaves (Suva / Shepu)',
      'Radish Leaves (Mooli ke Patte)',
      'Lettuce (Salad Patta)'
    ]
  },
  'root-vegetables': {
    title: 'Root Vegetables',
    subtitle: 'Fresh roots and underground staples.',
    unit: 'farm fresh, 1 kg',
    items: [
      'Carrot (Gajar)',
      'Radish (Mooli)',
      'Beetroot (Chukandar)',
      'Turnip (Shalgam)',
      'Sweet Potato (Shakarkand)',
      'Potato (Aloo)',
      'Onion (Pyaaz)',
      'Garlic (Lahsun)',
      'Ginger (Adrak)',
      'Turmeric Root (Kacchi Haldi)',
      'Arbi / Taro Root (Arbi)',
      'Yam (Suran / Jimikand)'
    ]
  },
  'fruit-vegetables': {
    title: 'Fruit Vegetables',
    subtitle: 'Most important category for daily recipes.',
    unit: 'sorted, 1 kg',
    items: [
      'Brinjal (Baingan)',
      'Capsicum (Shimla Mirch)',
      'Tomato (Tamatar)',
      'Green Chilli (Hari Mirch)',
      'Cucumber (Kheera)',
      'Bottle Gourd (Lauki)',
      'Ridge Gourd (Turai)',
      'Sponge Gourd (Nenua / Gilki)',
      'Bitter Gourd (Karela)',
      'Pumpkin (Kaddu)',
      'Ash Gourd (Petha)',
      'Raw Banana (Kacha Kela)',
      'Raw Papaya (Kaccha Papita)',
      'Okra (Bhindi)',
      'Ivy Gourd (Kundru / Tindora)',
      'Pointed Gourd (Parwal)',
      'Round Gourd (Tinda)'
    ]
  },
  'beans-and-peas': {
    title: 'Beans & Peas',
    subtitle: 'Tender pods and protein-rich green legumes.',
    unit: 'fresh pack, 500 g',
    items: [
      'Green Peas (Matar)',
      'French Beans (French Beans / Farasbi)',
      'Cluster Beans (Gawar Phali)',
      'Broad Beans (Sem Phali)',
      'Long Beans (Lambi Phali / Barbati)',
      'Cowpeas (Lobia)',
      'Field Beans (Papdi / Valor)'
    ]
  },
  'salad-picks': {
    title: 'Salad Picks',
    subtitle: 'Quick-order section highlighted for fresh salads.',
    unit: 'salad grade, 500 g',
    items: [
      'Cucumber (Kheera)',
      'Tomato (Tamatar)',
      'Onion (Pyaaz)',
      'Carrot (Gajar)',
      'Beetroot (Chukandar)',
      'Radish (Mooli)',
      'Lettuce (Salad Patta)',
      'Cabbage (Patta Gobhi)',
      'Capsicum (Shimla Mirch)',
      'Lemon (Nimbu)'
    ]
  }
};

const pickImage = (name, sectionKey) => {
  const value = name.toLowerCase();

  if (value.includes('potato') || value.includes('aloo')) {
    return potatoImg;
  }

  if (value.includes('beetroot') || value.includes('chukandar')) {
    return beetrootImg;
  }

  if (value.includes('peas') || value.includes('matar')) {
    return peasImg;
  }

  if (value.includes('lettuce') || value.includes('salad patta')) {
    return lettuceImg;
  }

  if (value.includes('gawar') || value.includes('cluster beans')) {
    return gawarBeansImg;
  }

  if (value.includes('beans') || value.includes('phali') || value.includes('farasbi') || value.includes('barbati') || value.includes('valor')) {
    return beansImg;
  }

  if (value.includes('cucumber') || value.includes('kheera')) {
    return cucumberImg;
  }

  if (value.includes('radish') || value.includes('mooli')) {
    return radishImg;
  }

  if (value.includes('ginger') || value.includes('adrak')) {
    return gingerImg;
  }

  if (value.includes('garlic') || value.includes('lahsun')) {
    return garlicImg;
  }

  if (value.includes('tomato') || value.includes('tamatar')) {
    return tomatoImg;
  }

  if (value.includes('chilli') || value.includes('chili') || value.includes('hari mirch')) {
    return chiliImg;
  }

  if (value.includes('capsicum')) {
    return capsicumImg;
  }

  if (value.includes('onion') || value.includes('pyaaz')) {
    return onionImg;
  }

  if (value.includes('okra') || value.includes('bhindi')) {
    return okraImg;
  }

  if (value.includes('brinjal') || value.includes('baingan') || value.includes('eggplant')) {
    return brinjalImg;
  }

  if (value.includes('coriander') || value.includes('dhaniya') || value.includes('cilantro')) {
    return corianderImg;
  }

  if (value.includes('lemon') || value.includes('nimbu')) {
    return lemonImg;
  }

  if (value.includes('spinach') || value.includes('palak')) {
    return palakImg;
  }

  if (value.includes('cabbage') || value.includes('patta gobhi')) {
    return cabbageImg;
  }

  if (value.includes('cauliflower') || value.includes('phool gobhi')) {
    return cauliflowerImg;
  }

  if (
    value.includes('carrot') ||
    value.includes('beet') ||
    value.includes('turnip') ||
    value.includes('potato') ||
    value.includes('onion') ||
    value.includes('garlic') ||
    value.includes('ginger') ||
    value.includes('arbi') ||
    value.includes('yam') ||
    value.includes('turmeric')
  ) {
    return carrotImg;
  }

  if (sectionKey === 'leafy-greens' || sectionKey === 'beans-and-peas') {
    return palakImg;
  }

  return carrotImg;
};

const pickBgColor = (sectionKey, index) => {
  const palette = {
    'daily-essentials': ['#fff2e6', '#ffeae1', '#eef7dd', '#f9ecff'],
    'leafy-greens': ['#eaf7d8', '#edf9df', '#e4f4d0'],
    'root-vegetables': ['#fff0df', '#f7ebff', '#ffe9e0'],
    'fruit-vegetables': ['#ffe9e9', '#eef9df', '#fff2d8', '#f8ebff'],
    'beans-and-peas': ['#eaf7d9', '#edf8df', '#f0f9e7'],
    'salad-picks': ['#e8f7de', '#fff0e3', '#f8ecff']
  };

  return palette[sectionKey][index % palette[sectionKey].length];
};

const buildSectionItems = (sectionKey, config) => {
  return config.items.map((name, index) => ({
    id: `${sectionKey}-${index + 1}`,
    name,
    weight: config.unit,
    price: Number((1.4 + (index % 6) * 0.37 + (sectionKey.length % 3) * 0.21).toFixed(2)),
    discount: 8 + ((index * 3 + sectionKey.length) % 26),
    image: pickImage(name, sectionKey),
    bgColor: pickBgColor(sectionKey, index)
  }));
};

const VEGETABLE_SECTIONS = Object.fromEntries(
  SECTION_ORDER.map((sectionKey) => {
    const config = SECTION_META[sectionKey];

    return [
      sectionKey,
      {
        title: config.title,
        subtitle: config.subtitle,
        items: buildSectionItems(sectionKey, config)
      }
    ];
  })
);

const Products = () => {
  const [selectedSections, setSelectedSections] = useState(SECTION_ORDER);

  const allSelected = selectedSections.length === SECTION_ORDER.length;

  const allVegetablesCount = useMemo(
    () => SECTION_ORDER.reduce((total, sectionKey) => total + VEGETABLE_SECTIONS[sectionKey].items.length, 0),
    []
  );

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
            Browse category-wise vegetables with filters and discover your everyday essentials quickly.
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
            <span className={styles.filterLabel}>All Vegetables</span>
            <span className={styles.filterCount}>{allVegetablesCount}</span>
          </label>

          {SECTION_ORDER.map((sectionKey) => (
            <label key={sectionKey} className={styles.filterRow}>
              <input
                type="checkbox"
                checked={selectedSections.includes(sectionKey)}
                onChange={() => toggleSection(sectionKey)}
              />
              <span className={styles.filterLabel}>{VEGETABLE_SECTIONS[sectionKey].title}</span>
              <span className={styles.filterCount}>{VEGETABLE_SECTIONS[sectionKey].items.length}</span>
            </label>
          ))}

          <button type="button" className={styles.resetButton} onClick={() => setSelectedSections(SECTION_ORDER)}>
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
              const isSalad = sectionKey === 'salad-picks';

              return (
                <motion.section
                  key={sectionKey}
                  className={`${styles.sectionBlock} ${isSalad ? styles.sectionHighlight : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                >
                  <div className={styles.sectionHead}>
                    <h2>{section.title}</h2>
                    <span className={styles.sectionCount}>{section.items.length} items</span>
                  </div>
                  <p className={styles.sectionSubtext}>{section.subtitle}</p>

                  {allSelected ? (
                    <div className={styles.sectionRowViewport}>
                      <motion.div
                        className={styles.sectionRowTrack}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                          duration: Math.max(18, section.items.length * 2.8),
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      >
                        {[...section.items, ...section.items].map((product, productIndex) => (
                          <div className={styles.sectionRowItem} key={`${product.id}-${productIndex}`}>
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  ) : (
                    <div className={styles.sectionGrid}>
                      {section.items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
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
