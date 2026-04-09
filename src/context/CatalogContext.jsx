import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  buildDefaultCatalog,
  createEmptyProduct,
  createEmptySection,
  DEFAULT_AD_BANNERS,
  resolveImageRef,
  SECTION_ORDER
} from '../data/catalogSeed';

const STORAGE_KEY = 'prince-vegitables-catalog-v1';
const DEFAULT_REMOTE_API_BASE_URL = 'https://prince-vegetables.vercel.app';

const resolveApiUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_CATALOG_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return `${configuredBaseUrl.replace(/\/$/, '')}/api/catalog`;
  }

  if (typeof window !== 'undefined') {
    const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (isLocalHost) {
      return `${DEFAULT_REMOTE_API_BASE_URL}/api/catalog`;
    }
  }

  return '/api/catalog';
};

const API_URL = resolveApiUrl();

const CatalogContext = createContext(null);

const cloneCatalog = (catalog) =>
  catalog.map((section) => ({
    ...section,
    items: section.items.map((product) => ({ ...product }))
  }));

const isTomatoName = (value) => /tomato|tamatar|tomatao/i.test(String(value ?? ''));

const ensureTomatoImageRef = (name, imageRef) => (isTomatoName(name) ? 'preset:tomato' : imageRef);

const getCatalogPayload = (value) => value?.catalog ?? value;

const normalizeAdBanners = (value) => {
  if (!Array.isArray(value)) {
    return [...DEFAULT_AD_BANNERS];
  }

  const normalized = value.filter((item) => typeof item === 'string' && item.trim());
  return normalized.length > 0 ? normalized : [...DEFAULT_AD_BANNERS];
};

const normalizeCatalog = (value) => {
  const payload = getCatalogPayload(value);

  if (!payload || !Array.isArray(payload.sections) || payload.sections.length === 0) {
    return { sections: buildDefaultCatalog(), adBanners: [...DEFAULT_AD_BANNERS] };
  }

  return {
    adBanners: normalizeAdBanners(payload.adBanners),
    sections: payload.sections.map((section) => ({
      id: section.id,
      title: section.title ?? 'Untitled Section',
      subtitle: section.subtitle ?? '',
      unit: section.unit ?? 'fresh pack, 1 kg',
      items: Array.isArray(section.items)
        ? section.items.map((item) => ({
            id: item.id ?? `product-${Date.now()}`,
            name: item.name ?? 'Vegetable',
            weight: item.weight ?? section.unit ?? 'fresh pack, 1 kg',
            price: Number.isFinite(Number(item.price)) ? Number(item.price) : 2.99,
            discount: Number.isFinite(Number(item.discount)) ? Number(item.discount) : 10,
            imageRef: ensureTomatoImageRef(item.name, item.imageRef ?? item.image ?? 'preset:carrot'),
            bgColor: item.bgColor ?? '#fff2e6'
          }))
        : []
    }))
  };
};

const loadCachedCatalog = () => {
  if (typeof window === 'undefined') {
    return { sections: buildDefaultCatalog(), adBanners: [...DEFAULT_AD_BANNERS] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { sections: buildDefaultCatalog(), adBanners: [...DEFAULT_AD_BANNERS] };
    }

    return normalizeCatalog(JSON.parse(raw));
  } catch {
    return { sections: buildDefaultCatalog(), adBanners: [...DEFAULT_AD_BANNERS] };
  }
};

const saveCachedCatalog = (catalog) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
};

const persistCatalogToApi = async (catalog) => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ catalog })
  });

  if (!response.ok) {
    throw new Error(`Failed to save catalog: ${response.status}`);
  }
};

