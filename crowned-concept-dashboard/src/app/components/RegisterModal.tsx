'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions/register';
import { Loader2, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await register(formData);

    if (result.error) {
      setError(result.error);
      setIsPending(false);
    } else {
      setSuccess(result.success!);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                <p className="text-sm text-gray-600 mt-2">Create your account to start trading.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center">
                    {success}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input name="name" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input name="password" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
                </div>

                <button
                  type="submit"
                  disabled={isPending || !!success}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-70 transition-colors"
                >
                  {isPending ? <Loader2 className="animate-spin" size={20} /> : <>Sign Up <ArrowRight size={18} /></>}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}