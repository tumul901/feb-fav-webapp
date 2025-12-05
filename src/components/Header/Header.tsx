// src/components/Header/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { FullScreenNavbar } from '@/components/ui/FullScreenNavbar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  // Effect for scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when nav is open
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isNavOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-black/50 backdrop-blur-xl border-b border-white/5' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
             <Image
               src="/bg/Februarys-Favorite/februarys-favourite-logo-dark.png"
               alt="February's Favourite"
               width={140}
               height={40}
               className="object-contain transition-opacity duration-300 group-hover:opacity-80"
               priority
             />
          </Link>

          {/* Magnetic Menu Button */}
          <motion.button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="group relative z-50 flex items-center gap-3 px-2 py-1 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden md:block text-sm font-bold uppercase tracking-widest text-white mix-blend-difference">
               {isNavOpen ? 'Close' : 'Menu'}
            </span>
            
            <div className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-brand-red">
               <motion.span 
                 animate={{ rotate: isNavOpen ? 45 : 0, y: isNavOpen ? 6 : 0 }}
                 className="h-[2px] w-5 bg-white transition-transform"
               />
               <motion.span 
                 animate={{ opacity: isNavOpen ? 0 : 1 }}
                 className="h-[2px] w-5 bg-white transition-opacity"
               />
               <motion.span 
                 animate={{ rotate: isNavOpen ? -45 : 0, y: isNavOpen ? -6 : 0 }}
                 className="h-[2px] w-5 bg-white transition-transform"
               />
            </div>
          </motion.button>

        </div>
      </motion.header>

      {/* Full Screen Overlay Navigation */}
      <AnimatePresence>
        {isNavOpen && (
          <FullScreenNavbar pathname={pathname} onClose={() => setIsNavOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;