// src/components/CustomCursor.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-8 h-8 bg-brand-text/30 rounded-full pointer-events-none z-50"
      style={{
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    />
  );
}