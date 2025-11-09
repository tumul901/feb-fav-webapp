// src/components/Header/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import styles from './Header.module.css';
import { FullScreenNavbar } from '@/components/ui/FullScreenNavbar';

const SCROLL_THRESHOLD = 50;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const pathname = usePathname();

  // Effect for scroll opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to lock body scroll
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavOpen]);

  const toggleMobileMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMobileMenu = () => {
    setIsNavOpen(false);
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

          {/* Animated Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
            aria-expanded={isNavOpen}
            className={`${styles.mobileMenuButton} ${styles.menuIcon} hover:text-brand-red relative focus-visible:bg-brand-red outline-none rounded-sm`}
          >
            <span className="sr-only">Open navigation menu</span>
            
            {/* Container for the 3 lines */}
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                className={`absolute block h-0.5 w-full transform bg-white transition-all duration-700 ease-in-out ${
                  isNavOpen ? 'top-0 rotate-45' : '-top-2'
                }`}
              ></span>
              <span
                className={`absolute top-0 block h-0.5 w-full transform bg-white transition-all duration-700 ease-in-out ${
                  isNavOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-full transform bg-white transition-all duration-700 ease-in-out ${
                  isNavOpen ? 'top-0 -rotate-45' : 'top-2'
                }`}
              ></span>
            </div>
          </button>
          
        </div>
      </header>

      {/* --- MODIFICATION START --- */}
      {/* Wrap the FullScreenNavbar with AnimatePresence */}
      <AnimatePresence>
        {isNavOpen && (
          <FullScreenNavbar pathname={pathname} onClose={closeMobileMenu} />
        )}
      </AnimatePresence>
      {/* --- MODIFICATION END --- */}

    </>
  );
};

export default Header;