'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import Image from 'next/image';

const artists = [
    { name: 'Siva Mishra', role: 'Singer & Composer', image: '/bg/Februarys-Favorite/pic.png' },
    { name: 'Aditya Rikhari', role: 'Producer', image: '/bg/Februarys-Favorite/BG 1.png' },
    { name: 'The Local Train', role: 'Band', image: '/bg/Februarys-Favorite/BG 2.png' },
];

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-24">
      
      {/* Hero Section */}
      <section className="pt-36 px-6 md:px-12 mb-20 container mx-auto">
        <div className="flex flex-col items-start gap-2">
            <span className="text-brand-red font-bold tracking-[0.2em] uppercase pl-1">The Roster</span>
            <TextReveal text="ARTISTS" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white" />
        </div>
      </section>

      {/* Artist Grid */}
      <section className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900"
            >
                <Image 
                    src={artist.image} 
                    alt={artist.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-3xl font-black uppercase text-white mb-1">{artist.name}</h3>
                    <p className="text-brand-red font-bold tracking-widest uppercase text-xs mb-4">{artist.role}</p>
                    
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-2 border border-white/30 rounded-full hover:bg-brand-red hover:border-brand-red text-xs font-bold uppercase tracking-widest">
                        View Profile
                    </button>
                </div>
            </motion.div>
        ))}
        
        {/* 'Join Us' Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-white/20 hover:border-brand-red/50 transition-colors p-8 text-center"
        >
            <h3 className="text-2xl font-bold text-white mb-2">Join the Roster</h3>
            <p className="text-neutral-400 text-sm mb-6 max-w-xs">Are you an artist looking for a label that prioritizes creative freedom?</p>
            <a href="/contact" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-colors rounded-full text-xs">
                Apply Now
            </a>
        </motion.div>
      </section>

      {/* Booking CTA Section */}
      <section className="mt-32 container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-8">Want to book an artist?</h2>
            <a href="/contact" className="inline-block px-10 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-full">
                Contact Booking Agent
            </a>
      </section>
    </main>
  );
}
