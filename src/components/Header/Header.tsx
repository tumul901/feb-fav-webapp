// src/components/Header/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // <-- 1. Import usePathname
import styles from './Header.module.css';
import PillNav from '@/components/ui/PillNav/PillNav';

const SCROLL_THRESHOLD = 50;

const navItems = [
  { label: 'Releases', href: '/releases' },
  { label: 'Artists', href: '/artists' },
  { label: 'Tour', href: '/tour' },
  { label: 'Contact', href: '/contact' }
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 3. Get current path and find active index ---
  const pathname = usePathname();
  const activeIndex = navItems.findIndex(item => item.href === pathname);

  // Effect for scroll opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // Run once on mount
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to lock body scroll
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${
          isScrolled ? styles.bgScrolled : styles.bgTop
        }`}
      >
        <div className={styles.navbarContainer}>
          {/* Logo */}
          <Link href="/" className={styles.navbarLogo}>
            <Image
              src="/bg/Februarys-Favorite/februarys-favourite-logo-dark.png"
              alt="February's Favourite Logo"
              width={150}
              height={40}
              className={styles.navbarLogoImage}
              priority
            />
          </Link>

          <div className={styles.desktopNav}>
            <PillNav 
              items={navItems} 
              activeHref={pathname} 
              logo="/bg/Februarys-Favorite/februarys-favourite-logo-dark.png"
            />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
            className={`${styles.mobileMenuButton} hover:text-brand-red`}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          {/* Mobile Menu Header */}
          <div className={styles.mobileMenuHeader}>
            <Link href="/" className={styles.navbarLogo} onClick={closeMobileMenu}>
              <Image
                src="/bg/Februarys-Favorite/februarys-favourite-logo-dark.png"
                alt="February's Favourite Logo"
                width={150}
                height={40}
                className={styles.navbarLogoImage}
                priority
              />
            </Link>
            <button
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
              className={`${styles.mobileMenuButton} hover:text-brand-red`}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <nav className={styles.mobileMenuNav}>
            <Link href="/releases" className={`${styles.mobileMenuNavLink} hover:text-brand-red`} onClick={closeMobileMenu}>
              Releases
            </Link>
            <Link href="/artists" className={`${styles.mobileMenuNavLink} hover:text-brand-red`} onClick={closeMobileMenu}>
              Artists
            </Link>
            <Link href="/tour" className={`${styles.mobileMenuNavLink} hover:text-brand-red`} onClick={closeMobileMenu}>
              Tour
            </Link>
            <Link href="/contact" className={`${styles.mobileMenuNavLink} hover:text-brand-red`} onClick={closeMobileMenu}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

// SVG Icon Components
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.menuIcon}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.menuIcon}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default Header;