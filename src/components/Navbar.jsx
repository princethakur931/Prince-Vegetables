import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import brandIcon from '../assets/Vibrant vegetable assortment in detail.png';
import aiBotGif from '../assets/AI Bot.gif';
import { useCatalog } from '../context/CatalogContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useCatalog();

  const closeMenu = () => setIsOpen(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    closeMenu();
    navigate('/products');
  };

  return (
    <nav id="main-navbar" className={`${styles.navbar} glass`}>
      <div className={styles.logo}>
        <NavLink to="/" onClick={closeMenu} className={styles.brandLink}>
          <img src={brandIcon} alt="Prince Vegetables" className={styles.brandLogo} />
          <span>Prince Vegetables</span>
        </NavLink>
      </div>
      
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>Shop</NavLink>
        <a href="/#about">About</a>
        <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink>
      </div>

      <div className={styles.actions}>
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for grocery, vegetables..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>
        <button className={styles.iconButton}>
          <img src={aiBotGif} alt="AI assistant" className={styles.actionGifIcon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.mobileMenu}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ''}`}>
        <form className={styles.mobileSearchBar} onSubmit={handleSearchSubmit}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search vegetables..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>

        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>Shop</NavLink>
        <a href="/#about" onClick={closeMenu}>About</a>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
