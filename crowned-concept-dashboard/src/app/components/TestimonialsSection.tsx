// src/components/TestimonialsSection.tsx
'use client';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-2xl md:text-3xl font-medium max-w-3xl mx-auto">
                        "This platform completely changed how our team works. We're shipping features faster than ever before."
                    </p>
                    <div className="mt-8">
                        <p className="font-semibold">Alex Johnson</p>
                        <p className="text-gray-400">CTO at Innovate Inc.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}