'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';

interface TourDate {
  id: string;
  date: string;
  month: string;
  city: string;
  venue: string;
  status: 'available' | 'sold-out' | 'limited';
  ticketLink?: string;
}

const tourDates: TourDate[] = [
  { id: '1', date: '12', month: 'DEC', city: 'Mumbai', venue: 'The Royal Opera House', status: 'sold-out' },
  { id: '2', date: '18', month: 'DEC', city: 'Delhi', venue: 'Jawaharlal Nehru Stadium', status: 'available' },
  { id: '3', date: '24', month: 'DEC', city: 'Bangalore', venue: 'Bangalore Palace', status: 'limited' },
  { id: '4', date: '05', month: 'JAN', city: 'Pune', venue: 'Mahalaxmi Lawns', status: 'available' },
  { id: '5', date: '14', month: 'JAN', city: 'Hyderabad', venue: 'Gachibowli Stadium', status: 'available' },
];

export const Tour = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="relative min-h-screen w-full bg-black py-24 px-4 md:px-12 flex flex-col justify-center">
             {/* Header */}
             <div className="mb-16 md:mb-24 flex items-end gap-6">
                <TextReveal text="TOUR" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white mix-blend-difference" />
                <span className="hidden md:block text-xl font-bold text-brand-red mb-4 tracking-[0.2em] uppercase">2024 / 2025</span>
             </div>

             {/* Tour List */}
             <div className="max-w-6xl w-full mx-auto">
                <div className="flex flex-col">
                    {/* List Header (Desktop) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-bold tracking-widest uppercase text-neutral-500">
                        <div className="col-span-2">Date</div>
                        <div className="col-span-4">City</div>
                        <div className="col-span-4">Venue</div>
                        <div className="col-span-2 text-right">Status</div>
                    </div>

                    {tourDates.slice(0, 3).map((item) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group relative md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-2 py-8 border-b border-white/10 items-center transition-colors duration-300 hover:border-brand-red/50 cursor-pointer"
                        >
                            {/* Hover Glow Background */}
                            <div className={`absolute inset-0 bg-brand-red/5 -z-10 blur-xl transition-opacity duration-500 ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}`} />

                            {/* Date */}
                            <div className="col-span-2 flex flex-row md:flex-col items-baseline md:items-start gap-2 md:gap-0 w-full md:w-auto">
                                <span className="text-4xl md:text-5xl font-black text-white group-hover:text-brand-red transition-colors duration-300">{item.date}</span>
                                <span className="text-lg md:text-xl font-bold text-neutral-500 group-hover:text-white transition-colors duration-300">{item.month}</span>
                            </div>

                            {/* City */}
                            <div className="col-span-4 text-3xl md:text-4xl font-black uppercase text-white tracking-tight w-full md:w-auto">
                                {item.city}
                            </div>

                            {/* Venue */}
                            <div className="col-span-4 text-lg md:text-xl text-neutral-400 font-medium w-full md:w-auto">
                                {item.venue}
                            </div>

                            {/* Status / Button */}
                            <div className="col-span-2 flex justify-start md:justify-end items-center w-full md:w-auto mt-4 md:mt-0">
                                {item.status === 'sold-out' ? (
                                    <span className="inline-block px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900/50 text-xs font-bold uppercase text-neutral-500">
                                        Sold Out
                                    </span>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            flex items-center gap-2 px-6 py-2 rounded-full border 
                                            text-sm font-bold uppercase tracking-wider
                                            transition-all duration-300
                                            ${hoveredId === item.id 
                                                ? 'bg-brand-red border-brand-red text-white' 
                                                : 'border-white/20 text-white bg-transparent'
                                            }
                                        `}
                                    >
                                        Tickets
                                        <ArrowUpRight size={16} />
                                    </motion.button>
                                )}
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* View Full Tour Button */}
                <div className="mt-12 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                        onClick={() => alert("Tour Page coming soon!")} 
                    >
                        View Full Tour
                    </motion.button>
                </div>
             </div>
        </section>
    );
};
