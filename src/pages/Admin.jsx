import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  Download,
  Lock,
  Plus,
  RefreshCcw,
  Shield,
  Trash2,
  Upload,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import styles from './Admin.module.css';
import {
  IMAGE_LIBRARY,
  resolveImageRef
} from '../data/catalogSeed';
import { useCatalog } from '../context/CatalogContext';

const ADMIN_KEY = 'prince-garden-2026';
const ACCESS_STORAGE_KEY = 'princeVegAdminAccess';

const humanizeKey = (key) =>
  key
    .replace(/^preset:/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/^./, (character) => character.toUpperCase());

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

const imageOptions = Object.keys(IMAGE_LIBRARY).map((key) => ({ value: `preset:${key}`, label: humanizeKey(key) }));

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
    getSection,
    updateSection,
    addSection,
    removeSection,
    moveSection,
    addProduct,
    updateProduct,
    removeProduct,
    moveProduct,
    resetCatalog,
    exportCatalog,
    importCatalog
  } = useCatalog();
  const [searchParams] = useSearchParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [priceDrafts, setPriceDrafts] = useState({});
  const [offerDrafts, setOfferDrafts] = useState({});
  const importInputRef = useRef(null);

  useEffect(() => {
    const queryKey = searchParams.get('key');
    const savedAccess = window.localStorage.getItem(ACCESS_STORAGE_KEY);

    if (queryKey === ADMIN_KEY || savedAccess === 'true') {
      setIsUnlocked(true);
    }
  }, [searchParams]);

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

  const totalProducts = useMemo(
    () => sections.reduce((total, section) => total + section.items.length, 0),
    [sections]
  );

  const selectedSection = selectedSectionId ? getSection(selectedSectionId) : sections[0];
  const unlock = () => {
    if (accessKey.trim() === ADMIN_KEY) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
      setIsUnlocked(true);
      return;
    }

    setAccessKey('');
  };

  const lockAgain = () => {
    window.localStorage.removeItem(ACCESS_STORAGE_KEY);
    setIsUnlocked(false);
    setAccessKey('');
  };

  const downloadCatalog = () => {
    const blob = new Blob([exportCatalog()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'prince-vegetables-catalog.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const text = await file.text();
    importCatalog(JSON.parse(text));
    event.target.value = '';
  };

  const handleSectionCreate = () => {
    const nextSectionId = addSection();
    setSelectedSectionId(nextSectionId);
  };

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
            Enter the admin key or open the page with <span>?key=your-key</span> to unlock the catalog editor.
          </p>
          <div className={styles.authField}>
            <input
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              placeholder="Enter admin key"
            />
            <button type="button" className={styles.primaryButton} onClick={unlock}>
              Unlock
            </button>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={lockAgain}>
            Clear saved access
          </button>
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
          <h1>Vegetable catalog control panel</h1>
          <p>
            Edit sections, product cards, prices, offers, photos and ordering from one private URL-only panel.
          </p>
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

      <div className={styles.toolbar}>
        <button type="button" className={styles.primaryButton} onClick={handleSectionCreate}>
          <Plus size={16} />
          Add section
        </button>
        <button type="button" className={styles.secondaryButton} onClick={downloadCatalog}>
          <Download size={16} />
          Export JSON
        </button>
        <button type="button" className={styles.secondaryButton} onClick={() => importInputRef.current?.click()}>
          <Upload size={16} />
          Import JSON
        </button>
        <button type="button" className={styles.secondaryButton} onClick={resetCatalog}>
          <RefreshCcw size={16} />
          Reset catalog
        </button>
        <button type="button" className={styles.secondaryButton} onClick={lockAgain}>
          <Lock size={16} />
          Lock panel
        </button>
        <input ref={importInputRef} type="file" accept="application/json" hidden onChange={handleImport} />
      </div>

      <div className={styles.layout}>
        <aside className={`${styles.sidebar} glass`}>
          <div className={styles.panelHeader}>
            <h2>Sections</h2>
            <span>{sectionOrder.length}</span>
          </div>

          <div className={styles.sectionList}>
            {sections.map((section, index) => (
              <button
                type="button"
                key={section.id}
                className={`${styles.sectionItem} ${selectedSectionId === section.id ? styles.sectionItemActive : ''}`}
                onClick={() => setSelectedSectionId(section.id)}
              >
                <div>
                  <strong>{section.title}</strong>
                  <span>{section.items.length} products</span>
                </div>
                <span className={styles.sectionTag}>{index + 1}</span>
              </button>
            ))}
          </div>

          <div className={styles.sidebarActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={!selectedSection}
              onClick={() => selectedSection && moveSection(selectedSection.id, -1)}
            >
              <ArrowUp size={16} />
              Move up
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={!selectedSection}
              onClick={() => selectedSection && moveSection(selectedSection.id, 1)}
            >
              <ArrowDown size={16} />
              Move down
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={!selectedSection}
              onClick={() => selectedSection && removeSection(selectedSection.id)}
            >
              <Trash2 size={16} />
              Remove section
            </button>
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
                          Photo preset
                          <select
                            value={product.imageRef?.startsWith('preset:') ? product.imageRef : 'custom'}
                            onChange={(event) => {
                              if (event.target.value === 'custom') {
                                return;
                              }

                              updateProduct(selectedSection.id, product.id, { imageRef: event.target.value });
                            }}
                          >
                            {imageOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                            <option value="custom">Custom upload</option>
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
