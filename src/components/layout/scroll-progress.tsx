'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;

      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 origin-left z-50"
      style={{
        scaleX: scrollProgress,
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    />
  );
}
