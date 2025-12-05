'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export const DynamicBackground = () => {
  const { scrollYProgress } = useScroll();

  // Color Palette:
  // 0% - Black (Hero)
  // 35% - Brand Red (Darker)
  // 65% - Lighter Red / Pinkish White (High Energy)
  // 100% - Soft Black (Footer)
  
  // Note: Using a lighter red/pink instead of pure white to maintain text readability 
  // without needing global text-color inversion logic.
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ['#050505', '#2a0505', '#5c0a1a', '#0a0a0a']
  );

  return (
    <motion.div
      className="fixed inset-0 -z-50 h-full w-full"
      style={{ backgroundColor }}
    />
  );
};
