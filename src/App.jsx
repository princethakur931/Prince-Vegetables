import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Products from './pages/Products';
import { CatalogProvider } from './context/CatalogContext';
import appIcon from './assets/Vibrant vegetable assortment in detail.png';

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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CatalogProvider>
  );
}

export default App;
