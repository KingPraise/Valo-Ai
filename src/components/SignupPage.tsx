import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Smartphone, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    whatsapp: '',
    country: '',
  });
  
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const referrerCodeInput = urlParams.get('ref') || undefined;

      const res = await fetch(`${API_URL}/api/web/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          phone: formData.whatsapp, // The user will enter this in step 2, wait! In this flow, they enter whatsapp in step 2.
          // For now, let's just proceed to step 2 locally before submitting to backend
        })
      });
      // We will actually move the backend call to after step 2 is filled.
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    setLoading(true);
    setError(null);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const referrerCodeInput = urlParams.get('ref') || undefined;

      // Submit everything here
      const res = await fetch(`${API_URL}/api/web/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          phone: formData.whatsapp,
          referredBy: referrerCodeInput
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      login(data.token, data.user);
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2); // move to whatsapp step locally
    } else if (step === 2) {
      handleConnectWhatsApp(); // submit to backend
    } else {
      navigate('/dashboard');
    }
  };

  const steps = [
    { title: 'Create Account', id: 1 },
    { title: 'WhatsApp', id: 2 },
    { title: 'Success', id: 3 },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2">
      {/* LEFT: INFO PANEL */}
      <div className="hidden flex-col justify-center bg-linear-to-br from-purple to-purple-dark p-12 text-white lg:flex lg:p-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
        
        <div className="relative z-10">
          <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold tracking-widest text-white uppercase">Free for 7 days</span>
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Your signals are waiting in WhatsApp.</h2>
          <p className="mb-10 max-w-md text-lg text-purple-light/80">Create your account and connect WhatsApp. Valo AI does the rest — automatically, 24/7.</p>
          
          <div className="space-y-8">
            {[
              { icon: <MessageSquare size={20} />, title: 'Auto-delivered to WhatsApp', desc: 'Complete signals pushed to your phone the moment they\'re ready.' },
              { icon: <ShieldCheck size={20} />, title: 'Risk-managed every signal', desc: 'Entry, SL, 3 TP, leverage, and position size in every signal.' },
              { icon: <Zap size={20} />, title: 'Live in under 3 minutes', desc: 'Sign up, connect WhatsApp, done. No charts, no complexity.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-white leading-tight mb-1">{item.title}</h4>
                  <p className="text-sm text-purple-light/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: FORM */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-8 lg:p-20">
        <div className="w-full max-w-md">
          {/* STEP INDICATOR */}
          <div className="mb-12 flex items-center justify-between px-2">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all ${
                    step >= s.id ? 'bg-purple text-white ring-4 ring-purple/10' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s.id ? <Check size={14} /> : s.id}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-[2px] flex-1 mx-2 transition-all ${step > s.id ? 'bg-purple' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key="step1"
              >
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red text-xs font-bold rounded-xl border border-red/10">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">First Name</label>
                    <input 
                      type="text" 
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all" 
                      placeholder="Alex" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all" 
                      placeholder="Chen" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all" 
                    placeholder="you@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                  <input 
                    type="password" 
                    placeholder="Min. 8 characters" 
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={loading}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-purple py-4 font-black text-white shadow-xl shadow-purple/20 transition-all hover:bg-purple-dark active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Continue'} <ArrowRight size={18} />
                </button>
                
                <p className="mt-6 text-center text-[10px] leading-relaxed text-slate-400">
                  By continuing you agree to our <a href="#" className="text-purple font-bold">Terms</a> and <a href="#" className="text-purple font-bold">Privacy Policy</a>
                </p>
                <div className="mt-8 text-center text-sm text-slate-500">
                  Already have an account? <Link to="/login" className="font-bold text-purple">Log in</Link>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key="step2"
              >
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Connect WhatsApp</h2>
                <p className="mt-2 mb-8 text-sm text-slate-500">Step 2 of 3 — Where your signals will arrive</p>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red text-xs font-bold rounded-xl border border-red/10">
                    {error}
                  </div>
                )}

                <div className="mb-8 flex gap-4 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-500/10">
                  <Smartphone className="shrink-0 text-emerald-600" />
                  <p className="text-xs leading-relaxed text-emerald-800">
                    <strong className="block mb-0.5">This is where your signals land</strong>
                    Every signal Valo AI generates is automatically pushed to this number. Use your active WhatsApp number.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">WhatsApp Number</label>
                  <div className="flex">
                    <div className="flex items-center gap-1 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-400">🌍 +</div>
                    <input 
                      type="tel" 
                      className="w-full rounded-r-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all" 
                      placeholder="1 234 567 8900" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Country</label>
                  <select 
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple outline-hidden appearance-none bg-no-repeat bg-[right_1rem_center]"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                     <option value="">Select your country</option>
                     <option value="United States">🇺🇸 United States (+1)</option>
                     <option value="United Kingdom">🇬🇧 United Kingdom (+44)</option>
                     <option value="Nigeria">🇳🇬 Nigeria (+234)</option>
                     <option value="Other">🌍 Other</option>
                  </select>
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={loading}
                  className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-black text-white shadow-xl shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Connecting...' : 'Connect WhatsApp'} <ArrowRight size={18} />
                </button>
                <button onClick={() => setStep(1)} className="mt-4 w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                  ← Go Back
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key="step3"
                className="text-center"
              >
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-500/5 text-emerald-500">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">You're all set! 🎉</h2>
                <p className="mt-4 mb-10 text-slate-500 leading-relaxed">
                  Account created. WhatsApp connected.<br/>
                  <strong className="text-slate-900 font-black">Signals will start arriving shortly.</strong>
                </p>
                
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left space-y-4 mb-10">
                   <div className="flex gap-3 text-sm">
                      <span className="text-emerald-500 font-black">1.</span>
                      <span className="text-slate-600">Valo AI is monitoring 200+ pairs 24/7.</span>
                   </div>
                   <div className="flex gap-3 text-sm">
                      <span className="text-emerald-500 font-black">2.</span>
                      <span className="text-slate-600">High-quality signals pushed to you automatically.</span>
                   </div>
                </div>

                <button onClick={handleNext} className="w-full rounded-xl bg-purple py-4 font-black text-white shadow-xl shadow-purple/20 transition-all hover:bg-purple-dark">
                  Go to dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
