import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { useCatalog } from '../context/CatalogContext';
import styles from './Products.module.css';

const Products = () => {
  const { sections, sectionOrder, resolveImageRef, searchQuery } = useCatalog();
  const [selectedSections, setSelectedSections] = useState(sectionOrder);

  useEffect(() => {
    setSelectedSections((previous) => {
      const matches =
        previous.length === sectionOrder.length && previous.every((sectionId, index) => sectionId === sectionOrder[index]);

      return matches ? previous : sectionOrder;
    });
  }, [sectionOrder]);

  const allSelected = selectedSections.length === sectionOrder.length;

  const allVegetablesCount = useMemo(
    () => sections.reduce((total, section) => total + section.items.length, 0),
    [sections]
  );

  const catalogSections = useMemo(
    () => sectionOrder.map((sectionId) => sections.find((section) => section.id === sectionId)).filter(Boolean),
    [sectionOrder, sections]
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const visibleSections = useMemo(() => {
    return catalogSections
      .filter((section) => selectedSections.includes(section.id))
      .map((section) => {
        const items = normalizedSearch
          ? section.items.filter((product) => {
              const searchableText = `${product.name} ${product.weight}`.toLowerCase();
              return searchableText.includes(normalizedSearch);
            })
          : section.items;

        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);
  }, [catalogSections, normalizedSearch, selectedSections]);

  const visibleVegetablesCount = useMemo(
    () => visibleSections.reduce((total, section) => total + section.items.length, 0),
    [visibleSections]
  );

  const toggleSection = (sectionId) => {
    setSelectedSections((previous) => {
      if (previous.includes(sectionId)) {
        return previous.filter((id) => id !== sectionId);
      }

      return [...previous, sectionId];
    });
  };

  const toggleAllSections = () => {
    setSelectedSections((previous) => (previous.length === sectionOrder.length ? [] : sectionOrder));
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

          {catalogSections.map((section) => (
            <label key={section.id} className={styles.filterRow}>
              <input type="checkbox" checked={selectedSections.includes(section.id)} onChange={() => toggleSection(section.id)} />
              <span className={styles.filterLabel}>{section.title}</span>
              <span className={styles.filterCount}>{section.items.length}</span>
            </label>
          ))}

          <button type="button" className={styles.resetButton} onClick={() => setSelectedSections(sectionOrder)}>
            Reset Filters
          </button>
        </aside>

        <div className={styles.sectionsColumn}>
          {visibleSections.length === 0 ? (
            <div className={`${styles.emptyState} glass`}>
              <h4>{normalizedSearch ? 'No Vegetables Found' : 'No Section Selected'}</h4>
              <p>
                {normalizedSearch
                  ? `No vegetables matched "${searchQuery}".`
                  : 'Select one or more filters to view vegetables.'}
              </p>
            </div>
          ) : (
            visibleSections.map((section, idx) => (
              <motion.section
                key={section.id}
                className={`${styles.sectionBlock} ${section.id === 'salad-picks' ? styles.sectionHighlight : ''}`}
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
                  <ProductCarousel
                    products={section.items.map((product) => ({
                      ...product,
                      image: resolveImageRef(product.imageRef)
                    }))}
                  />
                ) : (
                  <div className={styles.sectionGrid}>
                    {section.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          ...product,
                          image: resolveImageRef(product.imageRef)
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.section>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Products;
