import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Check, Zap, CreditCard, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    title: string;
    price: string;
    period: string;
    tier: string;
    label?: string;
  } | null;
}

const VALID_COUPONS: Record<string, { pct: number; label: string; fixed: number }> = {
  'VALO20': { pct: 20, label: '20% off — Welcome discount', fixed: 0 },
  'VALO50': { pct: 50, label: '50% off — Special offer', fixed: 0 },
  'LAUNCH': { pct: 25, label: '25% off — Launch promo', fixed: 0 },
};

export default function CheckoutModal({ isOpen, onClose, plan }: CheckoutModalProps) {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponData, setCouponData] = useState<{ pct: number; label: string; fixed: number } | null>(null);
  const [couponError, setCouponInputError] = useState('');
  const [payMethod, setPayMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const navigate = useNavigate();

  if (!plan) return null;

  const basePrice = parseFloat(plan.price);
  const discount = couponData ? (couponData.pct > 0 ? (basePrice * couponData.pct / 100) : couponData.fixed) : 0;
  const finalPrice = Math.max(0, basePrice - discount);

  const applyCoupon = () => {
    const code = couponInput.toUpperCase().trim();
    if (VALID_COUPONS[code]) {
      setCouponData(VALID_COUPONS[code]);
      setCouponInputError('');
    } else {
      setCouponData(null);
      setCouponInputError('Invalid coupon code');
    }
  };

  const handlePayment = async () => {
    if (!userData) {
      navigate('/signup');
      return;
    }

    setLoading(true);
    try {
      // API call to upgrade user plan would go here.
      // Mocking for now to remove Firebase dependencies.
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 2500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-20 text-slate-400 lg:text-white/60"
            >
              <X size={20} />
            </button>

            {success ? (
              <div className="p-12 text-center lg:py-24">
                 <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-500/5">
                    <Check size={40} strokeWidth={3} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Successful!</h2>
                 <p className="text-slate-500 font-medium leading-relaxed">
                   Welcome to the {plan.title} plan.<br/>
                   Your signals will start arriving on WhatsApp shortly.
                 </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT: ORDER SUMMARY (Dark) */}
                <div className="bg-slate-950 p-8 lg:p-12 text-white relative flex flex-col">
                   <div className="mb-8">
                     <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-black tracking-widest text-purple-light uppercase border border-white/5 mb-4">
                       {plan.tier} Plan
                     </span>
                     <h3 className="text-3xl font-black mb-2">{plan.title} Subscription</h3>
                     <p className="text-slate-400 text-sm leading-relaxed">Full access · 200+ pairs · AI-powered signals straight to your phone.</p>
                   </div>

                   <div className="space-y-4 mb-auto">
                      {[
                        'AI signals delivered to WhatsApp',
                        '200+ coin pairs monitored 24/7',
                        'Entry, stop-loss, 3 take-profits',
                        'Cancel anytime · No questions'
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                          <Check size={14} className="text-emerald-500 shrink-0" />
                          {feat}
                        </div>
                      ))}
                   </div>

                   <div className="mt-12 pt-8 border-t border-white/10 flex items-end justify-between">
                      <div>
                        {couponData && <div className="text-slate-500 line-through text-lg font-mono mb-1">${basePrice.toFixed(2)}</div>}
                        <div className="text-5xl font-black tracking-tighter">${finalPrice.toFixed(2)}</div>
                        <div className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-wide">{plan.period} billing</div>
                      </div>
                      {couponData && (
                        <div className="bg-emerald-500 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter">
                          {couponData.pct > 0 ? `${couponData.pct}% OFF` : `$${couponData.fixed} OFF`}
                        </div>
                      )}
                   </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
                   <div className="mb-8">
                     <h2 className="text-xl font-black text-slate-900 mb-1">Complete your order</h2>
                     <p className="text-slate-400 text-sm font-medium">Safe & secure SSL encrypted checkout</p>
                   </div>

                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">First Name</label>
                           <input type="text" value={userData?.firstName || ''} readOnly className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Last Name</label>
                           <input type="text" value={userData?.lastName || ''} readOnly className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                        <input type="email" value={userData?.email || ''} readOnly className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Coupon Code</label>
                        <div className="flex gap-2">
                           <input 
                              type="text" 
                              placeholder="VALO20" 
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-mono font-bold outline-none uppercase ${couponData ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : couponError ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-900'}`} 
                           />
                           <button 
                              onClick={applyCoupon}
                              className="rounded-xl bg-slate-900 px-6 font-black text-xs text-white uppercase hover:bg-black transition-colors"
                           >
                             Apply
                           </button>
                        </div>
                        {couponData && <p className="text-[10px] font-bold text-emerald-600 ml-1">✓ {couponData.label}</p>}
                        {couponError && <p className="text-[10px] font-bold text-rose-500 ml-1">✗ {couponError}</p>}
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Payment Method</label>
                        <div className="grid grid-cols-3 gap-2 text-center">
                           {[
                             { id: 'card', icon: <CreditCard size={14} />, label: 'Card' },
                             { id: 'paypal', icon: '🅿', label: 'PayPal' },
                             { id: 'crypto', icon: '₿', label: 'Crypto' }
                           ].map((m) => (
                             <button
                               key={m.id}
                               onClick={() => setPayMethod(m.id as any)}
                               className={`flex items-center justify-center gap-1.5 rounded-xl border py-3 text-xs font-bold transition-all ${payMethod === m.id ? 'border-purple bg-purple/10 text-purple ring-2 ring-purple/10' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                             >
                               {m.icon} {m.label}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Subtotal</span>
                          <span>${basePrice.toFixed(2)}</span>
                        </div>
                        {couponData && (
                          <div className="flex justify-between text-xs font-black text-emerald-600">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-lg font-black text-slate-900 border-t border-slate-200 pt-2 mt-1">
                          <span>Order Total</span>
                          <span>${finalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className="group w-full bg-purple text-white py-4 rounded-full font-black text-[15px] shadow-xl shadow-purple/20 hover:bg-purple-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <Lock size={16} /> Pay ${finalPrice.toFixed(2)} Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1"><Lock size={10} /> SSL Secure</div>
                        <div className="flex items-center gap-1"><Shield size={10} /> PCI Compliant</div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

