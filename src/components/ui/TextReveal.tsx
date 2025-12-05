'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string; // For font styling (size, weight, color)
  delay?: number; // Initial delay
}

export const TextReveal = ({ text, className = '', delay = 0 }: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger when 50% visible

  // Split text into characters
  const characters = text.split('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Rapid stagger for cinematic feel
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, // Slide up from bottom
      filter: 'blur(10px)' // Blur in effect
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`} // Ensure overflow hidden for clean reveal
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
          style={{ whiteSpace: 'pre' }} // Preserve spaces
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};
