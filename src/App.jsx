import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Agent from './pages/Agent';
import Home from './pages/Home';
import Products from './pages/Products';
import { CatalogProvider } from './context/CatalogContext';
import appIcon from './assets/Vibrant vegetable assortment in detail.png';

const normalizeAdminPath = (pathValue) => {
  const candidate = String(pathValue ?? '/admin').trim();
  const withLeadingSlash = candidate.startsWith('/') ? candidate : `/${candidate}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, '');

  return withoutTrailingSlash || '/admin';
};

const ADMIN_PANEL_PATH = normalizeAdminPath(import.meta.env.VITE_ADMIN_PANEL_PATH);

function App() {
  useEffect(() => {
    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    favicon.type = 'image/png';
    favicon.href = appIcon;
  }, []);

  return (
    <CatalogProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/agent" element={<Agent />} />
          <Route path={ADMIN_PANEL_PATH} element={<Admin />} />
        </Routes>
      </Router>
    </CatalogProvider>
  );
}

export default App;
