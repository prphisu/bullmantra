// src/app/(public)/team/page.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X, Plus, Crown,Star } from 'lucide-react';
import CoreValues from '@/app/components/CoreValues';

// --- Team Member Data ---
const teamMembers = [
  {
    id: 1,
    name: 'Farhana Ahmed',
    role: 'Founder & Creative Director',
    tag: '2 time Resa Award winner - resa - real estate staging association',
    image: '/images/Headshot 1.png', // Ensure this image exists
    bio: [
      "As a TWO TIME RESA Award winner and with a background in home building and renovations, I've always been passionate about transforming spaces. From blueprint to final design, I understand what makes a home truly stand out in the market.",
      "I started DAZZLE to help homeowners and realtors showcase properties at their best. For me, staging isn't just about decor—it's about creating an emotional connection that makes buyers fall in love. My goal is to make every home feel warm, inviting, and unforgettable, leaving a lasting impression.",
    ],
    social: { instagram: '#', facebook: '#', linkedin: '#' }, // Add social links
  },
  {
    id: 2,
    name: 'Sun Sandhu',
    role: 'Co-Stager and Business Operations Manager',
    tag: null, // No specific tag for this member in the screenshot
    image: '/images/sun.png', // Ensure this image exists
    bio: [
      "As a realtor and co-stager, I bring a unique blend of market expertise and interior design to every home I work with. With over three years in real estate and a passion for transforming spaces, I know what it takes to make a property stand out.",
      "With years of combined experience in home staging and interior design, we know how to make a property shine. Farhana, the visionary founder, has built Dazzle Staging with a commitment to excellence, and Sun, with her strong background in real estate, knows exactly what buyers are looking for.",
      "Together, we bring creativity, experience, and a deep understanding of the real estate market to every project. From expert staging strategies to impeccable attention to detail, we work closely with homeowners, realtors, and investors to ensure that every home gets the attention it deserves. Our goal is simple—to transform your property into something that dazzles!",
    ],
    social: { instagram: '#', facebook: '#', linkedin: '#' }, // Add social links
  },
];


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

// --- Team Member Card Component (moved inside the file for simplicity, or can be a separate file) ---
const TeamMemberCard = ({ member, reverse = false }: { member: typeof teamMembers[0]; reverse?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-team-surface-card rounded-2xl shadow-lg border border-team-border-card overflow-hidden ${reverse ? 'md:grid-flow-col-dense' : ''}`}
  >
    {/* Image / Left Side */}
   <div className={`relative min-h-[300px] md:min-h-0 rounded-l-2xl overflow-hidden ${reverse ? 'md:order-2' : 'md:order-1'}`}>
  {/* The Image (stays the same) */}
  <Image src={member.image} alt={member.name} fill style={{ objectFit: 'cover' }} />

  {/* ADDED: Gradient overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
  
  {/* UPDATED: Position the name at the bottom left */}
  <div className="absolute bottom-0 left-0 p-6">
    <h3 className="font-serif text-3xl text-white mb-1">{member.name}</h3>
    {/* It's a good idea to put the role here as well */}
    <p className="text-sm font-semibold text-white/80">{member.role}</p>
  </div>
</div>

    {/* Content / Right Side */}
    <div className={`p-8 flex flex-col justify-center ${reverse ? 'md:order-1' : 'md:order-2'}`}>
      {member.tag && (
        <span className="inline-block bg-team-quote-tag-bg text-team-quote-tag-text text-xs px-3 py-1 rounded-full font-semibold mb-4">
          {member.tag}
        </span>
      )}
      {member.bio.map((paragraph, pIdx) => (
        <p key={pIdx} className="text-sm text-team-secondary-text mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
      <div className="mt-6 pt-6 border-t border-team-border-card text-center">
       
        {/* <p className="text-sm font-semibold text-team-accent-gold">{member.role}</p> */}
        {/* Optional: Add social icons here if needed, consistent with previous team design */}
        {/* <div className="flex justify-center gap-4 mt-4 text-team-social-icon">
          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><Instagram size={20} /></a>
          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><Facebook size={20} /></a>
          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity"><Linkedin size={20} /></a>
        </div> */}
      </div>
    </div>
  </motion.div>
);


// --- Main Team Page Component ---
export default function TeamPage() {
  return (
    <div className="bg-team-bg text-team-primary-heading">
     <Header />
      <section 
        className="relative  flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/team-hero.jpg')" }} // Ensure you have this image
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 text-center text-black ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-6xl md:text-8xl  leading-tight"
          >
            Meet the <span className="italic">team</span>
          </motion.h1>
        </div>
      </section>

      {/* Team Profiles Section */}
      <section className="py-20 px-6 container mx-auto space-y-20">
        <TeamMemberCard member={teamMembers[0]} />
        <TeamMemberCard member={teamMembers[1]} reverse={true} /> {/* Use reverse prop for alternating layout */}
      </section>
      <CoreValues />

      {/* Call to Action Section (reusing previous CTA) */}
      <section 
        className="py-20 px-6 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/team-cta-background.jpg')" }} // Ensure you have this image
      >
        <div className="absolute inset-0 "></div>
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
      </section>
    </div>
  );
}