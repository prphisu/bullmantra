// src/components/CoreValues.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Menu, X, Plus, Crown,Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const coreValues = [
  {
    title: 'Integrity',
    description: 'We believe in honesty, transparency, and always doing the right thing, even when no one is looking.',
    image: '/images/33.jpeg',
  },
  {
    title: 'Customer-Centric Service',
    description: 'Your needs come first. We are dedicated to delivering exceptional service tailored to your unique situation.',
    image: '/images/35.jpeg',
  },
  {
    title: 'Creativity & Innovation',
    description: 'We bring fresh ideas and innovative solutions to every project, ensuring your space stands out.',
    image: '/images/37.jpeg',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with you, whether you\'re a homeowner, realtor, or investor, to ensure your goals are met with professionalism and care.',
    image: '/images/38.jpeg',
  },
  {
    title: 'Excellence',
    description: 'From staging to marketing, we strive for the highest standards in every detail, ensuring outstanding results every time.',
    image: '/images/34.jpeg',
  },
  {
    title: 'Sustainability',
    description: 'We are committed to using eco-friendly staging materials and practices where possible, making a positive impact on the environment.',
    image: '/images/36.jpeg',
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 px-6 bg-brand-bg text-brand-text">
      <div className="container mx-auto ">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-6xl text-center leading-tight mb-16"
        >
          Our core <span className="italic">values</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
                initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-brand-surface rounded-2xl shadow-lg border border-brand-secondary overflow-hidden flex flex-col items-center p-6 text-center group"
        >
              {/* Arched Image Container */}
                <div className="relative w-full h-40 -mt-6 mb-6">
                <div className="absolute inset-0 overflow-hidden rounded-b-[50%]">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image 
                          src={value.image} 
                          alt={value.title} 
                          fill 
                          style={{ objectFit: 'cover' }} 
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>

              <h3 className="font-serif text-2xl text-brand-text mb-2">{value.title}</h3>
              <p className="text-sm text-brand-text-light">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

 

    </section>
    
  );
}