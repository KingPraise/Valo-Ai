import React from 'react';
import { Smartphone, Check, TrendingUp, AlertTriangle, Radio, History, User, CreditCard, Bell, HelpCircle } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';
import { Signal, SubscriptionStatus } from '../types';

function Overview() {
  const { userData } = useAuth();
  const [signals, setSignals] = React.useState<Signal[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const q = query(collection(db, 'signals'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSignals = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Signal[];
      setSignals(fetchedSignals);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'signals');
    });
    return () => unsubscribe();
  }, []);

  const latestSignal = signals[0];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Good morning, {userData?.firstName || 'Trader'} 👋</h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">Your Valo AI signal feed — signals are pushed automatically to your WhatsApp</p>
      </div>

      {/* WA LIVE BANNER */}
      <div className={`mb-6 flex flex-col gap-6 rounded-2xl border p-5 md:flex-row md:items-center relative ${
        userData?.whatsapp ? 'border-green-light bg-green-light/50' : 'border-amber-light bg-amber-light/50'
      }`}>
        <span className="text-3xl shrink-0">{userData?.whatsapp ? '📱' : '⚠️'}</span>
        <div className="flex-1">
          <div className={`text-[14.7px] font-bold ${userData?.whatsapp ? 'text-green' : 'text-amber-700'}`}>
            {userData?.whatsapp ? 'WhatsApp is connected and live ✓' : 'WhatsApp is not connected'}
          </div>
          <p className={`mt-0.5 text-[13px] leading-relaxed max-w-2xl font-medium ${userData?.whatsapp ? 'text-green opacity-80' : 'text-amber-600'}`}>
             {userData?.whatsapp ? (
               <>Signals are being pushed to <strong>{userData.whatsapp}</strong> automatically. <strong>You don't need to check this dashboard</strong> to receive signals.</>
             ) : (
               <>Please connect your WhatsApp number in settings to start receiving signals automatically.</>
             )}
          </p>
        </div>
        {userData?.whatsapp ? (
          <button className="shrink-0 rounded-full bg-[#25d366] px-5 py-2.5 text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#22c55e]">
            Open WhatsApp ↗
          </button>
        ) : (
          <Link to="/dashboard/whatsapp" className="shrink-0 rounded-full bg-amber text-white px-5 py-2.5 text-[13px] font-bold shadow-lg transition-all hover:bg-amber-600">
            Fix Connection ↗
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
         {[
           { label: 'Signals Received', val: signals.length, change: 'Lifetime', color: 'text-purple' },
           { label: 'Trial Status', val: userData?.status === 'trial' ? 'Active' : userData?.plan || 'Free', change: userData?.trialExpiresAt ? 'Limited trial' : 'Unlimited', color: 'text-green' },
           { label: 'WhatsApp', val: userData?.whatsapp ? 'Connected' : 'Offline', change: userData?.whatsapp ? 'Live' : 'Action req.', color: userData?.whatsapp ? 'text-green' : 'text-amber' },
           { label: 'Latest Signal', val: latestSignal ? `${latestSignal.pair} ${latestSignal.bias}` : 'No signals', change: latestSignal ? 'Delivered' : 'Waiting...' },
         ].map((kpi, i) => (
           <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
             <div className="text-[12px] font-semibold tracking-wider text-slate-400 uppercase mb-3">{kpi.label}</div>
             <div className={`text-[30.4px] font-extrabold mb-1 tracking-tighter ${kpi.color || 'text-slate-900'}`}>
               {kpi.val}
             </div>
             <div className={`text-[12.4px] font-bold ${kpi.color === 'text-green' ? 'text-green' : 'text-slate-400'}`}>{kpi.change}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
             <div className="px-5 py-4 flex items-center justify-between">
                <h3 className="text-[15.2px] font-bold text-slate-900">Latest Delivered Signal</h3>
             </div>
             <div className="px-5 pb-5">
                {latestSignal ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                      <span className="text-[17.6px] font-extrabold text-slate-900">{latestSignal.pair}</span>
                      <span className={`px-3 py-1 text-[11.5px] font-bold rounded-full uppercase tracking-wider border ${
                        latestSignal.bias === 'Long' ? 'bg-green-light text-green border-green/20' : 'bg-red-light text-red border-red/20'
                      }`}>{latestSignal.bias}</span>
                    </div>
                    
                    <div className="space-y-2">
                       {[
                         { k: 'Entry Zone', v: latestSignal.entryZone },
                         { k: 'Stop Loss', v: latestSignal.stopLoss, c: 'text-red' },
                         ...latestSignal.takeProfits.map((tp, idx) => ({ k: `Take Profit ${idx + 1}`, v: tp, c: 'text-blue-sig' })),
                         { k: 'Leverage', v: latestSignal.leverage },
                         { k: 'Duration', v: latestSignal.duration },
                         { k: 'Risk Rule', v: latestSignal.riskRule || 'Standard', c: 'text-amber' },
                         { k: 'Price at Signal', v: latestSignal.priceAtSignal || 'N/A' },
                       ].map((row, i) => (
                         <div key={i} className="flex justify-between border-b border-slate-100 last:border-0 py-1.5 flex-wrap gap-2">
                           <span className="text-[13.6px] font-medium text-slate-500">{row.k}</span>
                           <span className={`text-[12.8px] font-bold font-mono ${row.c || 'text-slate-900'}`}>{row.v}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-10 text-center text-slate-400 font-bold border border-dashed border-slate-200">
                    Waiting for next market movement...
                  </div>
                )}
             </div>
           </div>

           <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
             <div className="px-5 py-4">
                <h3 className="text-[15.2px] font-bold text-slate-900">Signal History</h3>
             </div>
             <div className="px-5 pb-5 space-y-2">
                {signals.slice(1).map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl bg-slate-50 hover:border-purple/30 transition-all flex-wrap sm:flex-nowrap">
                     <span className="text-[14px] font-bold w-24 text-slate-900 shrink-0">{h.pair}</span>
                     <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-tighter shrink-0 border ${
                       h.bias === 'Long' ? 'bg-green-light text-green border-green/20' : 'bg-red-light text-red border-red/20'
                     }`}>{h.bias}</span>
                     <span className="flex-1 text-[12.5px] font-medium text-slate-500 truncate">{h.entryZone} · {h.leverage}</span>
                     <span className="text-[11.5px] font-bold text-slate-400 whitespace-nowrap">
                        {h.createdAt?.toDate ? h.createdAt.toDate().toLocaleDateString() : 'Recent'}
                     </span>
                  </div>
                ))}
                {signals.length <= 1 && (
                   <div className="py-10 text-center text-slate-400 text-sm font-medium">No signal history yet.</div>
                )}
             </div>
           </div>
        </div>

        <div className="space-y-5">
           {/* PLAN CARD */}
           <div className="rounded-2xl bg-linear-to-br from-purple to-purple-dark p-6 text-white shadow-xl shadow-purple/20">
              <span className="mb-3 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11.2px] font-bold uppercase tracking-wider">
                {userData?.plan === 'free' ? 'Trial Plan' : `${userData?.plan} Plan`}
              </span>
              <h3 className="text-[17.6px] font-extrabold mb-1">
                {userData?.plan === 'free' ? 'Valo Pro Trial' : `Subscription: ${userData?.plan}`}
              </h3>
              <p className="text-[12.5px] opacity-75 mb-6">
                Status: <span className="capitalize">{userData?.status || 'Active'}</span>
              </p>
              
              <div className="mb-6 border-t border-white/15 pt-4">
                 <div className="text-[32px] font-extrabold tracking-tighter leading-none">{signals.length}</div>
                 <div className="text-[12px] opacity-70 mt-1">signals delivered to your account</div>
              </div>
              
              <Link to="/pricing" className="block w-full rounded-lg bg-white py-2.5 text-center text-[13.6px] font-bold text-purple transition-all hover:bg-purple-light">
                {userData?.plan === 'free' ? 'Upgrade to Pro →' : 'Manage Subscription →'}
              </Link>
           </div>

           {/* WA STATUS */}
           <div className="bg-green-light border border-green/20 rounded-2xl p-5">
              <div className="text-[14px] font-bold text-green flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" /> WhatsApp Delivery Active
              </div>
              <div className="text-[13.1px] font-mono text-green bg-green/10 px-2.5 py-1 rounded inline-block mb-3">+1 (234) *** **00</div>
              <p className="text-[12.8px] text-green opacity-80 leading-relaxed mb-4">Your number is connected and receiving signals automatically. No action needed — signals are pushed the moment they are identified.</p>
              <button className="w-full py-2.5 bg-[#25d366] text-white rounded-lg text-[13.6px] font-bold hover:bg-[#22c55e] transition-colors">Open WhatsApp ↗</button>
           </div>

           {/* REFERRAL PROMO */}
           <div className="rounded-2xl border border-purple/20 bg-linear-to-br from-white to-purple-light/30 p-5 shadow-xs">
              <h3 className="text-[15.2px] font-bold text-slate-900 mb-4 flex items-center justify-between">Referral Program <span className="text-[12px] font-normal text-slate-400">Earn 30% recurring</span></h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start text-[13.1px] text-slate-600">
                  <span className="text-base text-purple shrink-0">🎁</span>
                  <span>Share your link and earn <strong className="text-slate-900">30% cash</strong> every time a referral pays.</span>
                </div>
                <div className="flex gap-3 items-start text-[13.1px] text-slate-600">
                  <span className="text-base text-green shrink-0">💸</span>
                  <span>Monthly = <strong className="text-slate-900">$12</strong> · Quarterly = <strong className="text-slate-900">$30</strong> · Yearly = <strong className="text-slate-900">$105</strong></span>
                </div>
                <button onClick={() => window.location.href='/referral'} className="w-full py-2 bg-purple text-white rounded-lg text-[12.8px] font-bold hover:bg-purple-dark transition-colors">
                  Open referral dashboard →
                </button>
              </div>
           </div>

           {/* SIGNAL RULES */}
           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-[15.2px] font-bold text-slate-900 mb-4">Signal Rules</h3>
              <ul className="space-y-3 px-1">
                {[
                  { icon: '📬', text: 'Signals are pushed automatically — no action needed' },
                  { icon: '⚠️', text: 'Max 2 simultaneous trades · total 20% capital' },
                  { icon: '✓', text: 'Scale out at TP1 — let rest run to TP2 and TP3', c: 'text-green' },
                  { icon: '✗', text: 'Always set your stop loss immediately after entry', c: 'text-red' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-[13.1px] text-slate-600">
                    <span className={`text-sm shrink-0 leading-none mt-0.5 ${item.c || ''}`}>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    </>
  );
}

function PlaceholderPanel({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl bg-white">
      <div className="mb-6 p-6 rounded-2xl bg-slate-50 text-slate-400">
        {icon}
      </div>
      <h2 className="text-xl font-black text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 text-sm max-w-xs text-center font-medium">This section is being updated with live data. Check back in a few minutes.</p>
    </div>
  );
}

function WhatsAppSetup() {
  const { userData } = useAuth();
  const [whatsapp, setWhatsapp] = React.useState(userData?.whatsapp || '');
  const [country, setCountry] = React.useState(userData?.country || '');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        whatsapp,
        country
      });
      setStatus('WhatsApp connection updated successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
        <Smartphone className="text-purple" /> Connect WhatsApp
      </h2>
      
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="mb-8 p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-500/10 text-sm font-medium">
           This is where your signals will arrive. Ensure your number is active and capable of receiving WhatsApp messages.
        </div>

        {status && (
           <div className="mb-6 p-4 bg-green-light text-green text-xs font-bold rounded-xl border border-green/10">
             {status}
           </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">WhatsApp Number</label>
            <div className="flex">
              <div className="flex items-center gap-1 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-400">🌍 +</div>
              <input 
                type="tel" 
                className="w-full rounded-r-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all" 
                placeholder="1 234 567 8900" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Country</label>
            <input 
              type="text" 
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-purple outline-hidden" 
              placeholder="e.g. United Kingdom" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button 
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-linear-to-r from-purple to-purple-dark text-white py-4 rounded-xl font-black text-[14.4px] shadow-xl shadow-purple/20 hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update Connection'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePanel() {
  const { userData } = useAuth();
  const [firstName, setFirstName] = React.useState(userData?.firstName || '');
  const [lastName, setLastName] = React.useState(userData?.lastName || '');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        firstName,
        lastName
      });
      setStatus('Profile updated successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
        <User className="text-purple" /> User Profile
      </h2>
      
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        {status && (
           <div className="mb-6 p-4 bg-green-light text-green text-xs font-bold rounded-xl border border-green/10">
             {status}
           </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">First Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-hidden focus:border-purple" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Last Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-hidden focus:border-purple" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address (Locked)</label>
            <input 
              type="text" 
              className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-400 cursor-not-allowed" 
              value={userData?.email || ''} 
              disabled 
            />
          </div>

          <button 
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-[14.4px] transition-all hover:bg-black disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="feed" element={<Overview />} />
        <Route path="history" element={<Overview />} />
        <Route path="whatsapp" element={<WhatsAppSetup />} />
        <Route path="profile" element={<ProfilePanel />} />
        <Route path="billing" element={<PlaceholderPanel title="Billing & Subscription" icon={<CreditCard size={48} />} />} />
        <Route path="notifications" element={<PlaceholderPanel title="Notifications" icon={<Bell size={48} />} />} />
        <Route path="help" element={<PlaceholderPanel title="Help Center" icon={<HelpCircle size={48} />} />} />
      </Routes>
    </DashboardLayout>
  );
}

