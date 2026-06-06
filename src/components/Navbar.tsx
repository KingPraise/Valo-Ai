import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/dashboard', '/referral', '/admin'].includes(location.pathname);

  const navLinks = [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Updates', href: '/#product-updates' },
  ];

  return (
    <>
      {!isAuthPage && (
        <div className="bg-purple py-2 text-center text-[10px] font-bold tracking-widest text-white uppercase md:text-xs">
          🎉 7-day free trial — No credit card required. <Link to="/signup" className="underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">Sign up free →</Link>
        </div>
      )}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
              <div className="h-2.5 w-2.5 rounded-full bg-purple shadow-[0_0_10px_rgba(108,53,222,0.4)] group-hover:scale-110 transition-transform" />
              <span className="text-xl font-black tracking-tighter text-slate-900">Valo AI</span>
            </Link>
            
            <div className="hidden md:ml-12 md:flex md:items-center md:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-bold text-slate-600 transition-all hover:text-purple hover:translate-y-[-1px] active:translate-y-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden text-sm font-semibold text-slate-700 transition-colors hover:text-purple sm:block">
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple/20 transition-all hover:bg-purple-dark hover:translate-y-[-1px] active:translate-y-0"
            >
              Start Free Trial
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-slate-200 bg-white md:hidden"
            >
              <div className="space-y-1 px-4 pt-2 pb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-bold text-slate-700 transition-colors hover:bg-purple-light hover:text-purple"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-purple-light hover:text-purple"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-purple py-3 font-bold text-white shadow-lg"
                >
                  Start Free Trial <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
