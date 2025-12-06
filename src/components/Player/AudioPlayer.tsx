'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ReleaseItem } from '@/data/ReleasesData';

interface AudioPlayerProps {
    currentTrack: ReleaseItem | null;
    onNext: () => void;
    onPrev: () => void;
}

// Deterministic waveform pattern (no random)
const generateWaveform = (count: number): number[] => {
    const pattern = [0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.6, 0.45, 0.85, 0.55, 0.75, 0.4, 0.65, 0.5, 0.9, 0.35];
    return Array.from({ length: count }, (_, i) => pattern[i % pattern.length]);
};

export const AudioPlayer = ({ currentTrack, onNext, onPrev }: AudioPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fixed deterministic waveform
    const waveformBars = generateWaveform(60);

    // Initialize Audio
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
    }, [audioRef]); // Changed dependency from [] to [audioRef] to ensure it runs, though empty array is standard for mount.

    // Handle Track Change
    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.audioSrc;
            audioRef.current.load();
            setProgress(0);
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
            }
        }
    }, [currentTrack]); // Removed isPlaying from dependency to prevent re-triggering on pause/play

    // Handle Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Play failed", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // Time Update Listener
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            if (audio.duration) {
                const current = (audio.currentTime / audio.duration) * 100;
                setProgress(current);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            onNext(); // Auto-play next
            setIsPlaying(true); // Attempt to keep playing
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [onNext]);

    if (!currentTrack) return null;

    return (
        <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
            {/* Gradient fade upwards */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            {/* Inner Interactive Container */}
            <div className="relative pointer-events-auto bg-black border-t border-white/10 pb-6 md:pb-8 pt-4">
                
                {/* Progress Bar (Interactive) */}
                <div 
                    className="absolute top-[-2px] left-0 right-0 h-[3px] bg-neutral-900 cursor-pointer group hover:h-[6px] transition-all"
                    onClick={(e) => {
                        if (audioRef.current) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const width = rect.width;
                            const newTime = (x / width) * audioRef.current.duration;
                            audioRef.current.currentTime = newTime;
                        }
                    }}
                >
                    <div className="absolute inset-0 bg-neutral-800" />
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-brand-red group-hover:bg-red-500"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Scrub Handle */}
                    <motion.div 
                        className="absolute top-1/2 -mt-1.5 h-3 w-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `${progress}%`, marginLeft: '-6px' }}
                    />
                </div>

                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Track Info & Vinyl */}
                    <div className="flex items-center gap-6 w-full md:w-1/3">
                        {/* Spinning Vinyl Container */}
                        <div className="relative group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                            <div className={`relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-full overflow-hidden shadow-2xl border-[3px] border-neutral-900 bg-neutral-900 transition-transform duration-700 ${isPlaying ? 'scale-100' : 'scale-95'}`}>
                                <motion.div
                                    animate={{ rotate: isPlaying ? 360 : 0 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full relative"
                                >
                                    <Image 
                                        src={currentTrack.image} 
                                        alt={currentTrack.title}
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                    {/* Vinyl Grooves Texture Overlay */}
                                    <div className="absolute inset-0 rounded-full border-2 border-white/5 opacity-30" 
                                         style={{ background: 'repeating-radial-gradient(#111 0, #111 2px, transparent 3px, transparent 4px)' }} 
                                    />
                                    {/* Center Label */}
                                    <div className="absolute inset-0 m-auto h-1/3 w-1/3 bg-brand-red rounded-full flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 bg-black rounded-full" />
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Cinematic Glow */}
                            <div className={`absolute -inset-4 bg-brand-red/30 blur-2xl rounded-full -z-10 transition-opacity duration-1000 ${isPlaying ? 'opacity-100 animate-pulse-slow' : 'opacity-0'}`} />
                        </div>

                        <div className="min-w-0">
                            <motion.h4 
                                key={currentTrack.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-white font-bold text-lg truncate pr-4"
                            >
                                {currentTrack.title}
                            </motion.h4>
                            <motion.p 
                                key={currentTrack.artist}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-neutral-500 text-sm truncate"
                            >
                                {currentTrack.artist}
                            </motion.p>
                        </div>
                    </div>

                    {/* Controls & Waveform */}
                    <div className="flex flex-col items-center justify-center gap-4 w-full md:w-1/3">
                        {/* Main Controls */}
                        <div className="flex items-center gap-8">
                            <button 
                                onClick={onPrev}
                                className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <SkipBack size={24} fill="currentColor" />
                            </button>
                            
                            <motion.button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
                            >
                                {isPlaying ? (
                                    <Pause size={24} fill="currentColor" />
                                ) : (
                                    <Play size={24} fill="currentColor" className="ml-1" />
                                )}
                            </motion.button>
                            
                            <button 
                                onClick={onNext}
                                className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <SkipForward size={24} fill="currentColor" />
                            </button>
                        </div>
                    </div>

                    {/* Volume & Extras */}
                    <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
                        
                        {/* Waveform Visual (Decorative) */}
                         <div className="flex items-center gap-[2px] h-8 opacity-50">
                            {waveformBars.slice(0, 20).map((height, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        height: isPlaying ? [height * 20, height * 40, height * 20] : height * 20,
                                        opacity: isPlaying ? 1 : 0.3 
                                    }}
                                    transition={{ 
                                        duration: 0.5, 
                                        repeat: Infinity, 
                                        delay: i * 0.05,
                                        repeatType: "reverse" 
                                    }}
                                    className="w-1 bg-brand-red rounded-full"
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <button 
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-neutral-500 hover:text-white transition-colors"
                            >
                                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            
                            <div className="group relative w-24 h-6 flex items-center">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => {
                                        setVolume(Number(e.target.value));
                                        if (isMuted) setIsMuted(false);
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-white group-hover:bg-brand-red transition-colors" 
                                        style={{ width: `${isMuted ? 0 : volume}%` }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
