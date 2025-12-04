// // src/components/HeroSection.tsx
// 'use client';
// import { motion } from 'framer-motion';
// import { ArrowRight, Code, PenTool, Database, BarChart } from 'lucide-react';

// const icons = [<Code />, <PenTool />, <Database />, <BarChart />];

// export default function HeroSection() {
//   return (
//     <section className="relative pt-48 pb-24 text-center overflow-hidden">
//       {/* Background Gradients */}
//       <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-600/20 to-transparent blur-3xl"></div>
//       <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-600/20 to-transparent blur-3xl"></div>
      
//       <div className="container mx-auto px-6 relative z-10">
//         <motion.h1 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text"
//         >
//           Build Your Best Work
//         </motion.h1>
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="mt-4 max-w-2xl mx-auto text-lg text-gray-300"
//         >
//           The ultimate platform for developers and designers to collaborate, ship, and scale their applications seamlessly.
//         </motion.p>
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-8 bg-white text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:bg-gray-200 transition-transform hover:scale-105"
//         >
//           Start Your Free Trial <ArrowRight size={16} />
//         </motion.button>
//       </div>
      
//       {/* Animated Icon Grid */}
//       <div className="relative mt-24 h-48">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]"></div>
//         <div className="grid grid-cols-4 gap-8 px-6">
//           {icons.concat(icons).map((icon, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 0.3, y: 0 }}
//               transition={{
//                 duration: 1.5,
//                 delay: 0.5 + index * 0.1,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 ease: "easeInOut"
//               }}
//               className="text-gray-500"
//             >
//               {icon}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }