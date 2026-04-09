import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { useCatalog } from '../context/CatalogContext';
import styles from './Products.module.css';

const AD_BANNER_ASPECT_RATIO = '1536 / 547';
const BANNER_SWAP_MS = 3200;

const Products = () => {
  const { sections, sectionOrder, resolveBannerRef, resolveImageRef, searchQuery, adBanners } = useCatalog();
  const [selectedSections, setSelectedSections] = useState(sectionOrder);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isBannerPaused, setIsBannerPaused] = useState(false);
  const banners = useMemo(
    () => (Array.isArray(adBanners) ? adBanners.filter((banner) => typeof banner === 'string' && banner.trim()) : []),
    [adBanners]
  );
  const bannerSources = useMemo(() => banners.map((banner) => resolveBannerRef(banner)), [banners, resolveBannerRef]);

  useEffect(() => {
    setSelectedSections((previous) => {
      const matches =
        previous.length === sectionOrder.length && previous.every((sectionId, index) => sectionId === sectionOrder[index]);

      return matches ? previous : sectionOrder;
    });
  }, [sectionOrder]);

  useEffect(() => {
    bannerSources.forEach((source) => {
      const image = new Image();
      image.src = source;
    });
  }, [bannerSources]);

  useEffect(() => {
    if (activeBannerIndex >= bannerSources.length) {
      setActiveBannerIndex(0);
    }
  }, [activeBannerIndex, bannerSources.length]);

  useEffect(() => {
    if (isBannerPaused || bannerSources.length <= 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveBannerIndex((previous) => (previous + 1) % bannerSources.length);
    }, BANNER_SWAP_MS);

    return () => {
      window.clearInterval(timerId);
    };
  }, [bannerSources.length, isBannerPaused]);

  const showBanner = (nextIndex) => {
    setActiveBannerIndex(nextIndex < 0 ? bannerSources.length - 1 : nextIndex >= bannerSources.length ? 0 : nextIndex);
  };

  const showPreviousBanner = () => {
    setIsBannerPaused(false);
    setActiveBannerIndex((previous) => (previous - 1 + bannerSources.length) % bannerSources.length);
  };

  const showNextBanner = () => {
    setIsBannerPaused(false);
    setActiveBannerIndex((previous) => (previous + 1) % bannerSources.length);
  };

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
        {bannerSources.length > 0 ? (
          <motion.div
            className={styles.adSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setIsBannerPaused(true)}
            onMouseLeave={() => setIsBannerPaused(false)}
            onFocusCapture={() => setIsBannerPaused(true)}
            onBlurCapture={() => setIsBannerPaused(false)}
          >
            <div className={styles.bannerFrame} style={{ '--banner-aspect-ratio': AD_BANNER_ASPECT_RATIO }}>
              <button
                type="button"
                className={`${styles.bannerNavButton} ${styles.bannerNavLeft}`}
                onClick={showPreviousBanner}
                aria-label="Previous banner"
              >
                <ChevronLeft size={18} />
              </button>

              <div className={styles.bannerImageStack}>
                {bannerSources.map((banner, index) => (
                  <motion.img
                    key={`${banner}-${index}`}
                    src={banner}
                    alt="Prince Vegetables offer banner"
                    className={styles.bannerImage}
                    initial={false}
                    animate={{ opacity: index === activeBannerIndex ? 1 : 0, x: index === activeBannerIndex ? 0 : 12 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>

              <button
                type="button"
                className={`${styles.bannerNavButton} ${styles.bannerNavRight}`}
                onClick={showNextBanner}
                aria-label="Next banner"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className={styles.bannerDots} aria-label="Banner navigation">
              {bannerSources.map((banner, index) => (
                <button
                  key={`${banner}-dot-${index}`}
                  type="button"
                  className={`${styles.bannerDot} ${index === activeBannerIndex ? styles.bannerDotActive : ''}`}
                  onClick={() => showBanner(index)}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
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

          <button
            type="button"
            className={styles.resetButton}
            onClick={() => setSelectedSections((previous) => (previous.length === sectionOrder.length ? [] : sectionOrder))}
          >
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
