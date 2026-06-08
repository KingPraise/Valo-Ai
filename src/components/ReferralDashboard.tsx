import React, { useState } from 'react';
import { Gift, Copy, Share2, DollarSign, Users, Award, ExternalLink, MessageSquare, Send, Twitter } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

import { useAuth } from '../context/AuthContext';
import { UserData } from '../types';

export default function ReferralDashboard() {
  const { userData } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [payoutLoading, setPayoutLoading] = React.useState(false);
  const [payoutStatus, setPayoutStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!userData?.referralCode) return;
    // Mock data for referrals
    setReferrals([]);
    setLoading(false);
  }, [userData?.referralCode]);

  const referralLink = `https://valoai.app/signup?ref=${userData?.referralCode || ''}`;
  
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayoutRequest = async () => {
    if (!userData || !userData.balance || userData.balance < 20) return;
    setPayoutLoading(true);
    try {
      // Mock payout request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPayoutStatus('Payout request submitted successfully!');
    } catch (error) {
      console.error(error);
    } finally {
      setPayoutLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* HERO */}
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-linear-to-br from-purple to-purple-dark p-8 text-white shadow-xl shadow-purple/20">
        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11.2px] font-bold tracking-wider uppercase text-white">
              🎁 Referral Program
            </div>
            <h2 className="text-[24px] font-extrabold tracking-tight text-white mb-2">
               Earn <span className="text-amber-400">30% cash</span> for every trader you refer.
            </h2>
            <p className="text-[14px] text-white/70 leading-relaxed max-w-lg mb-6">
              Share your link. When someone subscribes to any paid plan, you earn 30% of every payment — recurring forever. No cap.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {['$12/mo · Monthly', '$30/qtr · Quarterly', '$54 · 6 Months', '$105/yr · Yearly'].map((tag, i) => (
                <div key={i} className="bg-white/12 border border-white/20 text-white text-[12px] font-semibold px-3 py-1 rounded-full">{tag}</div>
              ))}
            </div>

            <div className="rounded-xl bg-white/10 border border-white/20 p-4 max-w-md">
               <div className="text-[11.2px] font-bold uppercase text-white/55 tracking-wider mb-2 px-1">Your Referral Link</div>
                <div className="flex gap-2 mb-2">
                  <input 
                    readOnly 
                    value={referralLink}
                    className="flex-1 rounded-lg bg-white/15 border border-white/25 px-3 py-2.5 text-[12.8px] font-mono text-white outline-hidden"
                  />
                  <button 
                    onClick={copyLink}
                    className="shrink-0 rounded-lg bg-white px-4 py-2 text-[12.8px] font-bold text-purple hover:bg-slate-50 transition-all"
                  >
                    {copied ? '✓ Copied!' : 'Copy link'}
                  </button>
               </div>
               <div className="flex gap-1.5">
                  <button className="flex-1 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-[11.8px] font-semibold hover:bg-white/20 transition-all">💬 WhatsApp</button>
                  <button className="flex-1 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-[11.8px] font-semibold hover:bg-white/20 transition-all">✈️ Telegram</button>
                  <button className="flex-1 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-[11.8px] font-semibold hover:bg-white/20 transition-all">𝕏 Twitter</button>
               </div>
            </div>
          </div>
          
          <div className="text-center shrink-0 hidden lg:block">
             <div className="text-[60.8px] font-extrabold text-amber-400 tracking-tighter leading-none">30%</div>
             <p className="text-[12.1px] font-semibold text-white/50 mt-1 uppercase tracking-wider">recurring commission<br/>no cap · no expiry</p>
          </div>
        </div>
      </div>

      {/* PAYOUT BANNER */}
      <div className="mb-6 rounded-2xl border border-green/20 bg-green-light/50 p-5 flex flex-col sm:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <span className="text-3xl">💸</span>
            <div>
               <div className="text-[14.4px] font-bold text-green">${userData?.balance?.toFixed(2) || '0.00'} available to withdraw</div>
               <p className="text-[12.8px] text-green opacity-80 mt-0.5">
                 {userData?.balance && userData.balance >= 20 
                   ? 'Your balance has passed the $20 minimum. Withdraw via PayPal, bank transfer, or USDT.' 
                   : 'You need a minimum of $20.00 to request a payout.'}
               </p>
               {payoutStatus && (
                 <p className="text-[12px] font-bold text-green mt-2">{payoutStatus}</p>
               )}
            </div>
         </div>
         <button 
           onClick={handlePayoutRequest}
           disabled={payoutLoading || (userData?.balance || 0) < 20}
           className="rounded-full bg-green px-5 py-2 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-green-dark disabled:opacity-50 disabled:grayscale"
         >
            {payoutLoading ? 'Requesting...' : 'Request payout →'}
         </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         {[
           { label: 'Total Earned', val: `$${userData?.totalEarnings?.toFixed(2) || '0.00'}`, sub: 'All time', color: 'text-purple', border: 'border-t-3 border-purple' },
           { label: 'Pending', val: `$${userData?.pendingEarnings?.toFixed(2) || '0.00'}`, sub: 'Payment processing', color: 'text-amber', border: 'border-t-3 border-amber' },
           { label: 'Total Paid Out', val: `$${userData?.totalPaidOut?.toFixed(2) || '0.00'}`, sub: 'Cleared requests', color: 'text-green', border: 'border-t-3 border-green' },
           { label: 'Active Referrals', val: referrals.filter(r => r.status === 'active').length.toString(), sub: 'Paid subscribers', color: 'text-blue-sig', border: 'border-t-3 border-blue-sig' },
         ].map((stat, i) => (
           <div key={i} className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-xs ${stat.border}`}>
             <div className="text-[12px] font-semibold tracking-wider text-slate-400 uppercase mb-3">{stat.label}</div>
             <div className={`text-[25.6px] font-extrabold mb-1 tracking-tighter ${stat.color}`}>{stat.val}</div>
             <div className="text-[11.5px] font-bold text-slate-400">{stat.sub}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="text-[15.2px] font-bold text-slate-900">Your Referrals</h3>
                 <div className="flex gap-1.5">
                    <button className="px-3 py-1 rounded-md text-[11px] font-bold bg-purple-light text-purple uppercase tracking-wider">All (6)</button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-bold text-slate-400 border border-slate-200 uppercase tracking-wider hover:bg-slate-50">Active</button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-bold text-slate-400 border border-slate-200 uppercase tracking-wider hover:bg-slate-50">Trial</button>
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-[13.6px]">
                    <thead className="bg-slate-50 border-b border-slate-100">
                       <tr>
                          <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Subscriber</th>
                          <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Plan</th>
                          <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Status</th>
                          <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px] text-right">You Earn</th>
                          <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px] text-right">Next Payment</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {referrals.map((ref, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-4">
                               <div className="text-slate-900 font-bold">{ref.firstName} {ref.lastName}</div>
                               <div className="text-[12px] text-slate-400 font-medium">{ref.email}</div>
                            </td>
                            <td className="px-5 py-4 text-slate-600 font-medium capitalize">{ref.plan}</td>
                            <td className="px-5 py-4 shrink-0">
                               <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full uppercase border ${
                                 ref.status === 'active' || ref.status === 'trial' ? 'bg-green-light text-green border-green/20' : 'bg-slate-100 text-slate-400 border-slate-200'
                               }`}>
                                 {ref.status}
                               </span>
                            </td>
                            <td className="px-5 py-4 text-right font-mono font-bold text-green">
                               {ref.plan === 'pro' ? '$12.00/mo' : ref.plan === 'quarterly' ? '$30.00/qtr' : ref.plan === 'yearly' ? '$105.00/yr' : '$0.00'}
                            </td>
                            <td className="px-5 py-4 text-right text-[12px] text-green font-bold whitespace-nowrap">
                               {ref.status === 'active' ? 'Recurring' : 'Trialing'}
                            </td>
                         </tr>
                       ))}
                       {referrals.length === 0 && !loading && (
                         <tr>
                           <td colSpan={5} className="px-5 py-20 text-center text-slate-400 font-medium italic">No referrals found yet. Share your link to start earning!</td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-[14px] font-bold text-slate-900 mb-5">🚀 How it works</h3>
              <ul className="space-y-5">
                 {[
                   { step: 1, title: 'Share your link', desc: 'Post on social media, WhatsApp groups, or send to friends.' },
                   { step: 2, title: 'They subscribe', desc: 'You get credited 30% of their payment automatically.' },
                   { step: 3, title: 'Earn recurring', desc: 'Keep receiving 30% every time they renew. No cap.' },
                   { step: 4, title: 'Withdraw at $20', desc: 'PayPal, bank transfer, or USDT. Paid in 3–5 days.' },
                 ].map((item, i) => (
                   <li key={i} className="flex gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-light text-[11.2px] font-extrabold text-purple">
                        {item.step}
                      </div>
                      <div>
                         <h4 className="text-[13.1px] font-bold text-slate-900 mb-0.5">{item.title}</h4>
                         <p className="text-[12.8px] font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
