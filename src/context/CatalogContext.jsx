import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  buildDefaultCatalog,
  createEmptyProduct,
  createEmptySection,
  resolveImageRef,
  SECTION_ORDER
} from '../data/catalogSeed';

const STORAGE_KEY = 'prince-vegitables-catalog-v1';

const CatalogContext = createContext(null);

const cloneCatalog = (catalog) =>
  catalog.map((section) => ({
    ...section,
    items: section.items.map((product) => ({ ...product }))
  }));

const isTomatoName = (value) => /tomato|tamatar|tomatao/i.test(String(value ?? ''));

const ensureTomatoImageRef = (name, imageRef) => (isTomatoName(name) ? 'preset:tomato' : imageRef);

const normalizeCatalog = (value) => {
  if (!value || !Array.isArray(value.sections)) {
    return { sections: buildDefaultCatalog() };
  }

  return {
    sections: value.sections.map((section) => ({
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

const loadInitialCatalog = () => {
  if (typeof window === 'undefined') {
    return { sections: buildDefaultCatalog() };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { sections: buildDefaultCatalog() };
    }

    return normalizeCatalog(JSON.parse(raw));
  } catch {
    return { sections: buildDefaultCatalog() };
  }
};

const saveCatalog = (catalog) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
};

export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(loadInitialCatalog);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveCatalog(catalog);
  }, [catalog]);

  const sections = catalog.sections;
  const sectionsById = useMemo(() => Object.fromEntries(sections.map((section) => [section.id, section])), [sections]);

  const value = useMemo(() => {
    const updateSection = (sectionId, updates) => {
      setCatalog((previous) => ({
        sections: previous.sections.map((section) =>
          section.id === sectionId ? { ...section, ...updates } : section
        )
      }));
    };

    const addSection = () => {
      const newSection = createEmptySection();
      setCatalog((previous) => ({ sections: [...previous.sections, newSection] }));
      return newSection.id;
    };

    const removeSection = (sectionId) => {
      setCatalog((previous) => {
        if (previous.sections.length <= 1) {
          return previous;
        }

        return { sections: previous.sections.filter((section) => section.id !== sectionId) };
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
        return { sections: sectionsCopy };
      });
    };

    const addProduct = (sectionId) => {
      const newProduct = createEmptyProduct();
      setCatalog((previous) => ({
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

        return { sections: nextSections };
      });
    };

    const removeProduct = (sectionId, productId) => {
      setCatalog((previous) => ({
        sections: previous.sections.map((section) =>
          section.id === sectionId
            ? { ...section, items: section.items.filter((item) => item.id !== productId) }
            : section
        )
      }));
    };

    const moveProduct = (sectionId, productId, direction) => {
      setCatalog((previous) => ({
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

    const resetCatalog = () => setCatalog({ sections: buildDefaultCatalog() });

    const exportCatalog = () => JSON.stringify(catalog, null, 2);

    const importCatalog = (nextCatalog) => {
      setCatalog(normalizeCatalog(nextCatalog));
    };

    return {
      catalog,
      sections,
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
      resetCatalog,
      exportCatalog,
      importCatalog,
      sectionOrderDefault: SECTION_ORDER
    };
  }, [catalog, searchQuery, sections, sectionsById]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error('useCatalog must be used inside CatalogProvider');
  }

  return context;
};
