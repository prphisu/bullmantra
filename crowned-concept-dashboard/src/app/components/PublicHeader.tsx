// src/components/PublicHeader.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PublicHeader() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      {/* <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="text-xl font-bold">Logo</div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">Testimonials</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <Link href="/dashboard" className="bg-white text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          Get Started
        </Link>
      </div> */}
    </motion.header>
  );
}