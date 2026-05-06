import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Shield, Zap, TrendingUp, Gift, Lock, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    tier: 'Starter',
    title: 'Free Trial',
    price: '0',
    period: '/ 7 days',
    tagline: '7 days full access. No commitment.',
    features: [
      { text: 'AI signals pushed to WhatsApp', included: true },
      { text: 'BTC, ETH & major pairs', included: true },
      { text: 'Complete signal format', included: true },
      { text: 'Dashboard + 7-day history', included: true },
      { text: 'Full 200+ coin pair library', included: false },
      { text: 'Referral commissions', included: false },
    ],
    cta: 'Start free trial',
    featured: false,
    color: 'slate',
  },
  {
    tier: 'Pro',
    title: 'Monthly',
    price: '40',
    period: '/ month',
    tagline: 'Full access. Every signal. Every month.',
    features: [
      { text: 'All signals auto-delivered', included: true },
      { text: 'Full 200+ coin pair library', included: true },
      { text: 'Priority broadcast delivery', included: true },
      { text: '30-day signal history', included: true },
      { text: 'Referral program (30%)', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Get Monthly Pro',
    featured: true,
    label: 'Most Popular',
    color: 'purple',
    commission: '$12/mo recurring',
  },
  {
    tier: 'Smart Saver',
    title: 'Quarterly',
    price: '100',
    period: '/ quarter',
    tagline: '3 months of signals. Save 17%.',
    features: [
      { text: 'Everything in Monthly', included: true },
      { text: 'Full 200+ coin pair library', included: true },
      { text: '90-day signal history', included: true },
      { text: 'Referral program (30%)', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Get Quarterly',
    featured: false,
    color: 'slate',
    commission: '$30/qtr recurring',
    save: 'Save $20 vs monthly',
  },
  {
    tier: 'Best Value',
    title: '6 Months',
    price: '180',
    period: '/ 6 months',
    tagline: 'Half a year of signals. Save 25%.',
    features: [
      { text: 'Everything in Monthly', included: true },
      { text: '6-month signal archive', included: true },
      { text: 'Early V2 feature access', included: true },
      { text: 'Price lock guarantee', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Get 6 Months',
    featured: false,
    color: 'emerald',
    commission: '$54 per renewal',
    save: 'Save $60 vs monthly',
    label: 'New Plan',
  },
  {
    tier: 'Elite',
    title: 'Yearly',
    price: '350',
    period: '/ year',
    tagline: '12 months. Biggest savings.',
    features: [
      { text: 'Everything in 6 Months', included: true },
      { text: 'Full signal archive', included: true },
      { text: 'Dedicated onboarding call', included: true },
      { text: 'VIP support channel', included: true },
      { text: 'All future V2 features', included: true },
    ],
    cta: 'Get Yearly',
    featured: false,
    color: 'amber',
    commission: '$105/yr recurring',
    save: 'Save $130 vs monthly',
    label: 'Best Annual',
  },
];

export default function PricingPage() {
  const [referrals, setReferrals] = useState(25);
  const monthlyProPrice = 40;
  const commissionRate = 0.3;
  const earnings = Math.round(referrals * monthlyProPrice * commissionRate);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 pt-20 pb-16 text-center px-4">
        <div className="mx-auto max-w-7xl">
           <span className="mb-4 inline-block rounded-full bg-purple-light px-4 py-1 text-xs font-bold tracking-widest text-purple uppercase">Plans & Pricing</span>
           <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Simple pricing for every trader.</h1>
           <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">Every plan includes the complete signal format and automatic WhatsApp delivery. No hidden fees. Cancel anytime.</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 -mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-5">
           {plans.map((plan, i) => (
             <motion.div
               key={plan.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl ${
                 plan.featured ? 'border-2 border-purple ring-4 ring-purple/5 xl:scale-105 xl:z-10' : 'border border-slate-200'
               }`}
             >
               {plan.label && (
                 <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase shadow-lg ${
                   plan.color === 'purple' ? 'bg-purple' : plan.color === 'emerald' ? 'bg-emerald-600' : plan.color === 'amber' ? 'bg-amber-500' : 'bg-slate-900'
                 }`}>
                   {plan.label}
                 </div>
               )}

               <div className="mb-8">
                 <div className={`text-[10px] font-extrabold tracking-widest uppercase mb-2 ${
                   plan.color === 'purple' ? 'text-purple' : plan.color === 'emerald' ? 'text-emerald-600' : plan.color === 'amber' ? 'text-amber-600' : 'text-slate-400'
                 }`}>
                   {plan.tier}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900">{plan.title}</h3>
                 <p className="mt-3 text-sm text-slate-500 min-h-[40px] leading-relaxed">{plan.tagline}</p>
               </div>

               <div className="mb-8 flex items-baseline">
                 <span className="text-5xl font-black tracking-tighter text-slate-900">${plan.price}</span>
                 <span className="ml-1 text-sm font-bold text-slate-400">{plan.period}</span>
               </div>

               {plan.save && (
                 <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-500/10">
                   <Zap size={10} /> {plan.save}
                 </div>
               )}

               {plan.commission && (
                 <div className={`mb-6 rounded-xl p-3 text-[10px] sm:text-xs flex items-center gap-2 ${
                   plan.featured ? 'bg-purple/10 text-purple' : 'bg-slate-50 text-slate-600'
                 }`}>
                   <span>💰</span>
                   <span>Refer someone → earn <strong>{plan.commission}</strong></span>
                 </div>
               )}

               <div className="mt-2 space-y-4 flex-1">
                 {plan.features.map((feature, j) => (
                   <div key={j} className="flex items-start gap-3">
                     {feature.included ? (
                       <Check size={16} className="mt-0.5 shrink-0 text-emerald-500 font-bold" />
                     ) : (
                       <X size={16} className="mt-0.5 shrink-0 text-slate-300" />
                     )}
                     <span className={`text-[13px] leading-tight ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                       {feature.text}
                     </span>
                   </div>
                 ))}
               </div>

               <button className={`mt-10 rounded-full py-4 px-6 text-sm font-black transition-all active:scale-95 ${
                 plan.featured 
                   ? 'bg-purple text-white shadow-xl shadow-purple/20 hover:bg-purple-dark' 
                   : 'border-2 border-slate-200 text-slate-700 hover:border-purple hover:text-purple h-14'
               }`}>
                 {plan.cta}
               </button>
             </motion.div>
           ))}
        </div>

        {/* GUARANTEE ROW */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 rounded-3xl bg-white border border-slate-200 py-6 px-10">
           {[
             { icon: <Lock size={14} />, text: 'No credit card for trial' },
             { icon: <Check size={14} />, text: 'Cancel anytime' },
             { icon: <Smartphone size={14} />, text: 'Signals from day one' },
             { icon: <Gift size={14} />, text: '30% referral commission' },
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
               <span className="text-purple shrink-0">{item.icon}</span>
               {item.text}
             </div>
           ))}
        </div>

        {/* EARNINGS CALCULATOR - INTERACTIVE */}
        <div className="mt-24 mb-32">
          <div className="text-center mb-12">
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold tracking-widest text-emerald-700 uppercase">Referral ROI</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Calculate your upside.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">See how much you could earn by referring other traders to Valo AI.</p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[40px] bg-slate-900 p-10 overflow-hidden relative group">
               {/* Decorative glow */}
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-purple/20 blur-[80px] rounded-full group-hover:bg-purple/30 transition-all duration-700" />
               <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />

               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="mb-8">
                      <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Number of active referrals: <span className="text-white text-lg ml-2">{referrals}</span></label>
                      <input 
                        type="range" 
                        min="1" 
                        max="200" 
                        value={referrals} 
                        onChange={(e) => setReferrals(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple" 
                      />
                      <div className="flex justify-between mt-4">
                        <span className="text-xs font-bold text-slate-500">1 Referral</span>
                        <span className="text-xs font-bold text-slate-500">200 Referrals</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple/20 text-purple ring-1 ring-purple/40">📈</div>
                          <div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-tight">Referral Rate</div>
                            <div className="text-lg font-bold text-white">30% Lifetime</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/40">📅</div>
                          <div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-tight">Payout Schedule</div>
                            <div className="text-lg font-bold text-white">Every 30 Days</div>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-white/10 to-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm text-center">
                     <p className="text-sm font-bold text-purple-light uppercase tracking-widest mb-6">Your potential earnings</p>
                     <div className="mb-2 text-6xl font-black text-white tracking-tighter">${earnings}</div>
                     <p className="text-slate-400 font-bold mb-8">per month, recurring</p>
                     <div className="flex flex-col gap-3">
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-purple rounded-full shadow-[0_0_15px_rgba(108,53,222,0.5)] transition-all duration-300" style={{ width: `${(referrals/200)*100}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">Based on {referrals} referrals on the $40 Pro Plan</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* FULL COMPARISON TABLE */}
        <section className="mt-32">
           <div className="text-center mb-16">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">Compare core features.</h2>
           </div>
           
           <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="px-8 py-6 text-sm font-black text-slate-400 uppercase tracking-widest">Signal Features</th>
                         <th className="px-8 py-6 text-sm font-bold text-slate-900">Trial</th>
                         <th className="px-8 py-6 text-sm font-extrabold text-purple">Pro+</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {[
                        { f: 'Daily AI Analysis', t: true, p: true },
                        { f: 'WhatsApp Push Delivery', t: true, p: true },
                        { f: 'Full Signal Details', t: true, p: true },
                        { f: 'BTC/ETH Pairs', t: true, p: true },
                        { f: 'All Altcoin Pairs (200+)', t: false, p: true },
                        { f: 'Mid-Trade Alerts', t: false, p: true },
                        { f: 'Referral System Access', t: false, p: true },
                        { f: 'Priority Support Mode', t: false, p: true },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                           <td className="px-8 py-4 text-sm font-medium text-slate-600">{row.f}</td>
                           <td className="px-8 py-4">{row.t ? <Check className="text-green-500" size={18} /> : <X className="text-slate-300" size={18} />}</td>
                           <td className="px-8 py-4 font-bold text-slate-900">{row.p ? <Check className="text-purple font-bold" size={18} /> : <X className="text-slate-300" size={18} />}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
           </div>
        </section>

        {/* PRICING FAQ */}
        <section className="mt-32">
           <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900 mb-12 text-center">Frequently asked questions</h2>
              <div className="space-y-4">
                 {[
                   { q: 'Is there a contract or commitment?', a: 'No. You can cancel your subscription at any time. Your access will remain active until the end of your current billing period.' },
                   { q: 'What happens after my 7-day trial?', a: 'Your access will simply expire. We do not require a credit card for the trial, so you will not be charged automatically. You can then choose a paid plan to continue.' },
                   { q: 'When do I get my referral payouts?', a: 'Payouts are processed 30 days after the referral\'s payment to clear the refund window. You can withdraw your earnings once they exceed $50.' },
                 ].map((item, i) => (
                   <div key={i} className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                      <h4 className="text-lg font-bold text-slate-800 mb-3">{item.q}</h4>
                      <p className="text-slate-500 leading-relaxed text-sm">{item.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
