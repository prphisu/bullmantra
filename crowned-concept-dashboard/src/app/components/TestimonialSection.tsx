// // src/components/TestimonialSection.tsx
// 'use client';

// import { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Star } from 'lucide-react';
// import Image from 'next/image';

// const testimonials = [
//   {
//     quote: "Dazzle's team was incredible. They completely transformed our vacant property into a warm, inviting home. We had multiple offers within a week!",
//     name: 'Sarah J.',
//     title: 'Realtor',
//     image: '/images/test1.png',
//   },
//   {
//     quote: "The attention to detail was impeccable. I truly believe their staging is the reason our home sold so quickly and above asking price.",
//     name: 'Michael B.',
//     title: 'Homeowner',
//     image: '/images/test2.png',
//   },
//   {
//     quote: "Working with Dazzle was a seamless experience. Their professionalism and design sense are second to none. Highly recommended!",
//     name: 'Jessica L.',
//     title: 'Property Developer',
//     image: '/images/faq.png',
//   },
// ];

// export default function TestimonialSection() {
//   const targetRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ['start start', 'end end'],
//   });

//   return (
//     <section ref={targetRef} className="py-20 bg-brand-surface relative h-[300vh]">
//       <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
//         <motion.h2
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="font-serif text-5xl md:text-6xl text-brand-text text-center leading-tight mb-12"
//         >
//           What our clients are saying
//         </motion.h2>

//         <div className="relative w-full max-w-4xl h-[400px]">
//           {testimonials.map((testimonial, index) => {
//             const start = index / testimonials.length;
//             const end = (index + 1) / testimonials.length;
//             const scale = useTransform(scrollYProgress, [start, end], [1, 0.8]);
//             const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

//             return (
//               <motion.div
//                 key={index}
//                 style={{
//                   scale,
//                   opacity,
//                   zIndex: testimonials.length - index,
//                   position: 'absolute',
//                   top: 0, left: 0, right: 0
//                 }}
//                 className="w-full max-w-4xl mx-auto"
//               >
//                 <div className="bg-brand-bg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl border border-brand-secondary h-[600px] w-[1000px]">
//                   <div className="h-full w-full rounded-xl overflow-hidden relative">
//                     <Image src={testimonial.image} alt={testimonial.name} fill style={{objectFit: 'cover'}}/>
//                   </div>
//                   <div className="flex flex-col justify-center">
//                       <div className="flex items-center gap-1 mb-4 text-yellow-500">{[...Array(5)]?.map((_, i) => <Star key={i} size={20} fill="currentColor" />)}</div>
//                       <p className="text-lg text-brand-text-light mb-6 italic">{testimonial.quote}</p>
//                       <div>
//                           <p className="font-bold text-brand-text">{testimonial.name}</p>
//                           <p className="text-sm text-brand-text-light">{testimonial.title}</p>
//                       </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }