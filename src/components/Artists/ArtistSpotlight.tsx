'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';

export const ArtistSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Texture & Gradient */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-red/10 to-black" />
         <div className="absolute inset-0 opacity-10 bg-[url('/bg/Background.png')] bg-cover bg-center mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        
        {/* Left: Text Content - The "Badass" Vibe */}
        <div className="flex flex-1 flex-col justify-center px-6 md:px-20 pt-20 md:pt-0 order-2 md:order-1">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="mb-4 flex items-center gap-4"
           >
              <div className="h-[2px] w-20 bg-brand-red" />
              <span className="text-xl font-bold uppercase tracking-[0.2em] text-brand-red">The Artist</span>
           </motion.div>

           <div className="mb-6 flex flex-col leading-none">
              <TextReveal text="SIVA" className="text-[15vw] md:text-[8vw] font-black tracking-tighter text-white" />
             
           </div>

           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
             className="max-w-md text-lg md:text-xl text-neutral-300 font-light leading-relaxed border-l-4 border-brand-red pl-6"
           >
              The architectural voice of <span className="text-white font-bold">February&apos;s Favourite</span>. 
              Fusing soulful melodies with a gritty, unique lyrical flow that defines our sound.
           </motion.p>
        </div>

        {/* Right: The Visual - "Pic.png" or "BG 5" placeholder */}
        <div className="relative flex-1 h-[50vh] md:h-full order-1 md:order-2 overflow-hidden">
           <motion.div style={{ y, scale, opacity }} className="relative h-full w-full">
              <Image
                src="/bg/Februarys-Favorite/pic.png" // Using pic.png assumptively as the artist photo based on name
                alt="Siva Mishra"
                fill
                className="object-cover object-top md:object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                priority
              />
              {/* Overlay for cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 md:bg-gradient-to-l" />
           </motion.div>

            {/* Floating Decorative Elements */}
            <div className="absolute bottom-10 right-10 z-20 hidden md:block">
                {/* Blur layer - always visible, never animated */}
                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl">
                    {/* Content - this is what animates in */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                    >
                        <p className="text-4xl font-bold text-white">2024</p>
                        <p className="text-xs uppercase tracking-widest text-neutral-400">Debuting Now</p>
                    </motion.div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
