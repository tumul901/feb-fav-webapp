'use client';

import Header from '@/components/Header/Header';
import { TrackGallery } from '@/components/Releases/TrackGallery';
import { AudioPlayer } from '@/components/Player/AudioPlayer';
import { TextReveal } from '@/components/ui/TextReveal';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { releases } from '@/data/ReleasesData';

export default function ReleasesPage() {
    const [currentTrack, setCurrentTrack] = useState(releases[0]);
    const handleNext = () => {
        const currentIndex = releases.findIndex(r => r.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % releases.length;
        setCurrentTrack(releases[nextIndex]);
    };

    const handlePrev = () => {
        const currentIndex = releases.findIndex(r => r.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + releases.length) % releases.length;
        setCurrentTrack(releases[prevIndex]);
    };

    return (
        <main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-brand-red selection:text-white">
            <Header />

            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                {/* Top Glow */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-red/5 blur-[200px] rounded-full" />
                {/* Bottom Glow */}
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[500px] bg-purple-900/10 blur-[200px] rounded-full" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-36 pb-20 px-8 md:px-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Eyebrow */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="h-px w-16 bg-brand-red" />
                        <span className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-500">Discography</span>
                    </motion.div>
                    
                    {/* Title */}
                    <div className="flex flex-col">
                        <TextReveal 
                            text="ORIGINAL" 
                            className="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-white/90"
                        />
                        <TextReveal 
                            text="SOUNDS" 
                            className="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-brand-red"
                            delay={0.3}
                        />
                    </div>

                    {/* Description */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-12 max-w-xl text-xl text-neutral-400 leading-relaxed"
                    >
                        Immerse yourself in our sonic universe. A curated collection of original productions, experimental soundscapes, and genre-defying compositions.
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 flex gap-12 border-t border-white/5 pt-8"
                    >
                        <div>
                            <span className="block text-4xl font-black text-white">{releases.length}</span>
                            <span className="text-sm text-neutral-500 uppercase tracking-widest">Tracks</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black text-white">24</span>
                            <span className="text-sm text-neutral-500 uppercase tracking-widest">Minutes</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black text-brand-red">2024</span>
                            <span className="text-sm text-neutral-500 uppercase tracking-widest">Latest</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Gallery Section */}
            <section className="py-20 md:py-28">
                <TrackGallery 
                    tracks={releases} 
                    activeTrackId={currentTrack?.id || null}
                    onTrackSelect={setCurrentTrack} 
                />
            </section>

            {/* Spacer for Player */}
            <div className="h-48" />

            {/* Fixed Player */}
            <AudioPlayer 
                currentTrack={currentTrack} 
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </main>
    );
}
