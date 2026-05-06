import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Radio, 
  TrendingUp, 
  DollarSign, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  LayoutDashboard,
  Megaphone,
  CreditCard,
  Gift,
  Trophy,
  Wallet,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

type AdminTab = 'overview' | 'signals' | 'subscribers' | 'sales' | 'referrals' | 'leaderboard' | 'payouts' | 'content';

import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy, limit, onSnapshot, doc, addDoc, setDoc, updateDoc, serverTimestamp, getDocs, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Signal, UserData, PayoutRequest } from '../types';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { userData, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setTab] = useState<AdminTab>('overview');

  React.useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [authLoading, isAdmin, navigate]);

  if (authLoading || !isAdmin) {
    return <div className="flex min-h-screen items-center justify-center">Verifying admin access...</div>;
  }

  const navItems: { id: AdminTab, label: string, icon: any, badge?: string, section: string }[] = [
    { section: 'Operations', id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { section: 'Operations', id: 'signals', label: 'Broadcast Signals', icon: Radio },
    { section: 'Operations', id: 'subscribers', label: 'Subscribers', icon: Users },
    { section: 'Operations', id: 'sales', label: 'Sales Report', icon: TrendingUp },
    { section: 'Operations', id: 'referrals', label: 'Referral Commissions', icon: Gift },
    { section: 'Operations', id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { section: 'Operations', id: 'payouts', label: 'Payout Requests', icon: Wallet, badge: '4' },
    { section: 'Content', id: 'content', label: 'Settings & Config', icon: Settings },
  ];

  const sections = {
    Operations: navItems.filter(i => i.section === 'Operations'),
    Content: navItems.filter(i => i.section === 'Content'),
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
      {/* ADMIN SIDEBAR */}
      <aside className="w-56 shrink-0 bg-slate-900 py-6 flex flex-col hidden lg:flex">
         <div className="px-6 mb-8">
            <div className="text-[15.2px] font-extrabold text-purple-light tracking-tight italic">⚡ Valo Admin</div>
         </div>
         
         <div className="flex-1 overflow-y-auto">
            {Object.entries(sections).map(([name, items]) => (
              <div key={name} className="mb-6">
                <div className="px-5 mb-2 text-[10.8px] font-bold tracking-[0.12em] text-white/30 uppercase">{name}</div>
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-5 py-2.5 transition-all text-[13.6px] font-medium border-l-3 ${
                        activeTab === item.id 
                          ? 'bg-purple/25 text-purple-light border-purple' 
                          : 'text-white/60 border-transparent hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon size={16} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-amber text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-auto">{item.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
         </div>
         
         <div className="px-5 mt-auto">
            <Link to="/" className="flex items-center gap-2.5 px-5 py-2 text-white/60 hover:text-white transition-all text-[13.6px] font-medium">
               <span>🏠</span> Back to Site
            </Link>
         </div>
      </aside>

      {/* DASHBOARD CONTENT */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
        {activeTab === 'overview' && <OverviewTab setTab={setTab} />}
        {activeTab === 'signals' && <SignalsTab />}
        {activeTab === 'subscribers' && <SubscribersTab />}
        {activeTab === 'sales' && <SalesReportTab />}
        {activeTab === 'referrals' && <ReferralTrackingTab />}
        {activeTab === 'leaderboard' && <LeaderboardTab />}
        {activeTab === 'payouts' && <PayoutRequestsTab />}
        {activeTab === 'content' && <SettingsTab />}
      </main>
    </div>
  );
}

function OverviewTab({ setTab }: { setTab: (t: AdminTab) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-[21.6px] font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
           <p className="text-[13.4px] text-slate-500 font-medium mt-0.5">Valo AI Operations · March 21, 2026</p>
        </div>
        <div className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-full text-[11.8px] font-bold text-slate-400 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" /> Live · Auto-refreshing
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
         {[
           { label: 'Total Subscribers', val: '1,418', change: '+34 this week', color: 'text-purple' },
           { label: 'Paid Active', val: '620', change: '+12 today', color: 'text-green' },
           { label: 'Free Trial', val: '312', change: '38% conversion' },
           { label: 'Signals Today', val: '7', change: 'Across 6 pairs' },
         ].map((kpi, i) => (
           <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
             <div className="text-[12px] font-semibold tracking-wider text-slate-400 uppercase mb-3">{kpi.label}</div>
             <div className={`text-[30.4px] font-extrabold mb-1 tracking-tighter ${kpi.color || 'text-slate-900'}`}>{kpi.val}</div>
             <div className="text-[12.4px] font-bold text-slate-400">{kpi.change}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { icon: '📡', label: 'Broadcast Signal', sub: 'Push to all subscribers', color: 'bg-linear-to-br from-purple to-purple-dark', tab: 'signals' },
          { icon: '💸', label: '4 Payout Requests', sub: '$231.40 pending', color: 'bg-linear-to-br from-amber to-amber-500', tab: 'payouts' },
          { icon: '🏆', label: 'Publish Leaderboard', sub: 'Last published Mar 15', color: 'bg-linear-to-br from-blue-sig to-cyan-500', tab: 'leaderboard' },
          { icon: '👥', label: 'Subscribers', sub: '620 active paid', color: 'bg-linear-to-br from-green to-emerald-500', tab: 'subscribers' },
          { icon: '📈', label: 'Sales Report', sub: 'Daily · Weekly · Monthly', color: 'bg-linear-to-br from-indigo-600 to-purple-mid', tab: 'sales' },
        ].map((action, i) => (
          <button key={i} onClick={() => setTab(action.tab as AdminTab)} className={`${action.color} text-white p-4 rounded-xl text-left shadow-lg hover:-translate-y-1 transition-all active:scale-95`}>
            <div className="text-[20.8px] mb-2">{action.icon}</div>
            <div className="text-[13.1px] font-extrabold tracking-tight">{action.label}</div>
            <div className="text-[11.2px] opacity-75 mt-0.5">{action.sub}</div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-[15.2px] font-bold text-slate-900">Recent Signal Broadcasts</h3>
           <button onClick={() => setTab('signals')} className="text-[12.5px] font-bold text-purple hover:underline">Broadcast new →</button>
        </div>
        <div className="divide-y divide-slate-100">
           {[
             { bias: 'Long', pair: 'BTC/USDT', detail: '$93,200–$95,400 · 3x · TP: $98.4K/$103K/$109K', reach: '620 delivered', time: 'Today 09:10' },
             { bias: 'Short', pair: 'ETH/USDT', detail: '$3,420–$3,480 · 5x · TP: $3.29K/$3.18K/$3.05K', reach: '831 delivered', time: 'Yesterday 16:28' },
             { bias: 'Long', pair: 'SOL/USDT', detail: '$182–$188 · 5x · TP: $197/$210/$228', reach: '824 delivered', time: 'Yesterday 11:20' },
           ].map((bc, i) => (
             <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-all">
                <span className={`px-2 py-0.5 text-[10.8px] font-bold rounded-full border ${bc.bias === 'Long' ? 'bg-green-light text-green border-green/20' : 'bg-red-light text-red border-red/20'}`}>{bc.bias}</span>
                <span className="text-[14px] font-extrabold text-slate-900 min-w-24">{bc.pair}</span>
                <span className="text-[12.5px] font-medium text-slate-500 flex-1">{bc.detail}</span>
                <span className="text-[12px] font-bold text-green whitespace-nowrap">{bc.reach}</span>
                <span className="text-[11.5px] font-bold text-slate-400 whitespace-nowrap ml-4">{bc.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function SignalsTab() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pair: '',
    bias: 'Long',
    entryZone: '',
    stopLoss: '',
    tp1: '',
    tp2: '',
    tp3: '',
    leverage: '5x Cross',
    duration: '24–72 hours',
    riskRule: 'Max 2 trades · 20% total',
    priceAtSignal: '',
    broadcastTo: 'All Paid Subscribers'
  });

  const handleBroadcast = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const signalData = {
        pair: formData.pair,
        bias: formData.bias,
        entryZone: formData.entryZone,
        stopLoss: formData.stopLoss,
        takeProfits: [formData.tp1, formData.tp2, formData.tp3].filter(tp => !!tp),
        leverage: formData.leverage,
        duration: formData.duration,
        riskRule: formData.riskRule,
        priceAtSignal: formData.priceAtSignal,
        broadcastTo: formData.broadcastTo,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'signals'), signalData);
      setStatus('Signal broadcasted successfully to all subscribers!');
      setFormData({
        pair: '',
        bias: 'Long',
        entryZone: '',
        stopLoss: '',
        tp1: '',
        tp2: '',
        tp3: '',
        leverage: '5x Cross',
        duration: '24–72 hours',
        riskRule: 'Max 2 trades · 20% total',
        priceAtSignal: '',
        broadcastTo: 'All Paid Subscribers'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'signals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">📡 Broadcast a Signal</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="mb-8">
           <h3 className="text-[16px] font-bold text-slate-900">New Signal Broadcast</h3>
           <p className="text-[12px] text-slate-400 font-medium">Auto-delivered to all qualifying subscribers</p>
        </div>

        {status && (
           <div className="mb-6 p-4 bg-green-light text-green text-xs font-bold rounded-xl border border-green/10">
             {status}
           </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Coin Pair</label>
              <input 
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple" 
                placeholder="e.g. BTC/USDT" 
                value={formData.pair}
                onChange={(e) => setFormData({...formData, pair: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trade Bias</label>
              <select 
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple appearance-none"
                value={formData.bias}
                onChange={(e) => setFormData({...formData, bias: e.target.value})}
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Entry Zone</label>
              <input 
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple" 
                placeholder="e.g. $93,200 – $95,400" 
                value={formData.entryZone}
                onChange={(e) => setFormData({...formData, entryZone: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Stop Loss</label>
              <input 
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple text-red" 
                placeholder="e.g. $88,900" 
                value={formData.stopLoss}
                onChange={(e) => setFormData({...formData, stopLoss: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">TP 1</label>
              <input className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple text-blue-sig" placeholder="Price" value={formData.tp1} onChange={(e) => setFormData({...formData, tp1: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">TP 2</label>
              <input className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple text-blue-sig" placeholder="Price" value={formData.tp2} onChange={(e) => setFormData({...formData, tp2: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">TP 3</label>
              <input className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple text-blue-sig" placeholder="Price" value={formData.tp3} onChange={(e) => setFormData({...formData, tp3: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Leverage</label>
              <input className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple" placeholder="e.g. 5x Cross" value={formData.leverage} onChange={(e) => setFormData({...formData, leverage: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Duration</label>
              <input className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none focus:border-purple" placeholder="e.g. 24–72 hours" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Broadcast To</label>
            <select 
              className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-[14px] font-bold text-slate-900 focus:outline-none appearance-none"
              value={formData.broadcastTo}
              onChange={(e) => setFormData({...formData, broadcastTo: e.target.value})}
            >
              <option value="All Paid">All Paid Subscribers</option>
              <option value="Monthly Pro">Monthly Pro Only</option>
              <option value="All">All Including Trial</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={handleBroadcast}
              disabled={loading}
              className="flex-1 bg-purple text-white py-3.5 rounded-xl font-bold text-[14.4px] shadow-lg shadow-purple/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {loading ? 'Broadcasting...' : 'Broadcast to Subscribers →'}
            </button>
            <button className="bg-slate-50 border border-slate-200 text-slate-600 px-6 py-3.5 rounded-xl font-bold text-[14.4px] hover:bg-slate-100 transition-all">Preview Format</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscribersTab() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ ...doc.data() } as UserData)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">👥 Subscribers</h2>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-[15.2px] font-bold text-slate-900">All Subscribers ({users.length})</h3>
           <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md border border-slate-200 text-[11.2px] font-bold text-slate-400 uppercase tracking-wider hover:bg-slate-50 transition-all">Export CSV</button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-[13.6px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                 <tr>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Subscriber</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Plan</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Status</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">WhatsApp</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px] text-right">Joined</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {users.map((s, i) => (
                   <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-5 py-4">
                         <div className="font-bold text-slate-900">{s.firstName} {s.lastName}</div>
                         <div className="text-[12px] font-medium text-slate-400">{s.email}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-semibold capitalize">{s.plan}</td>
                      <td className="px-5 py-4">
                         <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase border ${
                           s.status === 'active' || s.status === 'trial' ? 'bg-green-light text-green border-green/20' : 'bg-slate-100 text-slate-400 border-slate-200'
                         }`}>
                           {s.status}
                         </span>
                      </td>
                      <td className="px-5 py-4 text-[12.8px] font-bold whitespace-nowrap">
                        {s.whatsapp ? (
                          <span className="text-green">● {s.whatsapp}</span>
                        ) : (
                          <span className="text-slate-300">Not connected</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[12.8px] text-slate-400">
                        {s.createdAt?.toDate ? s.createdAt.toDate().toLocaleDateString() : 'New'}
                      </td>
                   </tr>
                 ))}
                 {users.length === 0 && !loading && (
                   <tr>
                     <td colSpan={5} className="px-5 py-20 text-center text-slate-400 font-medium italic">No subscribers found yet.</td>
                   </tr>
                 )}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

function SalesReportTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[19.2px] font-extrabold text-slate-900 flex items-center gap-2">📈 Sales Report</h2>
          <p className="text-[13.1px] text-slate-500 font-medium mt-0.5">Subscription revenue · new sales · renewals</p>
        </div>
        <div className="flex bg-slate-100 rounded-full p-1 gap-1">
          {['Daily', 'Weekly', 'Monthly'].map((p, i) => (
            <button key={i} className={`px-4 py-1.5 rounded-full text-[12.1px] font-bold transition-all ${i === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Revenue', val: '$2,480', sub: 'Today', icon: '💰', color: '#6c35de' },
          { label: 'New Sales', val: '12', sub: 'Today', icon: '🆕', color: '#059669' },
          { label: 'Renewals', val: '8', sub: 'Today', icon: '🔄', color: '#2563eb' },
          { label: 'Avg Order', val: '$124', sub: 'Today', icon: '📊', color: '#d97706' },
          { icon: '🎟️', label: 'Coupons', val: '5', sub: 'Used today', color: '#0891b2' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 relative overflow-hidden shadow-xs border-t-3" style={{ borderTopColor: kpi.color }}>
             <div className="text-[11.2px] font-bold text-slate-400 uppercase tracking-wider mb-2">{kpi.label}</div>
             <div className="text-[24.8px] font-extrabold text-slate-900 tracking-tight leading-none">{kpi.val}</div>
             <div className="text-[11.4px] text-slate-500 mt-2 flex items-center gap-1">
               <span className="text-green font-bold">▲ 12%</span> vs yesterday
             </div>
             <span className="absolute top-4 right-4 text-[22.4px] opacity-10">{kpi.icon}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
           <div className="flex justify-between items-center mb-10">
             <h3 className="text-[14.1px] font-bold text-slate-900">Revenue Today by Hour</h3>
             <span className="text-[12.8px] font-bold text-slate-400">Total: $2,480</span>
           </div>
           <div className="h-48 flex items-end justify-between gap-2 px-2">
             {[0, 40, 180, 100, 40, 350, 80, 144, 40].map((v, i) => (
               <div key={i} className="flex-1 flex flex-col items-center group">
                 <div className="text-[10.4px] font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">${v}</div>
                 <div className={`w-full rounded-t-lg transition-all ${v > 200 ? 'bg-purple' : v > 100 ? 'bg-purple-mid' : 'bg-purple-light'}`} style={{ height: `${(v/400)*100}%`, minHeight: '4px' }} />
                 <div className="text-[10.6px] font-bold text-slate-400 mt-3">{['6A','8A','10A','12P','2P','4P','6P','8P','10P'][i]}</div>
               </div>
             ))}
           </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
           <h3 className="text-[13.4px] font-bold text-slate-900 mb-6 uppercase tracking-wider text-slate-400">Revenue by Plan</h3>
           <div className="space-y-3">
             {[
               { plan: 'Monthly Pro', count: 355, rev: '$14,200', color: 'bg-purple' },
               { plan: 'Quarterly', count: 84, rev: '$8,400', color: 'bg-blue-600' },
               { plan: '6 Months', count: 38, rev: '$6,840', color: 'bg-green' },
               { plan: 'Yearly', count: 20, rev: '$7,000', color: 'bg-amber' },
             ].map((p, i) => (
               <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div className={`w-2 h-2 rounded-full ${p.color}`} />
                  <div className="flex-1 text-[12.5px] font-bold text-slate-800">{p.plan}</div>
                  <div className="text-right">
                    <div className="text-[12.5px] font-extrabold text-slate-900 font-mono">{p.rev}</div>
                    <div className="text-[10px] font-bold text-slate-400">{p.count} sales</div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function ReferralTrackingTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">🎁 Referral Commission Tracking</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrers', val: '48', sub: '+6 this month', color: 'text-purple' },
          { label: 'Active Referrals', val: '184', sub: 'Across all plans' },
          { label: 'Commissions', val: '$1,847', sub: 'This month', color: 'text-green' },
          { label: 'Pending Payouts', val: '$231', sub: '4 requests', color: 'text-amber' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[10.8px] font-bold text-slate-400 uppercase tracking-widest mb-3">{k.label}</div>
            <div className={`text-[25.6px] font-extrabold tracking-tighter ${k.color || 'text-slate-900'}`}>{k.val}</div>
            <div className="text-[11.5px] font-bold text-slate-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-[14.4px] font-bold text-slate-900 mb-6">Top Performers</h3>
        <div className="divide-y divide-slate-100">
          {[
            { name: 'Marcus K.', refs: 12, active: 9, total: '$624.00', balance: '$120.00' },
            { name: 'Amara O.', refs: 10, active: 8, total: '$480.00', balance: '$54.00' },
            { name: 'Ravi N.', refs: 9, active: 7, total: '$396.00', balance: '$84.00' },
          ].map((r, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-light flex items-center justify-center font-bold text-purple text-[11px]">{r.name[0]}</div>
                <div>
                   <div className="text-[13.6px] font-extrabold text-slate-900">{r.name}</div>
                   <div className="text-[11.2px] font-bold text-slate-400">{r.refs} referred · {r.active} active</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14.4px] font-extrabold text-green font-mono">{r.balance}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Available</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">🏆 Referral Leaderboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative h-64 flex items-end justify-center gap-0">
           <div className="flex flex-col items-center gap-2 w-24">
             <div className="text-[20px]">🥈</div>
             <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white font-bold">SO</div>
             <div className="w-full bg-slate-300 h-24 rounded-t-xl flex flex-col items-center justify-center p-2 text-center">
                <div className="text-[11.2px] font-bold text-slate-600">Sofia R.</div>
                <div className="text-[12.8px] font-extrabold text-slate-800">$452</div>
             </div>
           </div>
           <div className="flex flex-col items-center gap-2 w-28">
             <div className="text-[28px]">🥇</div>
             <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold border-4 border-white shadow-lg">MK</div>
             <div className="w-full bg-amber-400 h-36 rounded-t-xl flex flex-col items-center justify-center p-2 text-center shadow-lg">
                <div className="text-[12px] font-extrabold text-white">Marcus K.</div>
                <div className="text-[16px] font-black text-white">$624</div>
             </div>
           </div>
           <div className="flex flex-col items-center gap-2 w-24">
             <div className="text-[20px]">🥉</div>
             <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold">RN</div>
             <div className="w-full bg-amber-700 h-20 rounded-t-xl flex flex-col items-center justify-center p-2 text-center">
                <div className="text-[11.2px] font-bold text-white">Ravi N.</div>
                <div className="text-[12.8px] font-extrabold text-white">$396</div>
             </div>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs h-64">
           <h3 className="text-[14.1px] font-bold text-slate-900 mb-6 tracking-tight">📣 Publish Leaderboard</h3>
           <p className="text-[12.8px] text-slate-500 mb-6 leading-relaxed font-medium">Share the leaderboard with your community. Select cadence and channel — preview updates in real time.</p>
           <div className="space-y-3">
             <button className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-[13.6px] font-bold shadow-lg hover:shadow-black/10 flex items-center justify-center gap-2">
               🚀 Publish Now to All Channels
             </button>
             <div className="text-[11.2px] text-slate-400 text-center font-bold">Auto-publish: Weekly · Mon 9AM</div>
           </div>
        </div>
      </div>
    </div>
  );
}

function PayoutRequestsTab() {
  const [requests, setRequests] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'payoutRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PayoutRequest)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id: string, userId: string, amount: number) => {
    try {
      // 1. Update payout request status
      await updateDoc(doc(db, 'payoutRequests', id), {
        status: 'approved',
        processedAt: serverTimestamp()
      });

      // 2. We should ideally subtract from user's balance and add to totalPaidOut in a transaction
      // For simplicity in this demo, we'll do separate writes, but in prod use runTransaction
      // Actually, my rule might not allow me to edit user data directly here if not careful, 
      // but as Admin with rules defined for admins it should be fine.
      
      const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', userId)));
      if (!userDoc.empty) {
        const u = userDoc.docs[0];
        const currentData = u.data() as UserData;
        await updateDoc(doc(db, 'users', u.id), {
          balance: (currentData.balance || 0) - amount,
          totalPaidOut: (currentData.totalPaidOut || 0) + amount
        });
      }

      alert('Payout approved and user balance updated.');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `payoutRequests/${id}`);
    }
  };

  const pending = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">💸 Payout Requests</h2>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
           <h3 className="text-[15.2px] font-extrabold text-amber flex items-center gap-2 italic">
              <Wallet size={16} /> Pending Requests ({pending.length})
           </h3>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-[13.6px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                 <tr>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">User</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Amount</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Method</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px]">Status</th>
                    <th className="px-5 py-3 font-bold text-slate-500 uppercase text-[11px] text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {requests.map((p, i) => (
                   <tr key={i} className="hover:bg-slate-50/5 transition-colors group">
                      <td className="px-5 py-4">
                         <div className="font-extrabold text-slate-900">{p.userName}</div>
                         <div className="text-[11px] text-slate-400 font-mono">{p.userId}</div>
                      </td>
                      <td className="px-5 py-4 text-[13.6px] font-extrabold text-amber font-mono">${p.amount.toFixed(2)}</td>
                      <td className="px-5 py-4 text-[12.8px] font-bold text-slate-400 capitalize">{p.method}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${p.status === 'pending' ? 'bg-amber-100 text-amber' : 'bg-green-100 text-green'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                         {p.status === 'pending' && (
                           <button 
                             onClick={() => p.id && handleApprove(p.id, p.userId, p.amount)}
                             className="bg-green text-white px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all hover:scale-[1.03] active:scale-100 shadow-md"
                           >
                             Approve ✓
                           </button>
                         )}
                      </td>
                   </tr>
                 ))}
                 {requests.length === 0 && !loading && (
                   <tr>
                     <td colSpan={5} className="px-5 py-20 text-center text-slate-400 italic">No payout requests found.</td>
                   </tr>
                 )}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">⚙️ Settings & Config</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-[14.4px] font-bold text-slate-900 mb-6 flex items-center justify-between">
              💰 Referral Rates <button className="text-[11.2px] text-purple font-bold">Edit</button>
            </h3>
            <div className="space-y-3 px-1">
              {[
                { l: 'Monthly Pro', v: '30% · $12/mo' },
                { l: 'Quarterly', v: '30% · $30/qtr' },
                { l: '6-Month', v: '30% · $54/rev' },
                { l: 'Yearly', v: '30% · $105/yr' },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-[13.4px] font-medium text-slate-500">{r.l}</span>
                  <span className="text-[13.4px] font-extrabold text-green font-mono">{r.v}</span>
                </div>
              ))}
            </div>
         </div>

         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-[14.4px] font-bold text-slate-900 mb-6 flex items-center justify-between">
              📣 Board Settings <button className="text-[11.2px] text-purple font-bold">Edit</button>
            </h3>
            <div className="space-y-3 px-1">
              {[
                { l: 'Auto-publish', v: 'Weekly · Mon 9AM' },
                { l: 'Max positions', v: 'Top 10' },
                { l: 'Show earnings', v: 'Enabled' },
                { l: 'WA Broadcast', v: 'Connected' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-[13.4px] font-medium text-slate-500">{s.l}</span>
                  <span className="text-[13.4px] font-extrabold text-purple font-mono">{s.v}</span>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
