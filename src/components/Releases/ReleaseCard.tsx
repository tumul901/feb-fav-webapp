'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReleaseItem } from '@/data/ReleasesData';
import { Play } from 'lucide-react';

interface ReleaseCardProps {
  release: ReleaseItem;
  onClick: (release: ReleaseItem) => void;
}

export const ReleaseCard = ({ release, onClick }: ReleaseCardProps) => {
  return (
    <motion.div
      className="group relative h-[350px] w-[280px] flex-shrink-0 cursor-pointer"
      whileHover={{ y: -20, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick(release)}
    >
      {/* Vinyl Sleeve Container */}
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(209,0,24,0.3)]">
        
        {/* Cover Image */}
        <div className="relative h-4/5 w-full overflow-hidden">
          <Image
            src={release.image || '/bg/Background.png'}
            alt={release.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/90 backdrop-blur-sm">
                <Play className="ml-1 fill-white text-white" size={32} />
             </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="absolute bottom-0 h-1/5 w-full bg-neutral-900/80 backdrop-blur-md p-4">
            <h3 className="truncate text-xl font-bold text-white group-hover:text-brand-red transition-colors">
              {release.title}
            </h3>
            <p className="flex items-center justify-between text-sm text-neutral-400">
                <span>{release.genre}</span>
                <span>{release.year}</span>
            </p>
        </div>
      </div>
      
      {/* Vinyl Disc Hint (peeking out on hover) */}
      <div className="absolute top-4 right-4 -z-10 h-[90%] w-[90%] rounded-full bg-black shadow-xl transition-transform duration-700 group-hover:translate-x-16 group-hover:rotate-90">
         <div className="absolute inset-0 m-auto h-1/3 w-1/3 rounded-full bg-neutral-800/50 border border-neutral-700" />
      </div>

    </motion.div>
  );
};
