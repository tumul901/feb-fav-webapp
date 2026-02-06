// src/components/ui/FullScreenNavbar.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube, Cloud } from 'lucide-react';

interface FullScreenNavbarProps {
  pathname: string;
  onClose: () => void;
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Releases', href: '/releases' },
  { label: 'Artists', href: '/artists' },
  { label: 'Services', href: '/services' },
  { label: 'Tour', href: '/tour' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FullScreenNavbar: React.FC<FullScreenNavbarProps> = ({ pathname, onClose }) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 } 
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <>
      {/* Blur layer - always visible, never animates */}
      <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl" />
      
      {/* Content layer - this animates */}
      <motion.div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-brand-red/5 to-transparent pointer-events-none" />

  {/* Main Navigation Links */}
  <nav className="flex flex-col items-center justify-center space-y-1 md:space-y-2">
    {navItems.map((item) => (
      <motion.div key={item.href} variants={itemVariants} className="relative group">
        <Link
          href={item.href}
          onClick={onClose}
          onMouseEnter={() => setHoveredLink(item.label)}
          onMouseLeave={() => setHoveredLink(null)}
          className={`
            block text-2xl md:text-5xl font-black uppercase tracking-tighter
            transition-all duration-500 ease-in-out
            ${
              hoveredLink && hoveredLink !== item.label
                ? 'opacity-20 blur-[2px]' // Dim others
                : 'opacity-100'
            }
            ${pathname === item.href ? 'text-brand-red' : 'text-white'}
            hover:text-brand-red
          `}
        >
          {item.label}
        </Link>
      </motion.div>
    ))}
  </nav>

  {/* Footer / Socials / Details */}
  <motion.div 
    variants={itemVariants} 
    className="absolute bottom-6 md:bottom-10 w-full container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-sm md:text-base font-medium"
  >
     {/* Contact Details & Inquiries (Left) */}
     <div className="hidden md:flex gap-12 tracking-wide text-left">
        <div>
           <p className="uppercase text-neutral-600 mb-1">Studio Address</p>
           <p>123 Music Row, Suite 500</p>
           <p>Nashville, TN 37212</p>
        </div>
        
        <div>
           <p className="uppercase text-neutral-600 mb-1">Inquiries</p>
           <a href="mailto:info@febfav.com" className="block hover:text-brand-red transition-colors">info@febfav.com</a>
           <a href="tel:+123456789" className="block hover:text-brand-red transition-colors">+1 (234) 567-890</a>
        </div>
     </div>

     {/* Socials (Right) */}
     <div className="flex items-center gap-8 mt-6 md:mt-0">
        {[Instagram, Facebook, Youtube, Cloud].map((Icon, idx) => (
            <a key={idx} href="#" className="text-white/50 hover:text-white transition-colors duration-300">
                <Icon size={24} />
            </a>
        ))}
     </div>
  </motion.div>

      </motion.div>
    </>
  );
};