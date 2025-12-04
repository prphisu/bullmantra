// src/components/FeaturesSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Layers, Zap, Share2 } from 'lucide-react';

const features = [
  { icon: <Layers />, title: "Seamless Integration", description: "Connect your favorite tools and workflows in just a few clicks." },
  { icon: <Zap />, title: "Blazing Fast Performance", description: "Optimized for speed, ensuring your projects load instantly." },
  { icon: <Share2 />, title: "Real-time Collaboration", description: "Work with your team on the same project, at the same time." }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#101010] rounded-3xl">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl"
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}