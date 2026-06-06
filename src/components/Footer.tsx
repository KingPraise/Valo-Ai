import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 px-4 pt-20 pb-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <div className="h-3 w-3 rounded-full bg-purple" />
              Valo AI
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              AI-powered crypto signals, trade setups, market alerts and coaching notes — delivered automatically to your WhatsApp. Complete. Risk-managed. Zero friction.
            </p>
            <div className="text-xs italic text-slate-500">Systems. Signals. Success.</div>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold tracking-widest text-white/40 uppercase">Product</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/#how-it-works" className="transition-colors hover:text-white">How It Works</Link></li>
              <li><Link to="/#features" className="transition-colors hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="transition-colors hover:text-white">Pricing</Link></li>
              <li><a href="#" className="transition-colors hover:text-white">Signal Format</a></li>
              <li><a href="#" className="transition-colors hover:text-white">WhatsApp Delivery</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold tracking-widest text-white/40 uppercase">Account</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/signup" className="transition-colors hover:text-white">Sign Up Free</Link></li>
              <li><Link to="/login" className="transition-colors hover:text-white">Log In</Link></li>
              <li><Link to="/dashboard" className="transition-colors hover:text-white">Dashboard</Link></li>
              <li><a href="#" className="transition-colors hover:text-white">Subscription</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Billing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-bold tracking-widest text-white/40 uppercase">Company</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="transition-colors hover:text-white">About Valo AI</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Risk Disclaimer</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <div className="max-w-2xl text-[10px] leading-relaxed text-slate-600 sm:text-xs">
            <strong className="text-slate-500">Risk Disclaimer:</strong> Valo AI provides AI-generated market analysis for informational and educational purposes only. This is not financial advice. Cryptocurrency and derivatives trading involves substantial risk of loss. Past signal performance does not guarantee future results. You are solely responsible for all trading decisions. Never trade with capital you cannot afford to lose.
          </div>
          <div className="whitespace-nowrap text-xs text-slate-600">
            © 2025 Valo AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
