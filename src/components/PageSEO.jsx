import { useEffect } from 'react';

const DESCRIPTION_SELECTOR = 'meta[name="description"]';

const updateOrCreateMeta = (selector, attributeName, attributeValue, content) => {
  let metaTag = document.head.querySelector(selector);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};

const PageSEO = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (!description) {
      return;
    }

    updateOrCreateMeta(DESCRIPTION_SELECTOR, 'name', 'description', description);
  }, [description]);

  return null;
};

export default PageSEO;