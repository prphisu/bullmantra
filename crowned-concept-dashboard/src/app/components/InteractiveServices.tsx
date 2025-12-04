// src/components/InteractiveFooter.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

// Updated data to include images for hover effects
const footerLinks = {
  services: [
    { name: 'Vacant Home Staging', href: '#', image: '/images/blog1.png' },
    { name: 'Interior Design', href: '#', image: '/images/test1.png' },
    { name: 'Rental & Airbnb', href: '#', image: '/images/commer.jpeg' },
  ],
  company: [
    { name: 'About Us', href: '/team', image: '/images/blogmain.png' },
    { name: 'Gallery', href: '/gallery', image: '/images/blog2.png' },
  ],
};

export default function InteractiveFooter() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Effect to track the mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* This is the floating image that follows the cursor */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePosition.x + 20, // Offset from cursor
              y: mousePosition.y - 100, // Offset from cursor
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
            className="fixed top-0 left-0 w-64 h-40 rounded-lg overflow-hidden shadow-2xl pointer-events-none z-50"
          >
            <Image src={hoveredImage} alt="Hover preview" fill style={{ objectFit: 'cover' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* This is your standard footer content */}
      {/* <footer className="bg-brand-surface text-brand-text py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <Link href="/" className="font-serif text-3xl tracking-wider mb-4 block">D/S</Link>
              <p className="font-serif text-xl italic text-brand-text-light max-w-xs mb-6">Let's create something timeless</p>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Instagram"><Instagram className="text-brand-text-light hover:text-brand-primary"/></a>
                <a href="#" aria-label="Facebook"><Facebook className="text-brand-text-light hover:text-brand-primary"/></a>
                <a href="#" aria-label="LinkedIn"><Linkedin className="text-brand-text-light hover:text-brand-primary"/></a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-brand-text">Services</h3>
              <ul className="space-y-3 text-sm">
                {footerLinks.services.map(link => (
                  <li key={link.name} onMouseEnter={() => setHoveredImage(link.image)} onMouseLeave={() => setHoveredImage(null)}>
                    <Link href={link.href} className="text-brand-text-light hover:text-brand-primary">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-brand-text">Company</h3>
              <ul className="space-y-3 text-sm">
                {footerLinks.company.map(link => (
                  <li key={link.name} onMouseEnter={() => setHoveredImage(link.image)} onMouseLeave={() => setHoveredImage(null)}>
                    <Link href={link.href} className="text-brand-text-light hover:text-brand-primary">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-brand-text">Connect</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact" className="text-brand-text-light hover:text-brand-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-brand-text-light hover:text-brand-primary">Book a Consultation</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-brand-secondary pt-8 text-center text-sm text-brand-text-light">
            <p>&copy; {new Date().getFullYear()} Dazzle Staging. All Rights Reserved.</p>
          </div>
        </div>
      </footer> */}
    </>
  );
}