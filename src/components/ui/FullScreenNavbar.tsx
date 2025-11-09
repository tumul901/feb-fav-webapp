// src/components/ui/FullScreenNavbar.tsx
'use client';

import React, { useEffect, useRef } from 'react'; // Removed useState
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Cloud } from 'lucide-react';
import { motion, Variants } from 'framer-motion'; // Import motion and Variants

// --- Animation Variants ---
const transition = { duration: 0.7, ease: "easeInOut" };

// Variant for the main overlay (fade in/out)
const overlayFade: Variants = {
  hidden: { opacity: 0, transition: transition },
  visible: { opacity: 1, transition: transition }
};

// Variant for the nav list container (for staggering children)
const navContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 100ms stagger
    }
  }
};

// Variant for each nav list item (fade + slide up)
const navItem: Variants = {
  hidden: { opacity: 0, y: 100, transition: transition },
  visible: { opacity: 1, y: 0, transition: transition }
};

// Variant for side content (simple fade, with delay)
const contentFade: Variants = {
  hidden: { opacity: 0, transition: transition },
  visible: { 
    opacity: 1, 
    transition: { ...transition, delay: 0.3 } // 300ms delay
  }
};

// Variant for social icons (fade, with longer delay)
const socialFade: Variants = {
  hidden: { opacity: 0, transition: transition },
  visible: { 
    opacity: 1, 
    transition: { ...transition, delay: 0.4 } // 400ms delay
  }
};

// Variant for the close button (matches first nav item's entry)
const closeButtonFade: Variants = {
  hidden: { opacity: 0, scale: 0.95, rotate: 45, transition: transition },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { ...transition, delay: 0.1 } // 100ms delay
  }
};

// --- Nav Items Definition ---
const navItems = [
  { label: 'Releases', href: '/releases' },
  { label: 'Artists', href: '/artists' },
  { label: 'Tour', href: '/tour' },
  { label: 'Contact', href: '/contact' },
];

// --- Props Interface ---
interface FullScreenNavbarProps {
  pathname: string;
  onClose: () => void;
}