export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(loadCachedCatalog);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRemoteAvailable, setIsRemoteAvailable] = useState(false);

  useEffect(() => {
    saveCachedCatalog(catalog);
  }, [catalog]);

  useEffect(() => {
    let cancelled = false;

    const syncCatalog = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          const payload = await response.json();
          const normalizedCatalog = normalizeCatalog(payload);

          if (!cancelled) {
            setCatalog(normalizedCatalog);
            saveCachedCatalog(normalizedCatalog);
            setIsRemoteAvailable(true);
          }

          return;
        }

        if (response.status === 404) {
          const initialCatalog = loadCachedCatalog();
          await persistCatalogToApi(initialCatalog);

          if (!cancelled) {
            setIsRemoteAvailable(true);
          }

          return;
        }
      } catch {
        if (!cancelled) {
          setIsRemoteAvailable(false);
        }

        return;
      }

      if (!cancelled) {
        setIsRemoteAvailable(false);
      }
    };

    void syncCatalog();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isRemoteAvailable) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void persistCatalogToApi(catalog).catch(() => {
        setIsRemoteAvailable(false);
      });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [catalog, isRemoteAvailable]);

  const sections = catalog.sections;
  const adBanners = catalog.adBanners;
  const sectionsById = useMemo(() => Object.fromEntries(sections.map((section) => [section.id, section])), [sections]);

  const value = useMemo(() => {
    const updateSection = (sectionId, updates) => {
      setCatalog((previous) => ({
        ...previous,
        sections: previous.sections.map((section) =>
          section.id === sectionId ? { ...section, ...updates } : section
        )
      }));
    };

    const addSection = () => {
      const newSection = createEmptySection();
      setCatalog((previous) => ({ ...previous, sections: [...previous.sections, newSection] }));
      return newSection.id;
    };

    const removeSection = (sectionId) => {
      setCatalog((previous) => {
        if (previous.sections.length <= 1) {
          return previous;
        }

        return { ...previous, sections: previous.sections.filter((section) => section.id !== sectionId) };
      });
    };

    const moveSection = (sectionId, direction) => {
      setCatalog((previous) => {
        const currentIndex = previous.sections.findIndex((section) => section.id === sectionId);
        const nextIndex = currentIndex + direction;

        if (currentIndex < 0 || nextIndex < 0 || nextIndex >= previous.sections.length) {
          return previous;
        }

        const sectionsCopy = cloneCatalog(previous.sections);
        const [movedSection] = sectionsCopy.splice(currentIndex, 1);
        sectionsCopy.splice(nextIndex, 0, movedSection);
        return { ...previous, sections: sectionsCopy };
      });
    };

    const addProduct = (sectionId) => {
      const newProduct = createEmptyProduct();
      setCatalog((previous) => ({
        ...previous,
        sections: previous.sections.map((section) =>
          section.id === sectionId ? { ...section, items: [...section.items, newProduct] } : section
        )
      }));
      return newProduct.id;
    };

    const updateProduct = (sectionId, productId, updates) => {
      setCatalog((previous) => {
        const targetSectionId = updates.sectionId ?? sectionId;
        const sourceSection = previous.sections.find((section) => section.id === sectionId);
        if (!sourceSection) {
          return previous;
        }

        const productIndex = sourceSection.items.findIndex((item) => item.id === productId);
        if (productIndex === -1) {
          return previous;
        }

        const updatedItem = {
          ...sourceSection.items[productIndex],
          ...updates,
          weight: updates.weight ?? sourceSection.items[productIndex].weight,
          price: Number.isFinite(Number(updates.price)) ? Number(updates.price) : sourceSection.items[productIndex].price,
          discount: Number.isFinite(Number(updates.discount))
            ? Number(updates.discount)
            : sourceSection.items[productIndex].discount,
          imageRef: ensureTomatoImageRef(
            updates.name ?? sourceSection.items[productIndex].name,
            updates.imageRef ?? updates.image ?? sourceSection.items[productIndex].imageRef
          ),
          bgColor: updates.bgColor ?? sourceSection.items[productIndex].bgColor
        };

        if (targetSectionId === sectionId) {
          return {
            ...previous,
            sections: previous.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    items: section.items.map((item) => (item.id === productId ? updatedItem : item))
                  }
                : section
            )
          };
        }

        const nextSections = previous.sections.map((section) => {
          if (section.id === sectionId) {
            return { ...section, items: section.items.filter((item) => item.id !== productId) };
          }

          if (section.id === targetSectionId) {
            return { ...section, items: [...section.items, { ...updatedItem, id: productId }] };
          }

          return section;
        });

        return { ...previous, sections: nextSections };
      });
    };

    const removeProduct = (sectionId, productId) => {
      setCatalog((previous) => ({
        ...previous,
        sections: previous.sections.map((section) =>
          section.id === sectionId
            ? { ...section, items: section.items.filter((item) => item.id !== productId) }
            : section
        )
      }));
    };

    const moveProduct = (sectionId, productId, direction) => {
      setCatalog((previous) => ({
        ...previous,
        sections: previous.sections.map((section) => {
          if (section.id !== sectionId) {
            return section;
          }

          const currentIndex = section.items.findIndex((item) => item.id === productId);
          const nextIndex = currentIndex + direction;

          if (currentIndex < 0 || nextIndex < 0 || nextIndex >= section.items.length) {
            return section;
          }

          const itemsCopy = [...section.items];
          const [movedItem] = itemsCopy.splice(currentIndex, 1);
          itemsCopy.splice(nextIndex, 0, movedItem);
          return { ...section, items: itemsCopy };
        })
      }));
    };

    const updateAdBanner = (index, bannerUrl) => {
      if (!bannerUrl || typeof bannerUrl !== 'string') {
        return;
      }

      setCatalog((previous) => {
        const nextBanners = [...(previous.adBanners ?? DEFAULT_AD_BANNERS)];
        nextBanners[index] = bannerUrl;
        return { ...previous, adBanners: nextBanners };
      });
    };

    const addAdBanner = () => {
      setCatalog((previous) => {
        const currentBanners = Array.isArray(previous.adBanners)
          ? previous.adBanners
          : [...DEFAULT_AD_BANNERS];
        const fallbackBanner = currentBanners[currentBanners.length - 1] ?? DEFAULT_AD_BANNERS[0];

        return {
          ...previous,
          adBanners: [...currentBanners, fallbackBanner]
        };
      });
    };

    const removeAdBanner = (index) => {
      setCatalog((previous) => {
        const currentBanners = Array.isArray(previous.adBanners)
          ? previous.adBanners
          : [...DEFAULT_AD_BANNERS];

        if (index < 0 || index >= currentBanners.length) {
          return previous;
        }

        return {
          ...previous,
          adBanners: currentBanners.filter((_, bannerIndex) => bannerIndex !== index)
        };
      });
    };

    const resetCatalog = () => setCatalog({ sections: buildDefaultCatalog(), adBanners: [...DEFAULT_AD_BANNERS] });

    const exportCatalog = () => JSON.stringify(catalog, null, 2);

    const importCatalog = (nextCatalog) => {
      setCatalog(normalizeCatalog(nextCatalog));
    };

    return {
      catalog,
      sections,
      adBanners,
      sectionsById,
      sectionOrder: sections.map((section) => section.id),
      searchQuery,
      setSearchQuery,
      getSection: (sectionId) => sectionsById[sectionId],
      getSectionIndex: (sectionId) => sections.findIndex((section) => section.id === sectionId),
      resolveImageRef,
      updateSection,
      addSection,
      removeSection,
      moveSection,
      addProduct,
      updateProduct,
      removeProduct,
      moveProduct,
      updateAdBanner,
      addAdBanner,
      removeAdBanner,
      resetCatalog,
      exportCatalog,
      importCatalog,
      sectionOrderDefault: SECTION_ORDER,
      storageStatus: isRemoteAvailable ? 'MongoDB' : 'Local cache'
    };
  }, [adBanners, catalog, isRemoteAvailable, searchQuery, sections, sectionsById]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error('useCatalog must be used inside CatalogProvider');
  }

  return context;
};
