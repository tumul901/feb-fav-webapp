// src/components/Hero/Hero.tsx
"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Play } from 'lucide-react';

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
          {/* Glass badge - container always visible, content animates */}
          <div className="mb-2 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red"></span>
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-white/80">est. 2024</span>
            </motion.div>
          </div>

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

             {/* Brand Descriptor - Cinematic Subtitle */}
             <motion.p
              initial={{ opacity: 0, letterSpacing: '0em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              className="mt-6 md:mt-8 text-[10px] md:text-sm font-bold text-neutral-400 uppercase mix-blend-plus-lighter"
            >
              Record Label <span className="mx-2 text-brand-red">•</span> Production House
            </motion.p>
          </div>
        </div>

        {/* Floating "Now Playing" Widget (Bottom Right) - Glass always visible */}
        <div className="absolute bottom-8 right-8 hidden md:block">
          <GlassCard className="flex w-64 items-center gap-4 !p-4 transition-transform hover:scale-105">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                 <Play size={20} className="fill-white text-white ml-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-brand-red">Latest Release</span>
                <span className="text-sm font-semibold text-white">Midnight Echoes</span>
              </div>
            </motion.div>
          </GlassCard>
        </div>

        {/* Brand Manifesto (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-12 left-8 hidden md:block max-w-sm text-left"
        >
            <div className="flex gap-4">
                <div className="w-[1px] h-auto bg-gradient-to-b from-brand-red to-transparent" />
                <p className="text-xs md:text-sm font-light text-neutral-400 leading-relaxed tracking-wide">
                    ...is where every musical possibility comes to life. 
                    <br />
                    <span className="text-white font-medium">If it belongs to the world of music, it happens here.</span>
                </p>
            </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Hero;