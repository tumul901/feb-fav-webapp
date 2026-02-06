'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { GlassCard } from '@/components/ui/GlassCard';

const services = [
    {
        title: 'Music Production',
        description: 'State-of-the-art recording, mixing, and mastering to bring your sonic vision to life.',
        audience: 'Solo Artists, Bands, Comets',
    },
    {
        title: 'Label & Distribution',
        description: 'Strategic release planning, global distribution, and royalty management.',
        audience: 'Independent Artists, Labels',
    },
    {
        title: 'Artist Development',
        description: 'Comprehensive 360-degree mentorship covering branding, styling, and career longevity.',
        audience: 'Emerging Talent',
    },
    {
        title: 'Live & Events',
        description: 'Curating and executing unforgettable live experiences, tours, and showcases.',
        audience: 'Venues, Festivals, Corporates',
    },
    {
        title: 'Education & Workshops',
        description: 'Masterclasses on production, songwriting, and the music business.',
        audience: 'Students, Aspiring Professionals',
    },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-24">
      
      {/* Hero */}
      <section className="pt-36 px-6 md:px-12 mb-20 container mx-auto">
        <div className="flex flex-col items-start gap-2">
            <span className="text-brand-red font-bold tracking-[0.2em] uppercase pl-1">What We Do</span>
            <TextReveal text="SERVICES" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white" />
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 md:px-12 flex flex-col gap-8">
        {services.map((item, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <GlassCard className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group hover:bg-white/5 transition-colors duration-500 border-white/10 hover:border-brand-red/30">
                    <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-4 group-hover:text-brand-red transition-colors">{item.title}</h3>
                        <p className="text-lg text-neutral-300 mb-6 max-w-2xl font-light">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 uppercase tracking-widest bg-black/20 px-4 py-2 rounded-full inline-flex">
                            <span className="text-brand-red font-bold">For:</span> {item.audience}
                        </div>
                    </div>
                    
                    <a href="/contact" className="shrink-0 px-8 py-3 rounded-full border border-white/20 hover:bg-brand-red hover:border-brand-red hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-widest">
                        Enquire
                    </a>
                </GlassCard>
            </motion.div>
        ))}
      </section>
    </main>
  );
}
