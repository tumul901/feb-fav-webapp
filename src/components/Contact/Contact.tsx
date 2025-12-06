'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Cloud, ArrowUpRight } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import Link from 'next/link';

export const Contact = () => {
    return (
        <section className="relative w-full bg-black pt-24 pb-12 px-4 md:px-12 flex flex-col justify-between min-h-[80vh]">
             
             {/* Main Content */}
             <div className="flex-1 flex flex-col justify-center items-start">
                 <div className="mb-8">
                    <TextReveal text="SAY HELLO" className="text-[12vw] leading-[0.8] font-black tracking-tighter text-white/20" />
                 </div>

                 {/* Massive Email Link */}
                 <motion.a 
                    href="mailto:info@februarysfavourite.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="group relative inline-block"
                 >
                    <span className="text-[5vw] md:text-[4vw] font-bold text-white group-hover:text-brand-red transition-colors duration-500">
                        info@febfav.com
                    </span>
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-red transition-all duration-500 group-hover:w-full" />
                 </motion.a>

                 <motion.p 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="mt-8 text-xl text-neutral-400 max-w-xl"
                 >
                    For bookings, collaborations, or just to share your story. 
                    We are always listening.
                 </motion.p>
             </div>

             {/* Footer Info */}
             <div className="w-full border-t border-white/10 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Copyright */}
                <div className="text-neutral-500 text-sm">
                    © {new Date().getFullYear()} February&apos;s Favourite. All rights reserved.
                </div>

                {/* Socials */}
                <div className="flex items-center gap-6">
                    {[Instagram, Facebook, Youtube, Cloud].map((Icon, idx) => (
                        <a key={idx} href="#" className="text-white/50 hover:text-brand-red transition-colors duration-300 transform hover:scale-110">
                            <Icon size={20} />
                        </a>
                    ))}
                </div>

                {/* Credits / Extra */}
                <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span>Privacy Policy</span>
                    <span>Terms of Use</span>
                </div>

             </div>
        </section>
    );
};
