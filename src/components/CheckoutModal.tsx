import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Check, Zap, CreditCard, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, serverTimestamp, getDoc, increment, collection, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    title: string;
    price: string;
    period: string;
    tier: string;
  } | null;
}

export default function CheckoutModal({ isOpen, onClose, plan }: CheckoutModalProps) {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  if (!plan) return null;

  const handlePayment = async () => {
    if (!userData) {
      navigate('/signup');
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, 'users', userData.uid);
      const isTrial = userData.status === 'trial';
      const isNewActive = userData.status !== 'active';
      
      // 1. Update user plan
      await updateDoc(userRef, {
        plan: plan.title === 'Monthly' ? 'pro' : plan.title.toLowerCase(),
        status: 'active',
        planExpiresAt: new Date(Date.now() + (plan.title === 'Monthly' ? 30 : plan.title === 'Quarterly' ? 90 : plan.title === '6 Months' ? 180 : 365) * 24 * 60 * 60 * 1000)
      });

      // 1.5. Track the sale for Admin Sales Report
      await setDoc(doc(collection(db, 'sales')), {
        userId: userData.uid,
        userName: `${userData.firstName} ${userData.lastName}`,
        amount: parseFloat(plan.price),
        plan: plan.title,
        createdAt: serverTimestamp()
      });

      // 2. Handle Referral Commission
      if (userData.referrerId && isNewActive) {
        const commissionAmount = parseFloat(plan.price) * 0.3;
        const referrerRef = doc(db, 'users', userData.referrerId);
        
        await updateDoc(referrerRef, {
          balance: increment(commissionAmount),
          totalEarnings: increment(commissionAmount),
          // Only increment referralCount if they were previously trial/none and now are active
          referralCount: increment(1)
        });

        // Track the referral event in a separate collection for history
        await setDoc(doc(collection(db, 'referralSales')), {
          referrerId: userData.referrerId,
          referredUserId: userData.uid,
          referredUserName: `${userData.firstName} ${userData.lastName}`,
          amount: parseFloat(plan.price),
          commission: commissionAmount,
          plan: plan.title,
          createdAt: serverTimestamp()
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userData.uid}`);
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
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
            >
              <X size={20} className="text-slate-400" />
            </button>

            {success ? (
              <div className="p-12 text-center">
                 <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-500/5">
                    <Check size={40} strokeWidth={3} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Successful!</h2>
                 <p className="text-slate-500 font-medium leading-relaxed">
                   Welcome to the {plan.title} plan.<br/>
                   Redirecting you to your signals...
                 </p>
              </div>
            ) : (
              <>
                <div className="p-8 pb-0">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-purple/10 text-purple p-2 rounded-xl">
                      <Zap size={20} />
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-400 uppercase">Secure Checkout</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Upgrade to {plan.title}</h2>
                  <p className="text-slate-500 text-sm font-medium mb-8">Get instant access to AI signals delivered via WhatsApp.</p>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                     <div className="flex justify-between items-baseline mb-4 pb-4 border-b border-slate-200">
                        <span className="text-slate-600 font-bold">{plan.title} Subscription</span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-slate-900">${plan.price}</span>
                          <span className="text-xs font-bold text-slate-400 ml-1">{plan.period}</span>
                        </div>
                     </div>
                     <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">Total Due Now</span>
                        <span className="text-2xl font-black text-purple">${plan.price}.00</span>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                           <CreditCard size={18} />
                        </div>
                        <div className="flex-1">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Payment Method</div>
                           <div className="text-sm font-bold text-slate-900 italic">Simulated Gateway · Any Card Works</div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100">
                   <button 
                     onClick={handlePayment}
                     disabled={loading}
                     className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[15px] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     {loading ? 'Processing...' : `Pay $${plan.price}.00 Now`} <ArrowRight size={18} />
                   </button>
                   <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-1"><Lock size={10} /> SSL Secure</div>
                      <div className="flex items-center gap-1"><Shield size={10} /> PCI Compliant</div>
                   </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
