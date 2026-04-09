import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Lock,
  Plus,
  Shield,
  Trash2,
} from 'lucide-react';
import styles from './Admin.module.css';
import {
  resolveImageRef
} from '../data/catalogSeed';
import { useCatalog } from '../context/CatalogContext';
const DEFAULT_REMOTE_API_BASE_URL = 'https://prince-vegetables.vercel.app';

const resolveAdminAuthApiUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_CATALOG_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return `${configuredBaseUrl.replace(/\/$/, '')}/api/admin-auth`;
  }

  if (typeof window !== 'undefined') {
    const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (isLocalHost) {
      return `${DEFAULT_REMOTE_API_BASE_URL}/api/admin-auth`;
    }
  }

  return '/api/admin-auth';
};

const ADMIN_AUTH_API_URL = resolveAdminAuthApiUrl();

// Removed LOCAL_DEV_PASSWORD so we don't need double .env variables

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

const normalizePriceInput = (rawValue) => {
  if (rawValue === '') {
    return '';
  }

  const cleaned = rawValue.replace(/[^\d.]/g, '');

  if (!cleaned) {
    return '';
  }

  const [integerPartRaw = '', ...decimalParts] = cleaned.split('.');
  const decimalPart = decimalParts.join('').slice(0, 2);
  const normalizedInteger = integerPartRaw.replace(/^0+(?=\d)/, '');
  const safeInteger = normalizedInteger || '0';

  return decimalPart ? `${safeInteger}.${decimalPart}` : safeInteger;
};

const normalizeOfferInput = (rawValue) => {
  if (rawValue === '') {
    return '';
  }

  const digitsOnly = rawValue.replace(/\D/g, '');

  if (!digitsOnly) {
    return '';
  }

  const normalized = digitsOnly.replace(/^0+(?=\d)/, '');
  return normalized || '0';
};

