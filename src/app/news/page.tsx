'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const newsItems = [
    { category: 'Announcement', date: 'Feb 02, 2026', title: 'New Studio Opening in Nashvile', image: '/bg/Februarys-Favorite/BG 1.png' },
    { category: 'Signing', date: 'Jan 28, 2026', title: 'Welcoming "The Local Train" to the Roster', image: '/bg/Februarys-Favorite/pic.png' },
    { category: 'Culture', date: 'Jan 15, 2026', title: 'The Future of Indie Music in 2026', image: '/bg/Februarys-Favorite/BG 3.png' },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-24">
      
      <section className="pt-36 px-6 md:px-12 mb-20 container mx-auto">
        <div className="flex flex-col items-start gap-2">
            <span className="text-brand-red font-bold tracking-[0.2em] uppercase pl-1">Journal</span>
            <TextReveal text="NEWS" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white" />
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12">
            {newsItems.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex flex-col md:flex-row gap-8 items-center border-b border-white/10 pb-12 hover:border-brand-red/50 transition-colors cursor-pointer"
                >
                    <div className="relative h-64 w-full md:w-1/3 overflow-hidden rounded-xl">
                         <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-start">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-brand-red font-bold uppercase tracking-widest text-xs">{item.category}</span>
                            <span className="text-neutral-500 uppercase tracking-widest text-xs">{item.date}</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 group-hover:text-brand-red transition-colors leading-none">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                            Read Article <ArrowUpRight size={16} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>
    </main>
  );
}
