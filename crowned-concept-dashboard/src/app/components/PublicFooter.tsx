// src/components/PublicFooter.tsx
import Link from 'next/link';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const serviceLinks = [
  { name: 'Vacant Home Staging', href: '#' },
  { name: 'Occupied Home Staging', href: '#' },
  { name: 'Interior Design', href: '#' },
  { name: 'Rental & Airbnb', href: '#' },
];

const companyLinks = [
  { name: 'About Us', href: '/team' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '#' },
];

const connectLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'Book a Consultation', href: '#' },
  { name: 'FAQ', href: '#' },
];

export default function PublicFooter() {
    return (
        <footer className="bg-brand-surface text-brand-text py-16 px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Left Column: Logo and Socials */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="font-serif text-3xl tracking-wider mb-4 block">D/S</Link>
                        <p className="font-serif text-xl italic text-brand-text-light max-w-xs mb-6">
                            Let's create something timeless
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="Instagram" className="text-brand-text-light hover:text-brand-primary transition-colors"><Instagram /></a>
                            <a href="#" aria-label="Facebook" className="text-brand-text-light hover:text-brand-primary transition-colors"><Facebook /></a>
                            <a href="#" aria-label="LinkedIn" className="text-brand-text-light hover:text-brand-primary transition-colors"><Linkedin /></a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h3 className="font-semibold mb-4 text-brand-text">Services</h3>
                        <ul className="space-y-3 text-sm">
                            {serviceLinks.map(link => (
                                <li key={link.name}><Link href={link.href} className="text-brand-text-light hover:text-brand-primary transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-4 text-brand-text">Company</h3>
                        <ul className="space-y-3 text-sm">
                            {companyLinks.map(link => (
                                <li key={link.name}><Link href={link.href} className="text-brand-text-light hover:text-brand-primary transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-4 text-brand-text">Connect</h3>
                        <ul className="space-y-3 text-sm">
                            {connectLinks.map(link => (
                                <li key={link.name}><Link href={link.href} className="text-brand-text-light hover:text-brand-primary transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-brand-secondary pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-text-light">
                    <p>&copy; {new Date().getFullYear()} Dazzle Staging. All Rights Reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-brand-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-brand-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}