const Admin = () => {
  const {
    sections,
    sectionOrder,
    storageStatus,
    adBanners,
    getSection,
    updateSection,
    addSection,
    removeSection,
    moveSection,
    addProduct,
    updateProduct,
    removeProduct,
    moveProduct,
    resolveBannerRef,
    updateAdBanner,
    addAdBanner,
    removeAdBanner
  } = useCatalog();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [priceDrafts, setPriceDrafts] = useState({});
  const [offerDrafts, setOfferDrafts] = useState({});
  const [adEditorOffset, setAdEditorOffset] = useState(0);
  const getLastAdEditorOffset = () => {
    const bannerCount = adBanners?.length ?? 0;

    if (bannerCount <= 2) {
      return 0;
    }

    return Math.floor((bannerCount - 1) / 2) * 2;
  };

  useEffect(() => {
    if (!selectedSectionId && sections.length > 0) {
      setSelectedSectionId(sections[0].id);
      return;
    }

    if (selectedSectionId && !sections.some((section) => section.id === selectedSectionId)) {
      setSelectedSectionId(sections[0]?.id ?? '');
    }
  }, [sections, selectedSectionId]);

  useEffect(() => {
    const validProductIds = new Set(
      sections.flatMap((section) => section.items.map((product) => product.id))
    );

    setPriceDrafts((previous) => {
      const next = Object.fromEntries(
        Object.entries(previous).filter(([productId]) => validProductIds.has(productId))
      );

      return Object.keys(next).length === Object.keys(previous).length ? previous : next;
    });

    setOfferDrafts((previous) => {
      const next = Object.fromEntries(
        Object.entries(previous).filter(([productId]) => validProductIds.has(productId))
      );

      return Object.keys(next).length === Object.keys(previous).length ? previous : next;
    });
  }, [sections]);

  useEffect(() => {
    if (isUnlocked) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const navbar = document.getElementById('main-navbar');

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (navbar) navbar.style.display = 'none';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      if (navbar) navbar.style.display = '';
    };
  }, [isUnlocked]);

  useEffect(() => {
    const lastOffset = getLastAdEditorOffset();

    if (adEditorOffset > lastOffset) {
      setAdEditorOffset(lastOffset);
    }
  }, [adBanners, adEditorOffset]);

  const totalProducts = useMemo(
    () => sections.reduce((total, section) => total + section.items.length, 0),
    [sections]
  );

  const selectedSection = selectedSectionId ? getSection(selectedSectionId) : sections[0];

  const unlock = async (event) => {
    event.preventDefault();

    if (!accessKey.trim() || isAuthenticating) {
      return;
    }

    setAuthError('');
    setIsAuthenticating(true);

    // Local fallback: verify against dynamically injected dev password (only visible in dev mode)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-undef
      if (__DEV_ADMIN_PASSWORD__ && accessKey.trim() === __DEV_ADMIN_PASSWORD__) {
        setIsUnlocked(true);
      } else {
        setAuthError('Invalid password for localhost.');
        setAccessKey('');
      }
      setIsAuthenticating(false);
      return;
    }

    try {
      const response = await fetch(ADMIN_AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: accessKey })
      });

      if (!response.ok) {
        if (response.status >= 500) {
          setAuthError('Admin auth service is not configured correctly. Please check Vercel env variables.');
          setAccessKey('');
          return;
        }

        setAuthError('Invalid password. Please try again.');
        setAccessKey('');
        return;
      }

      setIsUnlocked(true);
    } catch {
      setAuthError('Unable to verify password right now. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSectionCreate = () => {
    const nextSectionId = addSection();
    setSelectedSectionId(nextSectionId);
  };

  const handleAdBannerUpload = async (bannerIndex, file) => {
    if (!file) {
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    updateAdBanner(bannerIndex, dataUrl);
  };

  const showPreviousAdEditorPage = () => {
    setAdEditorOffset((previous) => Math.max(0, previous - 2));
  };

  const showNextAdEditorPage = () => {
    const lastOffset = getLastAdEditorOffset();
    setAdEditorOffset((previous) => Math.min(lastOffset, previous + 2));
  };

  const visibleAdBanners = (adBanners ?? []).slice(adEditorOffset, adEditorOffset + 2);

  const handleProductFileUpload = async (sectionId, productId, file) => {
    if (!file) {
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    updateProduct(sectionId, productId, { imageRef: dataUrl });
  };

  const handlePriceDraftChange = (sectionId, productId, rawValue) => {
    const normalizedValue = normalizePriceInput(rawValue);

    setPriceDrafts((previous) => ({ ...previous, [productId]: normalizedValue }));

    if (normalizedValue === '') {
      return;
    }

    const parsedValue = Number.parseFloat(normalizedValue);

    if (Number.isFinite(parsedValue)) {
      updateProduct(sectionId, productId, { price: parsedValue });
    }
  };

  const clearPriceDraft = (productId) => {
    setPriceDrafts((previous) => {
      if (!(productId in previous)) {
        return previous;
      }

      const next = { ...previous };
      delete next[productId];
      return next;
    });
  };

  const handleOfferDraftChange = (sectionId, productId, rawValue) => {
    const normalizedValue = normalizeOfferInput(rawValue);

    setOfferDrafts((previous) => ({ ...previous, [productId]: normalizedValue }));

    if (normalizedValue === '') {
      return;
    }

    const parsedValue = Number.parseInt(normalizedValue, 10);

    if (Number.isFinite(parsedValue)) {
      updateProduct(sectionId, productId, { discount: parsedValue });
    }
  };

  const clearOfferDraft = (productId) => {
    setOfferDrafts((previous) => {
      if (!(productId in previous)) {
        return previous;
      }

      const next = { ...previous };
      delete next[productId];
      return next;
    });
  };

  if (!isUnlocked) {
    return (
      <div className={styles.authPage}>
        <motion.div
          className={`${styles.authCard} glass`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.authBadge}>
            <Lock size={16} />
            Hidden access
          </div>
          <h1>Admin Panel</h1>
          <p>
            Enter your admin password to unlock the catalog editor.
          </p>
          <form className={styles.authField} onSubmit={unlock}>
            <input
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              placeholder="Enter admin password"
            />
            <button type="submit" className={styles.primaryButton} disabled={isAuthenticating}>
              Get access
            </button>
          </form>
          {authError ? <p className={styles.authError}>{authError}</p> : null}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroCard}>
        <div>
          <span className={styles.kicker}>
            <Shield size={14} />
            Hidden Catalog Console
          </span>
          <h1>Admin Control Panel</h1>
        </div>
        <div className={styles.heroStats}>
          <div>
            <strong>{sections.length}</strong>
            <span>sections</span>
          </div>
          <div>
            <strong>{totalProducts}</strong>
            <span>products</span>
          </div>
          <div>
              <strong>{storageStatus}</strong>
              <span>catalog source</span>
          </div>
        </div>
      </div>

      <section className={`${styles.adEditorCard} glass`}>
        <div className={styles.panelHeader}>
          <h2>Shop Advertisement Banners</h2>
          <div className={styles.adEditorActions}>
            <span className={styles.statusPill}>Editable</span>
            <button
              type="button"
              className={styles.iconButtonSmall}
              onClick={showPreviousAdEditorPage}
              title="Previous banners"
              disabled={adEditorOffset === 0}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={styles.iconButtonSmall}
              onClick={showNextAdEditorPage}
              title="Next banners"
              disabled={adEditorOffset + 2 >= (adBanners?.length ?? 0)}
            >
              <ChevronRight size={16} />
            </button>
            <button type="button" className={styles.iconButtonSmall} onClick={addAdBanner} title="Add new banner slot">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className={styles.adEditorGrid}>
          {visibleAdBanners.map((banner, localIndex) => {
            const bannerIndex = adEditorOffset + localIndex;

            return (
            <article key={`ad-banner-${bannerIndex}`} className={styles.adEditorItem}>
              <div className={styles.adEditorItemTop}>
                <span className={styles.adEditorItemLabel}>Banner {bannerIndex + 1}</span>
                <button
                  type="button"
                  className={styles.sectionActionButton}
                  onClick={() => removeAdBanner(bannerIndex)}
                  title="Delete banner"
                  aria-label={`Delete banner ${bannerIndex + 1}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className={styles.adPreviewBox}>
                <img src={resolveBannerRef(banner)} alt={`Shop advertisement banner ${bannerIndex + 1}`} />
              </div>
              <label>
                Upload banner {bannerIndex + 1}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleAdBannerUpload(bannerIndex, event.target.files?.[0])}
                />
              </label>
            </article>
            );
          })}
          {visibleAdBanners.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No banners yet. Use + to add a banner slot.</p>
            </div>
          ) : null}
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={`${styles.sidebar} glass`}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleGroup}>
              <h2>Sections</h2>
              <span>{sectionOrder.length}</span>
            </div>
            <button type="button" className={styles.iconButtonSmall} onClick={handleSectionCreate} title="Add new section">
              <Plus size={16} />
            </button>
          </div>

          <div className={styles.sectionList}>
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`${styles.sectionItem} ${selectedSectionId === section.id ? styles.sectionItemActive : ''}`}
              >
                <button
                  type="button"
                  className={styles.sectionSelectButton}
                  onClick={() => setSelectedSectionId(section.id)}
                >
                  <span className={styles.sectionTag}>{index + 1}</span>
                  <div>
                    <strong>{section.title}</strong>
                    <span className={styles.sectionMeta}>{section.items.length} products</span>
                  </div>
                </button>
                <div className={styles.sectionRowActions}>
                  <button
                    type="button"
                    className={styles.sectionActionButton}
                    onClick={() => moveSection(section.id, -1)}
                    aria-label={`Move ${section.title} up`}
                    title="Move up"
                    disabled={index === 0}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className={styles.sectionActionButton}
                    onClick={() => moveSection(section.id, 1)}
                    aria-label={`Move ${section.title} down`}
                    title="Move down"
                    disabled={index === sections.length - 1}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className={styles.sectionActionButton}
                    onClick={() => removeSection(section.id)}
                    aria-label={`Remove ${section.title}`}
                    title="Remove section"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className={styles.main}>
          {selectedSection ? (
            <>
              <section className={`${styles.editorCard} glass`}>
                <div className={styles.panelHeader}>
                  <h2>Section editor</h2>
                  <span className={styles.statusPill}>Editable</span>
                </div>

                <div className={styles.fieldGrid}>
                  <label>
                    Title
                    <input
                      type="text"
                      value={selectedSection.title}
                      onChange={(event) => updateSection(selectedSection.id, { title: event.target.value })}
                    />
                  </label>
                  <label>
                    Subtitle
                    <input
                      type="text"
                      value={selectedSection.subtitle}
                      onChange={(event) => updateSection(selectedSection.id, { subtitle: event.target.value })}
                    />
                  </label>
                  <label>
                    Default weight text
                    <input
                      type="text"
                      value={selectedSection.unit}
                      onChange={(event) => updateSection(selectedSection.id, { unit: event.target.value })}
                    />
                  </label>
                </div>
              </section>

              <section className={styles.productsHeader}>
                <div>
                  <h2>Products in {selectedSection.title}</h2>
                  <p>Edit prices, offers, photos and transfer items between sections.</p>
                </div>
                <button type="button" className={styles.primaryButton} onClick={() => addProduct(selectedSection.id)}>
                  <Plus size={16} />
                  Add product
                </button>
              </section>

              <div className={styles.productGrid}>
                {selectedSection.items.map((product) => (
                  <motion.section
                    key={product.id}
                    className={`${styles.productCard} glass`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.productTopRow}>
                      <strong>{product.name}</strong>
                      <div className={styles.moveButtons}>
                        <button type="button" onClick={() => moveProduct(selectedSection.id, product.id, -1)}>
                          <ArrowUp size={14} />
                        </button>
                        <button type="button" onClick={() => moveProduct(selectedSection.id, product.id, 1)}>
                          <ArrowDown size={14} />
                        </button>
                        <button type="button" onClick={() => removeProduct(selectedSection.id, product.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.productLayout}>
                      <div className={styles.previewBox}>
                        <img src={resolveImageRef(product.imageRef)} alt={product.name} />
                      </div>

                      <div className={styles.productFields}>
                        <label>
                          Name
                          <input
                            type="text"
                            value={product.name}
                            onChange={(event) => updateProduct(selectedSection.id, product.id, { name: event.target.value })}
                          />
                        </label>

                        <label>
                          Weight text
                          <input
                            type="text"
                            value={product.weight}
                            onChange={(event) => updateProduct(selectedSection.id, product.id, { weight: event.target.value })}
                          />
                        </label>

                        <div className={styles.twoColumnFields}>
                          <label>
                            Price (INR)
                            <input
                              type="text"
                              inputMode="decimal"
                              value={priceDrafts[product.id] ?? String(product.price)}
                              onFocus={(event) => event.target.select()}
                              onChange={(event) =>
                                handlePriceDraftChange(selectedSection.id, product.id, event.target.value)
                              }
                              onBlur={() => clearPriceDraft(product.id)}
                            />
                          </label>
                          <label>
                            Offer %
                            <input
                              type="text"
                              inputMode="numeric"
                              value={offerDrafts[product.id] ?? String(product.discount)}
                              onFocus={(event) => event.target.select()}
                              onChange={(event) =>
                                handleOfferDraftChange(selectedSection.id, product.id, event.target.value)
                              }
                              onBlur={() => clearOfferDraft(product.id)}
                            />
                          </label>
                        </div>

                        <label>
                          Section
                          <select
                            value={selectedSection.id}
                            onChange={(event) =>
                              updateProduct(selectedSection.id, product.id, { sectionId: event.target.value })
                            }
                          >
                            {sections.map((section) => (
                              <option key={section.id} value={section.id}>
                                {section.title}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label>
                          Upload image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleProductFileUpload(selectedSection.id, product.id, event.target.files?.[0])}
                          />
                        </label>
                      </div>
                    </div>
                  </motion.section>
                ))}
              </div>
            </>
          ) : (
            <div className={`${styles.emptyState} glass`}>
              <h2>No section selected</h2>
              <p>Add a section or pick an existing one to start editing the catalog.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
