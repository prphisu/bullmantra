'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Star, 
  Users, 
  Home, 
  Briefcase, 
  BookOpen,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Quote,
  UploadCloud
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import RegisterModal from '../components/RegisterModal'; // Import the modal

// --- Reusable Button Component ---
// Updated to handle onClick for the modal
const Button = ({ children, href, onClick, variant = 'primary' }: { children: React.ReactNode, href?: string, onClick?: () => void, variant?: 'primary' | 'secondary' }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer";
  const variants = {
    primary: "bg-accent-blue text-white hover:bg-opacity-80",
    secondary: "bg-dark-secondary text-text-primary hover:bg-opacity-80 border border-text-secondary/20",
  };

  // If onClick is provided, render a button (for Modal)
  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
        {children}
      </button>
    );
  }

  // Otherwise render a Link
  return (
    <Link href={href || '#'} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </Link>
  );
};

// --- Header Component ---
const Header = ({ onOpenRegister }: { onOpenRegister: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuLinks = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
     { title: 'Services', href: '/services' },
    // { title: 'Gallery', href: '/gallery' },
    // { title: 'Community', href: '/community' },
    { title: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src="/Bull_MANTRA.jpg" alt="Bull Mantra" width={50} height={50} />
        </Link>

        <nav className="hidden lg:flex gap-6 items-center">
          {menuLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-text-secondary hover:text-text-primary transition-colors">
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-text-secondary hover:text-text-primary font-medium">
            Login
          </Link>
          {/* Button triggers the modal */}
          <Button onClick={onOpenRegister} variant="primary">
            Get Started <ArrowRight size={18} />
          </Button>
        </div>

        <button onClick={() => setIsOpen(true)} className="lg:hidden p-2">
          <Menu className="text-text-primary" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-80 bg-dark-secondary text-white z-50 p-8"
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
                  <hr className="border-white/20"/>
                  <Link href="/login" className="text-text-secondary text-lg">Login</Link>
                  {/* Mobile Button triggers modal */}
                  <Button onClick={() => { setIsOpen(false); onOpenRegister(); }} variant="primary">Get Started</Button>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// --- Hero Section Component (Dynamic) ---
interface Banner {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
}

const HeroSection = ({ onOpenRegister }: { onOpenRegister: () => void }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error('Failed to load banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  if (loading) {
    return (
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 text-white">
        <Loader2 className="animate-spin" size={48} />
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section className="relative pt-48 pb-24 text-center overflow-hidden bg-gray-900 text-white h-[600px] flex flex-col justify-center">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-600/20 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-600/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Welcome to Our Platform
          </h1>
          <p className="mt-4 text-gray-300 text-xl mb-8">
            Master the markets with Indian #1 trading community.
          </p>
          <div className="flex justify-center">
            <Button onClick={onOpenRegister} variant="primary">
              Join Now <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] text-center overflow-hidden bg-gray-900 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img 
              src={banners[currentIndex].image_url} 
              alt={banners[currentIndex].title}
              className="w-full h-full object-cover opacity-60" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-600/10 to-transparent mix-blend-overlay" />
          <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
            <div className="max-w-4xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 drop-shadow-sm leading-tight"
              >
                {banners[currentIndex].title}
              </motion.h1>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-8"
              >
                {/* If banner has a link, use it. Otherwise, open register modal. */}
                {banners[currentIndex].link_url ? (
                  <Link 
                    href={banners[currentIndex].link_url!} 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    Explore Now <ArrowRight size={20} />
                  </Link>
                ) : (
                  <Button onClick={onOpenRegister} variant="primary">
                    Get Started <ArrowRight size={18} />
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {banners.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all">
            <ChevronLeft size={32} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all">
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

// --- Features Section ---
// const FeaturesSection = () => {
//   const features = [
//     { icon: <Home size={32} className="text-accent-blue" />, title: "Expert Mentorship", desc: "Learn directly from seasoned traders with proven track records." },
//     { icon: <BookOpen size={32} className="text-accent-blue" />, title: "Trading Education", desc: "Comprehensive courses covering technical and fundamental analysis." },
//     { icon: <Users size={32} className="text-accent-blue" />, title: "Live Community", desc: "Join our active network of traders for daily insights." },
//     { icon: <Briefcase size={32} className="text-accent-blue" />, title: "Market Tools", desc: "Access exclusive indicators and market scanning software." },
//   ];

//   return (
//     <section className="py-20 px-6 bg-dark-primary">
//       <div className="container mx-auto">
//         <div className="text-center max-w-2xl mx-auto">
//           <h2 className="text-4xl md:text-5xl font-bold text-text-primary">What We Do</h2>
//           <p className="mt-4 text-text-secondary">
//             We provide a complete ecosystem for aspiring and professional traders to master the markets.
//           </p>
//         </div>

//         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="bg-dark-secondary p-8 rounded-xl border border-text-secondary/10 text-center"
//             >
//               <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto">
//                 {feature.icon}
//               </div>
//               <h3 className="mt-6 text-xl font-semibold text-text-primary">{feature.title}</h3>
//               <p className="mt-2 text-text-secondary">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// --- Services/Courses Section (Dynamic) ---
interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
}

const ServicesSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-20 px-6 bg-dark-secondary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Our Premium Courses</h2>
          <p className="mt-4 text-text-secondary">
            Master the market with our expertly crafted trading curriculum.
          </p>
        </motion.div>

        {loading ? (
           <div className="mt-16 flex justify-center text-text-secondary">
             <Loader2 className="animate-spin mr-2" /> Loading courses...
           </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-dark-primary rounded-xl overflow-hidden border border-text-secondary/10 flex flex-col group hover:border-accent-blue/50 transition-colors"
                >
                  <div className="h-56 relative overflow-hidden bg-gray-800">
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x250?text=No+Image'; }}
                    />
                    <div className="absolute top-4 right-4 bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                      ₹{course.price}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-1">{course.title}</h3>
                    <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-1">
                      {course.description}
                    </p>
                    
                    <div className="pt-4 border-t border-text-secondary/10 flex justify-between items-center">
                      <div className="flex text-accent-gold">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <Link href={`/courses/${course.id}`} className="text-accent-blue font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-text-secondary py-10">
                <BookOpen className="mx-auto mb-4 opacity-50" size={48}/>
                <p>No courses available right now. Check back soon!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// --- FAQ Item Component ---
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-text-secondary/20">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-6">
        <span className="text-lg font-semibold text-text-primary">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-accent-blue">
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-secondary">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- Why Choose Us Section ---
const WhyChooseUsSection = () => {
  return (
    <section className="py-20 px-6 bg-dark-primary">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Why <span className="text-accent-blue">Bull Mantra?</span></h2>
          <p className="mt-4 text-text-secondary">
            We don,t just teach theory; we build profitable traders. Experience the power of live mentorship, actionable strategies, and a supportive community.
          </p>
          <div className="mt-8">
            <FaqItem q="Expert Mentorship" a="Learn directly from seasoned traders with years of proven market experience." />
            <FaqItem q="Proven Strategies" a="Stop gambling and start trading. We teach high-probability setups." />
            <FaqItem q="Live Market Analysis" a="Join our live trading sessions to see how professionals analyze and execute." />
            <FaqItem q="Lifetime Community" a="Join our exclusive network of alumni and mentors for lifetime support." />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }} 
          className="relative h-[600px] rounded-xl overflow-hidden border border-text-secondary/10"
        >
          <Image src="/images/admin.jpg" alt="Trading Analysis" fill style={{objectFit: 'cover'}} />
        </motion.div>
      </div>
    </section>
  );
};

// --- Testimonials Section (Dynamic) ---
interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  author_image: string;
  rating: number;
  comment: string;
}

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-dark-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-20 left-20 w-64 h-64 bg-accent-blue rounded-full blur-3xl"></div>
         <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">See what our students have to say about their journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-primary p-8 rounded-2xl border border-white/5 relative group hover:border-accent-blue/30 transition-all"
            >
              <Quote className="absolute top-6 right-6 text-accent-blue/20" size={40} />
              
              <div className="flex gap-1 mb-6 text-accent-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-600" : ""} />
                ))}
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed line-clamp-4">{review.comment}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent-blue/20 bg-gray-800">
                  {review.author_image ? (
                    <img src={review.author_image} alt={review.author_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <UploadCloud size={20}/>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold">{review.author_name}</h4>
                  <p className="text-accent-blue text-sm">{review.author_role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CTA Section ---
const CTASection = ({ onOpenRegister }: { onOpenRegister: () => void }) => {
  return (
    <section className="py-20 px-6 bg-dark-primary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-accent-blue text-white rounded-xl p-12 md:p-20 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl leading-tight font-bold">Ready to Start Your Trading Journey?</h2>
          <p className="max-w-xl mx-auto mt-4 mb-8">
            Join thousands of successful traders. Get started today.
          </p>
          <div className="flex justify-center">
            <Button onClick={onOpenRegister} variant="primary" >
              Get Started Now <ArrowRight size={20} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-dark-secondary text-text-secondary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <Image src="/Bull_MANTRA.jpg" alt="Bull Mantra Logo" width={60} height={60} />
          <p className="mt-4 text-sm">
            Empowering traders with knowledge and tools.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="#" className="hover:text-accent-blue"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-accent-blue"><Linkedin size={20} /></Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link href="/about" className="hover:text-accent-blue">About Us</Link>
            <Link href="/services" className="hover:text-accent-blue">Services</Link>
            <Link href="/community" className="hover:text-accent-blue">Community</Link>
            <Link href="/contact" className="hover:text-accent-blue">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-text-primary mb-4">Services</h4>
          <nav className="flex flex-col gap-2">
            <Link href="/services/mentorship" className="hover:text-accent-blue">Mentorship</Link>
            <Link href="/services/courses" className="hover:text-accent-blue">Courses</Link>
            <Link href="/services/signals" className="hover:text-accent-blue">Signals</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-text-primary mb-4">Contact Us</h4>
          <address className="not-italic flex flex-col gap-2">
            <p>Your Address Here</p>
            <a href="mailto:support@bullmantra.com" className="hover:text-accent-blue">support@bullmantra.com</a>
            <a href="tel:+911234567890" className="hover:text-accent-blue">+91 123 456 7890</a>
          </address>
        </div>
      </div>
      <div className="container mx-auto border-t border-text-secondary/20 mt-12 pt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Bull Mantra. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Main Homepage Component ---
export default function HomePage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="bg-dark-primary">
      <Header onOpenRegister={() => setIsRegisterOpen(true)} />
      <main>
        <HeroSection onOpenRegister={() => setIsRegisterOpen(true)} />
        {/* <FeaturesSection /> */}
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection /> 
        <CTASection onOpenRegister={() => setIsRegisterOpen(true)} />
      </main>
      <Footer />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}