'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mic2, Disc, User, Radio, GraduationCap } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import Link from 'next/link';

const services = [
    { title: 'Music Production', icon: Mic2 },
    { title: 'Label & Distribution', icon: Disc },
    { title: 'Artist Development', icon: User },
    { title: 'Live & Events', icon: Radio },
    { title: 'Education', icon: GraduationCap },
];

export const ServicesHighlight = () => {
    return (
        <section className="relative py-24 px-4 md:px-12 bg-neutral-950/50">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                    <div>
                        <span className="text-brand-red font-bold tracking-widest uppercase mb-2 block">What We Do</span>
                         <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                            ELEVATING <br /> <span className="text-neutral-500">THE CRAFT.</span>
                         </h2>
                    </div>
                     <Link 
                        href="/services"
                        className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group mt-8 md:mt-0"
                    >
                        View All Services
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <div className="mb-4 text-brand-red group-hover:text-white transition-colors">
                                <service.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                                {service.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>

                 <Link 
                        href="/services"
                        className="flex md:hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group mt-12 justify-center"
                    >
                        View All Services
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
             </div>
        </section>
    );
};
