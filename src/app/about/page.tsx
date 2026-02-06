'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-24">
      
      <section className="pt-36 px-6 md:px-12 mb-32 container mx-auto">
        <div className="flex flex-col items-start gap-2">
            <span className="text-brand-red font-bold tracking-[0.2em] uppercase pl-1">The Story</span>
            <TextReveal text="ABOUT" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white" />
        </div>
      </section>

      {/* Origin */}
      <section className="container mx-auto px-6 md:px-12 mb-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
             <h2 className="text-brand-red font-bold uppercase tracking-widest mb-4">Origin</h2>
             <p className="text-3xl md:text-5xl font-black leading-tight text-white mb-6">
                Born from the need to <span className="text-neutral-500">amplify</span> the quietest voices with the loudest talents.
             </p>
             <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
                Founded in 2024, February&apos;s Favourite isn&apos;t just a label; it&apos;s a curated ecosystem for artists who refuse to blend in. We started in a basement with one mic and a vision: to make music that matters.
             </p>
        </div>
        <div className="flex-1 w-full relative h-[500px] grayscale hover:grayscale-0 transition-all duration-700">
             <Image src="/bg/Februarys-Favorite/pic.png" alt="Studio" fill className="object-cover rounded-2xl" />
        </div>
      </section>

       {/* Philosophy */}
       <section className="container mx-auto px-6 md:px-12 mb-32">
         <div className="border-t border-white/10 pt-12">
            <h2 className="text-brand-red font-bold uppercase tracking-widest mb-8">Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { title: 'Artist First', desc: 'We don\'t own you. We empower you. Creative control stays where it belongs.' },
                    { title: 'Quality Over Quantity', desc: 'We limit our roster to ensure every project gets the obsession it deserves.' },
                    { title: 'Sonic Identity', desc: 'We don\'t chase trends. We help you find the sound that defines you.' }
                ].map((item, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="p-8 bg-white/5 border border-white/5 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-neutral-400">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
       </section>

       {/* Vision */}
       <section className="container mx-auto px-6 md:px-12 mb-20 text-center">
            <TextReveal text="THE VISION" className="text-4xl md:text-6xl font-black text-white mb-8" />
            <p className="text-xl md:text-3xl font-light text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                To build a world where <span className="text-brand-red font-bold">authenticity</span> is the only currency that matters. 
                Where music isn&apos;t just consumed, but felt, lived, and remembered.
            </p>
       </section>

    </main>
  );
}
