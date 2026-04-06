import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import brandIcon from '../assets/Vibrant vegetable assortment in detail.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.logo}>
        <NavLink to="/" onClick={closeMenu} className={styles.brandLink}>
          <img src={brandIcon} alt="Prince Vegetables" className={styles.brandLogo} />
          <span>Prince Vegetables</span>
        </NavLink>
      </div>
      
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>Shop</NavLink>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search for grocery, vegetables..." />
        </div>
        <button className={styles.iconButton}>
          <ShoppingBag size={20} />
          <span className={styles.badge}>2</span>
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
        <div className={styles.mobileSearchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search vegetables..." />
        </div>

        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>Shop</NavLink>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
