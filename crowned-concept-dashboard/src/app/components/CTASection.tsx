// src/components/CTASection.tsx
'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 border border-white/10 p-12 rounded-2xl max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
          <Link href="/dashboard" className="bg-white text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 mx-auto w-fit hover:bg-gray-200 transition-colors">
            Start Deploying <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}