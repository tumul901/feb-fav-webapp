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
  { label: 'Releases', href: '/releases' },
  { label: 'Artists', href: '/artists' },
  { label: 'Tour', href: '/tour' },
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
  role="dialog"
  aria-modal="true"
  className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  {/* Background Glow Effect */}
  <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-brand-red/5 to-transparent pointer-events-none" />

  {/* Main Navigation Links */}
  <nav className="flex flex-col items-center justify-center space-y-2 md:space-y-6">
    {navItems.map((item) => (
      <motion.div key={item.href} variants={itemVariants} className="relative group">
        <Link
          href={item.href}
          onClick={onClose}
          onMouseEnter={() => setHoveredLink(item.label)}
          onMouseLeave={() => setHoveredLink(null)}
          className={`
            block text-5xl md:text-8xl font-black uppercase tracking-tighter
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

  {/* Footer / Socials */}
  <motion.div 
    variants={itemVariants} 
    className="absolute bottom-10 md:bottom-16 flex items-center gap-8"
  >
     {[Instagram, Facebook, Youtube, Cloud].map((Icon, idx) => (
        <a key={idx} href="#" className="text-white/50 hover:text-white transition-colors duration-300">
            <Icon size={24} />
        </a>
     ))}
  </motion.div>

</motion.div>
  );
};