export const FullScreenNavbar: React.FC<FullScreenNavbarProps> = ({
  pathname,
  onClose,
}) => {
  // REMOVED: isMounted state
  const navRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // REMOVED: useEffect for isMounted
  
  // --- Accessibility Effect (Unchanged) ---
  useEffect(() => {
    // 1. Set initial focus to the close button
    closeButtonRef.current?.focus();

    // 2. Escape key listener
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }

      // 3. Focus Trap logic
      if (event.key === 'Tab') {
        const focusableElements = navRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Removed isMounted dependency

  const handleClose = () => {
    // REMOVED: setIsMounted(false) and setTimeout
    onClose();
  };

  // Common focus ring style (FOR LINKS)
  const focusRing =
    'outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2';
  const focusRingBlack = `${focusRing} focus-visible:ring-offset-black`;
  const focusRingGrey = `${focusRing} focus-visible:ring-offset-zinc-900`;

  // Solid BG focus style (FOR BUTTONS)
  const buttonFocusStyle = 'outline-none rounded-sm focus-visible:bg-brand-red';

  return (
    // Root container: Converted to motion.div, added variants
    <motion.div
      ref={navRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid grid-cols-1 md:grid-cols-10"
      variants={overlayFade}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* --- 1. Left Panel (Desktop-Only, Grey) --- */}
      <div className="hidden md:flex flex-col col-span-7 bg-zinc-900 p-10">
        {/* Logo */}
        <div className="h-16">
          <Link href="/" onClick={handleClose} className={focusRingGrey}>
            <Image
              src="/bg/Februarys-Favorite/februarys-favourite-logo-dark.png"
              alt="February's Favourite Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links: Added aria-label */}
        <nav
          aria-label="Main navigation"
          className="flex-1 flex flex-col justify-center"
        >
          {/* Converted to motion.ul for stagger */}
          <motion.ul 
            className="flex flex-col space-y-2"
            variants={navContainer}
          >
            {navItems.map((item) => (
              // Converted to motion.li for item animation
              <motion.li key={item.href} variants={navItem}>
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className={`
                    text-6xl font-extrabold uppercase
                    transition-colors duration-300
                    ${
                      pathname === item.href
                        ? 'text-brand-red' // Active link color
                        : 'text-white hover:text-brand-red'
                    }
                    outline-none rounded-sm focus-visible:bg-brand-red focus-visible:text-white
                  `}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>

      {/* --- 2. Right Panel (Full-screen on Mobile, Black) --- */}
      <div className="col-span-10 md:col-span-3 bg-black p-10 flex flex-col relative">
        {/* Vertical Text (Desktop-Only): Converted to motion.div */}
        <motion.div
          className="hidden md:block absolute left-0 top-1/2 text-zinc-800 text-sm font-bold uppercase"
          style={{
            writingMode: 'vertical-rl',
            transform: 'translateY(-50%) rotate(180deg)',
          }}
          variants={contentFade} // Use contentFade variant
        >
          February's Favourite
        </motion.div>

        {/* Overlay Header (Logo on Mobile, Close Button always) */}
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={handleClose}
            className={`md:hidden ${focusRingBlack}`}
          >
            <Image
              src="/bg/Februarys-Favorite/februarys-favourite-logo-dark.png"
              alt="February's Favourite Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Converted to motion.button */}
          <motion.button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close mobile menu"
            className={`
              text-white hover:text-brand-red 
              transition-colors duration-300
              ${buttonFocusStyle}
            `}
            variants={closeButtonFade} // Use closeButtonFade variant
          >
            <CloseIcon />
          </motion.button>
        </div>

        {/* Mobile Navigation (Mobile-Only) */}
        <nav
          aria-label="Main navigation"
          className="md:hidden flex-1 flex flex-col justify-center items-center"
        >
          {/* Converted to motion.ul for stagger */}
          <motion.ul 
            className="flex flex-col items-center space-y-4"
            variants={navContainer}
          >
            {navItems.map((item) => (
              // Converted to motion.li for item animation
              <motion.li key={item.href} variants={navItem}>
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className={`
                    text-3xl sm:text-4xl font-extrabold uppercase
                    transition-colors duration-300
                    ${
                      pathname === item.href
                        ? 'text-brand-red' // Active link color
                        : 'text-white hover:text-brand-red'
                    }
                    outline-none rounded-sm focus-visible:bg-brand-red focus-visible:text-white
                  `}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Contact/Dummy Content Block: Converted to motion.div */}
        <motion.div
          className="flex-1 flex-col justify-center hidden md:flex"
          variants={contentFade} // Use contentFade variant
        >
          {/* --- DUMMY CONTENT START --- */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-brand-red font-bold text-lg uppercase">
                Book a session
              </h3>
              <a
                href="tel:+123456789"
                className={`text-white hover:text-brand-red ${focusRingBlack}`}
              >
                Call +1 (234) 567-890
              </a>
            </div>
            <div>
              <h3 className="text-brand-red font-bold text-lg uppercase">
                General Inquiries
              </h3>
              <a
                href="mailto:info@febfav.com"
                className={`text-white hover:text-brand-red ${focusRingBlack}`}
              >
                info@febfav.com
              </a>
            </div>
            <div>
              <h3 className="text-brand-red font-bold text-lg uppercase">
                Studio Address
              </h3>
              <p className="text-zinc-400">
                123 Music Row, Suite 500
                <br />
                Nashville, TN 37212
              </p>
            </div>
          </div>
          {/* --- DUMMY CONTENT END --- */}
        </motion.div>

        {/* Social Icons: Converted to motion.div */}
        <motion.div
          className="flex justify-center md:justify-start space-x-4 mt-8"
          variants={socialFade} // Use socialFade variant
        >
          {/* --- DUMMY SOCIAL LINKS --- */}
          <a
            href="#"
            aria-label="Instagram"
            className={`text-white hover:text-brand-red ${focusRingBlack}`}
          >
            <Instagram />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className={`text-white hover:text-brand-red ${focusRingBlack}`}
          >
            <Facebook />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className={`text-white hover:text-brand-red ${focusRingBlack}`}
          >
            <Youtube />
          </a>
          <a
            href="#"
            aria-label="SoundCloud"
            className={`text-white hover:text-brand-red ${focusRingBlack}`}
          >
            <Cloud />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Close Icon ---
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);