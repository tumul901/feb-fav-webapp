'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { ArrowUpRight } from 'lucide-react';

const upcomingShows = [
    { date: '15', month: 'FEB', city: 'Gurgaon', venue: 'Heal with Mahima', link: '#' },
    { date: '20', month: 'FEB', city: 'Gurgaon', venue: 'Dhaivat Aarambh', link: '#' },
    { date: '15', month: 'MAR', city: 'New Delhi', venue: 'The Trialogue Company', link: '#' },
];

const pastShows = [
    { year: '2023', city: 'Mumbai', venue: 'The Habitat', date: 'Dec 10' },
    { year: '2023', city: 'Bangalore', venue: 'Fandom', date: 'Nov 14' },
    { year: '2023', city: 'Pune', venue: 'High Spirits', date: 'Oct 02' },
];

export default function TourPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-24">
      
      {/* Hero */}
      <section className="pt-36 px-6 md:px-12 mb-24 container mx-auto">
        <div className="flex flex-col items-start gap-2">
            <span className="text-brand-red font-bold tracking-[0.2em] uppercase pl-1">Live</span>
            <TextReveal text="TOUR" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white" />
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase text-white">Upcoming Shows</h2>
            <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="flex flex-col">
            {upcomingShows.map((show, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8 border-b border-white/10 hover:border-brand-red/50 transition-colors"
                >
                    <div className="md:col-span-2 flex items-baseline gap-2 text-brand-red group-hover:text-white transition-colors">
                        <span className="text-5xl font-black">{show.date}</span>
                        <span className="text-xl font-bold uppercase">{show.month}</span>
                    </div>
                    <div className="md:col-span-5 text-4xl font-black uppercase text-white">{show.city}</div>
                    <div className="md:col-span-3 text-xl text-neutral-400">{show.venue}</div>
                    <div className="md:col-span-2 flex justify-end">
                        <a href={show.link} className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all text-sm font-bold uppercase tracking-widest">
                            Tickets <ArrowUpRight size={16} />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Past Shows Archive */}
      <section className="container mx-auto px-6 md:px-12 mb-32 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl font-bold uppercase text-neutral-500">Archive</h2>
            <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {pastShows.map((show, idx) => (
                <div key={idx} className="p-6 border border-white/5 bg-white/5 rounded-xl">
                    <p className="text-brand-red font-bold text-xs uppercase tracking-widest mb-2">{show.year}</p>
                    <h3 className="text-xl font-bold text-white mb-1">{show.venue}</h3>
                    <p className="text-neutral-400 font-mono text-sm">{show.city} • {show.date}</p>
                </div>
             ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="container mx-auto px-6 md:px-12 text-center py-20 bg-neutral-900/50 rounded-3xl mx-6">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-6">Want us to perform at your city?</h2>
            <a href="/contact" className="inline-block px-10 py-4 bg-brand-red text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-full shadow-[0_10px_30px_rgba(209,0,24,0.3)]">
                Request Booking
            </a>
      </section>

    </main>
  );
}
