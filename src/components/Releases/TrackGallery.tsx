'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ReleaseItem } from '@/data/ReleasesData';

interface TrackGalleryProps {
    tracks: ReleaseItem[];
    activeTrackId: string | null;
    onTrackSelect: (track: ReleaseItem) => void;
}

export const TrackGallery = ({ tracks, activeTrackId, onTrackSelect }: TrackGalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    
    // Smooth Scroll Physics
    const x = useMotionValue(0);
    const smoothX = useSpring(x, { damping: 50, stiffness: 400, mass: 1 });

    // Hover state for scroll locking
    const isHoveredRef = useRef(false);
    const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Responsive Constants
    const getParams = () => {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
        const cardWidth = isDesktop ? 260 : 200;
        const gap = isDesktop ? 80 : 64; // gap-20 (80px) or gap-16 (64px)
        const stride = cardWidth + gap;
        return { cardWidth, gap, stride };
    };

    // Calculate Scroll Constraints
    useEffect(() => {
        const updateConstraints = () => {
            const { stride } = getParams();
            // Total items * stride - last gap?
            // Simplified: Index 0 is at 0. Last index is at -(length-1)*stride
            // +1 for Load More button
            const totalItems = tracks.length + 1; 
            const maxScroll = -((totalItems - 1) * stride);
            setConstraints({ left: maxScroll, right: 0 });
        };

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () => window.removeEventListener('resize', updateConstraints);
    }, [tracks]);

    const handleSnap = () => {
        const { stride } = getParams();
        const currentX = x.get();
        // Snap to nearest index
        const index = Math.round(currentX / stride);
        const snappedX = index * stride;
        
        // Clamp
        const clampedX = Math.max(constraints.left, Math.min(0, snappedX));
        x.set(clampedX);
    };

    // Handle Wheel Scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (!isHoveredRef.current) return;

            e.preventDefault();
            e.stopPropagation();
            
            // Clear pending snap
            if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

            const currentX = x.get();
            const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
            let newX = currentX - delta; 
            
            // Elastic bounds during scroll (allow slight overscroll before snap?)
            // For now, hard clamp during drag helps prevent getting lost
            // But for "Lenis" feel, overscroll is nice. 
            // Let's simple clamp for robustness.
            // Actually, we need to allow free scroll, then snap.
            x.set(newX);

            // Debounce snap
            snapTimeoutRef.current = setTimeout(handleSnap, 150);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [constraints, x, tracks]); // Added tracks dependency for stability

    return (
        <div 
            ref={containerRef} 
            className="relative w-full overflow-hidden" 
            onMouseEnter={() => isHoveredRef.current = true}
            onMouseLeave={() => isHoveredRef.current = false}
        >

            <motion.div 
                ref={contentRef}
                style={{ x: smoothX }}
                drag="x"
                dragConstraints={constraints}
                dragElastic={0.1}
                onDragStart={() => {
                    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
                }}
                onDragEnd={(e, { velocity }) => {
                    const { stride } = getParams();
                    const currentX = x.get();
                    const projectedX = currentX + velocity.x * 0.2;
                    const index = Math.round(projectedX / stride);
                    const snappedX = index * stride;
                    const clampedX = Math.max(constraints.left, Math.min(0, snappedX));
                    x.set(clampedX);
                }}
                // Padding for centering: Mobile (200px -> 100px offset), Desktop (260px -> 130px offset)
                className="flex items-center gap-16 md:gap-20 py-12 cursor-grab active:cursor-grabbing pl-[calc(50vw-100px)] pr-[calc(50vw-100px)] md:pl-[calc(50vw-130px)] md:pr-[calc(50vw-130px)]"
            >
                {tracks.map((track, i) => {
                    const isActive = activeTrackId === track.id;
                    const isHovered = hoveredId === track.id;
                    const shouldDim = hoveredId !== null && hoveredId !== track.id;

                    return (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ 
                                opacity: shouldDim ? 0.3 : 1, 
                                scale: shouldDim ? 0.9 : 1, // Normalized scale
                                filter: shouldDim ? 'blur(2px)' : 'blur(0px)'
                            }}
                            onMouseEnter={() => setHoveredId(track.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`group relative flex-shrink-0 w-[200px] md:w-[260px] cursor-pointer`}
                            onClick={() => onTrackSelect(track)}
                        >
                            {/* Glow Effect Behind Card */}
                            <div className={`absolute -inset-8 bg-brand-red/20 blur-[60px] rounded-full transition-opacity duration-700 ${isActive || isHovered ? 'opacity-100' : 'opacity-0'}`} />

                            {/* Artwork Container */}
                            <div className={`relative aspect-square w-full rounded-3xl overflow-hidden bg-neutral-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-500 ${isHovered ? 'shadow-[0_40px_80px_-20px_rgba(209,0,24,0.3)]' : ''} ${isActive ? 'ring-2 ring-brand-red ring-offset-4 ring-offset-black' : ''}`}>
                                
                                {/* Image */}
                                <Image
                                    src={track.image}
                                    alt={track.title}
                                    fill
                                    className={`object-cover transition-all duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
                                />
                                
                                {/* Glass Overlay on Hover (No Blur on self) */}
                                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                                
                                {/* Play Button */}
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                    <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-xl">
                                        <Play size={28} className="fill-white text-white ml-1" />
                                    </div>
                                </div>

                                {/* Active Badge */}
                                {isActive && (
                                    <motion.div 
                                        layoutId="nowPlayingBadge"
                                        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10"
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                                        </span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Playing</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="mt-6 px-1 text-center group-hover:translate-y-[-5px] transition-transform duration-500">
                                <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight truncate ${isHovered ? 'text-brand-red' : 'text-white'}`}>{track.title}</h3>
                                <p className="text-sm font-medium text-neutral-500 mt-1">{track.artist}</p>
                            </div>
                        </motion.div>
                    );
                })}
                
                {/* Load More Button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex-shrink-0 w-[200px] md:w-[260px] aspect-square flex items-center justify-center"
                >
                     <button className="h-20 w-20 rounded-full border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 hover:border-brand-red hover:text-brand-red transition-all duration-500">
                        <span className="text-3xl font-thin">+</span>
                     </button>
                </motion.div>
            </motion.div>
        </div>
    );
};
