// src/components/Releases/Releases.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { releases, ReleaseItem } from '@/data/ReleasesData';
import { ReleaseCard } from './ReleaseCard';
import { TextReveal } from '@/components/ui/TextReveal';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

const Releases: React.FC = () => {
  // Use all releases for the infinite scroll feel
  const allReleases = releases;
  const [selectedRelease, setSelectedRelease] = useState<ReleaseItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll button logic
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = 400; // Approx card width + gap
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  // --- Accessibility & Scroll Lock Effect ---
  useEffect(() => {
    if (selectedRelease) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedRelease]);


  return (
    <>
      <section className="relative py-24 overflow-hidden z-20">
        
        {/* --- Header Section --- */}
        <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between">
            <div className="flex flex-col">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="h-[1px] w-12 bg-white/50" />
                    <span className="text-sm uppercase tracking-widest text-white/50">Discovery</span>
                 </div>
                 <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
                   ORIGINAL <span className="text-brand-red">RELEASES</span>
                 </h2>
            </div>
            
            {/* Scroll Controls */}
             <div className="flex gap-4 mt-8 md:mt-0">
                <button onClick={() => scroll('left')} className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors group">
                    <ArrowLeft className="text-white group-hover:text-brand-red transition-colors" />
                </button>
                <button onClick={() => scroll('right')} className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors group">
                    <ArrowRight className="text-white group-hover:text-brand-red transition-colors" />
                </button>
             </div>
        </div>

        {/* --- Horizontal Scroll Container --- */}
        <div 
            ref={scrollContainerRef}
            className="flex gap-12 overflow-x-auto px-6 pb-20 pt-10 scrollbar-hide snap-x snap-mandatory"
            style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none' 
            }}
        >
            {allReleases.map((release, index) => (
                <div key={release.id} className="snap-center">
                    <ReleaseCard 
                        release={release} 
                        onClick={() => setSelectedRelease(release)} 
                    />
                </div>
            ))}
            
            {/* End Spacer */}
            <div className="w-[10vw] flex-shrink-0" />
        </div>

      </section>

      {/* --- Modal (Simplified for New Style) --- */}
      <AnimatePresence>
        {selectedRelease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRelease(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-neutral-900 md:flex-row shadow-2xl border border-white/10"
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedRelease(null)}
                    className="absolute right-6 top-6 z-10 p-2 rounded-full bg-black/50 hover:bg-brand-red text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left: Image */}
                <div className="relative h-64 md:h-auto md:w-1/2">
                    <Image
                        src={selectedRelease.image}
                        alt={selectedRelease.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
                
                {/* Right: Details */}
                <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
                     <span className="text-brand-red font-bold tracking-widest uppercase mb-2">Now Playing</span>
                     <h2 className="text-5xl font-black text-white mb-6 uppercase leading-none">{selectedRelease.title}</h2>
                     <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-sm">
                        {selectedRelease.description || "Experience the sonic journey defined by deep rhythms and soulful melodies."}
                     </p>
                     
                     <div className="flex gap-8 border-t border-white/10 pt-8">
                        <div>
                            <span className="block text-xs uppercase text-zinc-500 mb-1">Genre</span>
                            <span className="text-xl font-bold text-white">{selectedRelease.genre}</span>
                        </div>
                        <div>
                            <span className="block text-xs uppercase text-zinc-500 mb-1">Year</span>
                            <span className="text-xl font-bold text-white">{selectedRelease.year}</span>
                        </div>
                     </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Releases;