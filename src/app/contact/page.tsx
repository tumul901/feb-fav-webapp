'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { Mail, MapPin, Music, Briefcase, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-24">
      
      <section className="pt-36 px-6 md:px-12 mb-24 container mx-auto">
        <div className="flex flex-col items-start gap-2">
             <span className="text-brand-red font-bold tracking-[0.2em] uppercase pl-1">Get In Touch</span>
             <TextReveal text="CONTACT" className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white" />
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Interaction Paths */}
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold uppercase text-white mb-4">How can we help?</h2>
            
            {[
                { icon: Music, title: 'Artist Submission', desc: 'Send us your demos and press kit.', link: 'mailto:demos@febfav.com' },
                { icon: Briefcase, title: 'Business Inquiries', desc: 'Partnerships, licensing, and bookings.', link: 'mailto:biz@febfav.com' },
                { icon: MessageSquare, title: 'General Message', desc: 'Just saying hello or have a question.', link: 'mailto:hello@febfav.com' },
            ].map((item, idx) => (
                <motion.a 
                    key={idx}
                    href={item.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-red hover:border-brand-red transition-all group"
                >
                    <div className="h-12 w-12 rounded-full bg-black/20 flex items-center justify-center text-brand-red group-hover:bg-white group-hover:text-brand-red transition-colors">
                        <item.icon size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-white">{item.title}</h3>
                        <p className="text-neutral-400 group-hover:text-white/80">{item.desc}</p>
                    </div>
                </motion.a>
            ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center">
             <div className="mb-12">
                 <div className="flex items-center gap-4 mb-4 text-brand-red">
                    <Mail size={32} />
                    <span className="text-sm font-bold uppercase tracking-widest">Email Us</span>
                 </div>
                 <a href="mailto:info@februarysfavourite.com" className="text-3xl md:text-5xl font-black text-white hover:text-brand-red transition-colors">
                    info@febfav.com
                 </a>
             </div>

             <div>
                 <div className="flex items-center gap-4 mb-4 text-brand-red">
                    <MapPin size={32} />
                    <span className="text-sm font-bold uppercase tracking-widest">Visit Us</span>
                 </div>
                 <address className="text-xl text-neutral-300 not-italic leading-relaxed">
                    February&apos;s Favourite Studio<br />
                    123 Music Row, Suite 500<br />
                    Nashville, TN 37212
                 </address>
             </div>
        </div>

      </section>
    </main>
  );
}
