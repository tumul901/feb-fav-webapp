// src/components/Hero/Hero.tsx

import React from 'react';
import Image from 'next/image'; // 1. Import the Image component
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <div className="relative flex h-[70vh] items-center justify-center text-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {/* 2. Use the Next.js Image component */}
        <Image
          src="/bg/Background.png"
          alt="Concert crowd"
          fill={true} // Makes the image fill the parent container
          className="object-cover opacity-30" // Ensures it covers without stretching
          priority // 3. Add 'priority' to load it fast (it's above the fold)
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <h1 className="text-5xl font-extrabold md:text-7xl">
          FEBRUARY&apos;S <span className='text-brand-red'>FAVOURITE</span>
        </h1>
        <p className="mt-4 max-w-lg text-lg text-zinc-300">
          Discover the latest releases from our independent artists.
        </p>
        <button className="mt-8 transform rounded-full bg-white px-8 py-3 font-bold text-black transition-transform duration-300 hover:scale-105 hover:bg-brand-red hover:text-amber-50">
          Explore Music
        </button>
      </div>
    </div>
  );
};

export default Hero;