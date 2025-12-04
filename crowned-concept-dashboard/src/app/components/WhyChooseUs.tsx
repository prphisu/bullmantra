// src/components/WhyChooseUs.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, Sofa, TreeDeciduous, Square, FrameIcon } from 'lucide-react';
import Image from 'next/image';

const checklistItems = [
    { icon: <Sofa size={20} className="text-green-600"/>, text: "Grounded the oversized room with two 91-inch curved moon sofas for symmetry and flow" },
    { icon: <FrameIcon size={20} className="text-red-500"/>, text: "Added matching accent chairs to create a complete conversational layout" },
    { icon: <Heart size={20} className="text-pink-500"/>, text: "Layered in soft neutrals with a plush cream rug to warm up the tall ceilings" },
    { icon: <Square size={20} className="text-blue-500"/>, text: "Introduced contrast with a sleek black coffee table and curated decor styling" },
    { icon: <TreeDeciduous size={20} className="text-orange-500"/>, text: "Utilized negative wall spaces 10-ft tree & mirror on one side, decor-filled shelving on the other to frame the fireplace and balance the height" },
]

export default function WhyChooseUs() {
  const x = useMotionValue(0);
  const clipPath = useTransform(x, (latestX) => `inset(0 ${500 - latestX}px 0 0)`);
  
  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Text Content */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <p className="font-semibold text-sm bg-brand-text text-white py-1 px-3 rounded-full inline-block mb-4">
                WHY CHOOSE US
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-text leading-tight">
                From blank canvas to balanced <span className="italic">living</span>
            </h2>
            <p className="mt-6 text-brand-text-light">
                A beautiful designed room doesn’t just look good, it feels good. We focus on scale, symmetry, and warmth to turn large, empty spaces into inviting, livable showpieces.
            </p>
        </motion.div>

        {/* Right Column: Checklist */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
        >
            {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <p className="text-brand-text-light">{item.text}</p>
                </div>
            ))}
        </motion.div>
      </div>

      {/* Before & After Image Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mt-12 w-full max-w-4xl mx-auto"
      >
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
          {/* Before Image (Bottom Layer) */}
          <Image
            src="/images/IMG5031.jpg"
            alt="Before staging"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />

          {/* After Image (Top Layer, clipped) */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath }}
          >
            <Image
              src="/images/1220 After.jpg"
              alt="After staging"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </motion.div>
          
          {/* Slider Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // This will be set dynamically
            dragElastic={0}
            dragMomentum={false}
            onDrag={(event, info) => {
              // Dynamically set drag constraints based on container width
              const container = info.point.x - info.offset.x - (event.target as HTMLElement).getBoundingClientRect().left;
              (event.target as any)._dragX.constraints.right = container;
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5"/><path d="M13 7l5 5-5 5"/></svg>
            </div>
            <div className="absolute left-[-32px] top-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md">BEFORE</div>
            <div className="absolute right-[-28px] top-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md">AFTER</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}