// src/app/(public)/service/page.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X, Plus, Crown,Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuLinks = [
    { title: 'HOME', href: '/' },
    { title: 'MEET THE TEAM', href: '/team' },
    { title: 'SERVICES', href: '/services' },
    { title: 'GALLERY', href: '/gallery' },
    { title: 'CONTACT', href: '/contact' },
    { title: 'BLOGS', href: '/blogs' },
    { title: 'STOREFRONT', href: '/storefront' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-6 md:p-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Image */}
        <Link href="/">
          <Image src="/logo.png" alt="Dazzle Logo" width={60} height={60} />
        </Link>

        {/* Hamburger Button */}
        <button onClick={() => setIsOpen(true)} className="p-2">
          <Menu className="text-brand-text" />
        </button>

        {/* Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />

              {/* Sidebar Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-80 bg-brand-primary text-white z-50 p-8"
              >
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-xl font-semibold tracking-widest">MENU</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="h-8 w-8 text-white"/>
                  </button>
                </div>
                <nav className="flex flex-col space-y-6 text-xl">
                  {menuLinks.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="pb-2 border-b border-white/20 hover:opacity-70 transition-opacity"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const PortfolioCard = ({ src, alt, title, className }: { src: string; alt: string; title: string; className?: string; }) => (
  <div className={`space-y-8 ${className}`}>
    {/* This outer div contains the image and clips the zoom effect */}
    <div className="h-96 rounded-2xl overflow-hidden relative">
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.05 }} // This tells Framer Motion to zoom to 105% on hover
        transition={{ duration: 0.5, ease: 'easeOut' }} // This controls the animation's speed
      >
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      </motion.div>
    </div>
    <h3 className="text-xl font-semibold text-center text-brand-text">{title}</h3>
  </div>
);
export default function Servicepage() {
return(
    <>
<Header />
 <section className="py-20 px-6 container mx-auto">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className="flex justify-center items-center gap-8">
          {/* Main Heading */}
          <h2 className="font-serif text-5xl md:text-7xl text-brand-text leading-tight">
            <span className="block">Beautiful homes.</span>
            <span className="block">Thoughtful design.</span>
            <span className="block">
              Real <span className="italic">results.</span>
            </span>
          </h2>
          {/* Decorative Dot */}
          <div className="hidden md:block w-3 h-3 bg-brand-text rounded-full self-center mt-4"></div>
        </div>

        {/* Subheading */}
        <p className="mt-8 text-lg text-brand-text-light max-w-xl mx-auto">
          You tell us your vision. We bring it to life. From single rooms to full homes, we create spaces that feel inviting, balanced and unforgettable.
        </p>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Use the new PortfolioCard component */}
      <PortfolioCard 
        src="/images/vacant.png" 
        alt="Vacant Home Staging" 
        title="Vacant Home Staging" 
      />
      <PortfolioCard 
        src="/images/vacant1.png" 
        alt="Occupied Home Staging" 
        title="Occupied Home Staging"
        className="md:mt-20" // This class keeps the staggered layout
      />

  <PortfolioCard 
        src="/images/IMG5554.jpg" 
        alt="Rental Home Staging" 
        title="Rental Home Staging" 
      />
      <PortfolioCard 
        src="/images/commer.jpeg" 
        alt="Commercial Staging" 
        title="Commercial Staging"
        className="md:mt-20" // This class keeps the staggered layout
      />

    </div>
  </motion.div>
</section>
 {/* --- CTA Section --- */}
        <section className="py-20 px-6">
            <div className="container mx-auto">
                <div className="bg-brand-primary text-white rounded-2xl p-12 md:p-20 text-center">
                     <h2 className="font-serif text-4xl md:text-6xl leading-tight">Let's create something <span className="italic">timeless</span></h2>
                     <p className="max-w-xl mx-auto mt-4 mb-8">Whether you have a vision in mind or are just exploring, our team is here to bring beauty, purpose, and elegance to your space.</p>
                     <Link href="#" className="px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-text font-semibold flex items-center gap-2 group w-fit mx-auto">
                        Contact us <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
</>
)
}