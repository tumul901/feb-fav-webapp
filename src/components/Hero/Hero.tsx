// src/components/Hero/Hero.tsx
"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Play, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax logic
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.8]);

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden text-white">
      {/* Background is now handled globally by DynamicBackground */}
      
      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 md:px-12">
        
        {/* Main Typography Group */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-2 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red"></span>
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-white/80">est. 2024</span>
          </motion.div>

          <div className="flex flex-col leading-none">
            {/* Massive Staggered Reveal Title */}
            <TextReveal 
              text="FEBRUARY'S" 
              className="text-[12vw] font-black tracking-tighter text-white/90 mix-blend-overlay"
            />
            
            <div className="relative" style={{ marginTop: '-2vw' }}>
               <TextReveal 
                text="FAVOURITE" 
                className="text-[12vw] font-black tracking-tighter text-brand-red drop-shadow-[0_0_25px_rgba(209,0,24,0.5)]"
                delay={0.5}
              />
              {/* Reflection/Glow Element */}
              <div className="absolute -inset-10 -z-10 bg-brand-red/20 blur-[100px] opacity-50" />
            </div>
          </div>
        </div>

        {/* Floating "Now Playing" Widget (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 right-8 hidden md:block"
        >
          <GlassCard className="flex w-64 items-center gap-4 !p-4 transition-transform hover:scale-105">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
               <Play size={20} className="fill-white text-white ml-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase text-brand-red">Latest Release</span>
              <span className="text-sm font-semibold text-white">Midnight Echoes</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={20} className="text-white/50" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;