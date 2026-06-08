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
import { motion, AnimatePresence } from 'motion/react';

type AdminTab = 'overview' | 'signals' | 'subscribers' | 'sales' | 'referrals' | 'leaderboard' | 'payouts' | 'content' | 'cms';

import { useAuth } from '../context/AuthContext';
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
    { section: 'Content', id: 'cms', label: 'Blog CMS', icon: Megaphone },
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
                      onClick={() => {
                        if (item.id === 'cms') {
                          navigate('/admin/cms');
                        } else {
                          setTab(item.id);
                        }
                      }}
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
  const [stats, setStats] = useState({
    totalSubs: 0,
    paidActive: 0,
    freeTrial: 0,
    signalsToday: 0
  });
  const [recentSignals, setRecentSignals] = useState<Signal[]>([]);
  const [pendingPayoutsCount, setPendingPayoutsCount] = useState(0);

  useEffect(() => {
    // Mock data for now since Admin APIs are not built yet
    setStats({
      totalSubs: 150,
      paidActive: 120,
      freeTrial: 30,
      signalsToday: 5
    });
    setRecentSignals([]);
    setPendingPayoutsCount(4);
  }, []);

  const kpis = [
    { label: 'Total Subscribers', val: stats.totalSubs.toLocaleString(), change: 'Lifetime growth', color: 'text-purple' },
    { label: 'Paid Active', val: stats.paidActive.toLocaleString(), change: `${Math.round((stats.paidActive / stats.totalSubs) * 100) || 0}% conversion`, color: 'text-green' },
    { label: 'Free Trial', val: stats.freeTrial.toLocaleString(), change: 'Active trials' },
    { label: 'Signals Today', val: stats.signalsToday.toLocaleString(), change: 'Last 24h' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-[21.6px] font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
           <p className="text-[13.4px] text-slate-500 font-medium mt-0.5">Valo AI Operations · {new Date().toLocaleDateString()}</p>
        </div>
        <div className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-full text-[11.8px] font-bold text-slate-400 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" /> Live · Auto-refreshing
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
         {kpis.map((kpi, i) => (
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
          { icon: '💸', label: `${pendingPayoutsCount} Payout Requests`, sub: 'Pending approval', color: 'bg-linear-to-br from-amber to-amber-500', tab: 'payouts' },
          { icon: '🏆', label: 'Leaderboard', sub: 'Top referrers', color: 'bg-linear-to-br from-blue-sig to-cyan-500', tab: 'leaderboard' },
          { icon: '👥', label: 'Subscribers', sub: `${stats.paidActive} active paid`, color: 'bg-linear-to-br from-green to-emerald-500', tab: 'subscribers' },
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
           {recentSignals.map((bc, i) => (
             <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-all">
                <span className={`px-2 py-0.5 text-[10.8px] font-bold rounded-full border ${bc.bias === 'Long' ? 'bg-green-light text-green border-green/20' : 'bg-red-light text-red border-red/20'}`}>{bc.bias}</span>
                <span className="text-[14px] font-extrabold text-slate-900 min-w-24">{bc.pair}</span>
                <span className="text-[12.5px] font-medium text-slate-500 flex-1">{bc.entryZone} · {bc.leverage} · TP: {bc.takeProfits?.join('/')}</span>
                <span className="text-[12px] font-bold text-green whitespace-nowrap">{bc.broadcastTo}</span>
                <span className="text-[11.5px] font-bold text-slate-400 whitespace-nowrap ml-4">{bc.createdAt?.toDate ? bc.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}</span>
             </div>
           ))}
           {recentSignals.length === 0 && (
             <div className="p-8 text-center text-slate-400 italic">No signals broadcasted yet.</div>
           )}
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
      // Mocked implementation for now
      setTimeout(() => {
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
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
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
    // Mocking subscribers list
    setUsers([]);
    setLoading(false);
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
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<any[]>([
    { code: 'VALO20', pct: 20, uses: 14, limit: 100, status: 'active', revenue: 234.00, expires: 'Apr 30, 2026' },
    { code: 'VALO50', pct: 50, uses: 3, limit: 10, status: 'active', revenue: 60.00, expires: 'Mar 31, 2026' },
    { code: 'LAUNCH', pct: 25, uses: 87, limit: 100, status: 'expired', revenue: 540.00, expires: 'Jan 31, 2026' },
  ]);

  useEffect(() => {
    setSales([]);
    setLoading(false);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const salesToday = sales.filter(s => s.createdAt?.toDate && s.createdAt.toDate() > today);
  const totalRevenueToday = salesToday.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const allTimeRevenue = sales.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  
  const planCounts = sales.reduce((acc: any, curr) => {
    acc[curr.plan] = (acc[curr.plan] || 0) + 1;
    return acc;
  }, {});

  const planRevenue = sales.reduce((acc: any, curr) => {
    acc[curr.plan] = (acc[curr.plan] || 0) + (curr.amount || 0);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h2 className="text-[21.6px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">📈 Sales Intel</h2>
          <p className="text-[13.4px] text-slate-500 font-medium">Detailed revenue tracking, plan splits, and coupon performance.</p>
        </div>
        <div className="flex bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl p-1 gap-1 shadow-sm">
          {['Daily', 'Weekly', 'Monthly', 'Annual'].map((p, i) => (
            <button key={i} className={`px-4 py-1.5 rounded-lg text-[11.8px] font-black uppercase tracking-tight transition-all ${i === 0 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Revenue Today', val: `$${totalRevenueToday.toLocaleString()}`, sub: 'Settled', icon: '💰', color: '#6c35de' },
          { label: 'Orders Today', val: salesToday.length.toString(), sub: `${salesToday.filter(s => !s.coupon).length} full price`, icon: '🆕', color: '#059669' },
          { label: 'All-Time Sales', val: `$${allTimeRevenue.toLocaleString()}`, sub: 'Total volume', icon: '🔄', color: '#2563eb' },
          { label: 'Avg Ticket', val: `$${(allTimeRevenue / (sales.length || 1)).toFixed(0)}`, sub: 'Per checkout', icon: '📊', color: '#d97706' },
          { icon: '👥', label: 'Unique Buyers', val: [...new Set(sales.map(s => s.userId))].length.toString(), sub: 'Customer base', color: '#0891b2' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-xs border-t-3" style={{ borderTopColor: kpi.color }}>
             <div className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest mb-3">{kpi.label}</div>
             <div className="text-[28px] font-black text-slate-900 tracking-tighter leading-none">{kpi.val}</div>
             <div className="text-[11.2px] text-slate-500 mt-3 font-medium">
               <span className="text-green-600 font-black">▲ 12%</span> vs average
             </div>
             <span className="absolute top-4 right-4 text-2xl opacity-10 grayscale">{kpi.icon}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xs overflow-hidden">
           <div className="flex justify-between items-center mb-8">
             <div>
               <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Transactions</h3>
               <p className="text-xs font-medium text-slate-400 mt-0.5">Last 50 payments across all plans</p>
             </div>
             <button className="text-[11.5px] font-black text-purple uppercase tracking-widest py-2 px-4 rounded-xl bg-purple/5 border border-purple/10 hover:bg-purple/10 transition-colors">Export Ledger</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="border-b border-slate-100">
                 <tr>
                   <th className="pb-4 text-[10.5px] font-black text-slate-400 uppercase tracking-widest px-1">Customer</th>
                   <th className="pb-4 text-[10.5px] font-black text-slate-400 uppercase tracking-widest px-1">Plan / Method</th>
                   <th className="pb-4 text-[10.5px] font-black text-slate-400 uppercase tracking-widest px-1 text-right">Price</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {sales.slice(0, 15).map((s, i) => (
                   <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 px-1">
                        <div className="font-bold text-slate-800 text-[13.4px] leading-tight">{s.userName}</div>
                        <div className="text-[11.2px] text-slate-400 font-medium">{s.createdAt?.toDate ? s.createdAt.toDate().toLocaleDateString() : 'New'}</div>
                     </td>
                     <td className="py-4 px-1 text-[12.8px]">
                        <div className="flex flex-wrap items-center gap-2">
                           <span className="font-black text-slate-600 tracking-tight">{s.plan}</span>
                           {s.coupon && <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-amber-200/30">{s.coupon}</span>}
                        </div>
                        <div className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Via {s.method || 'Standard Card'}</div>
                     </td>
                     <td className="py-4 px-1 text-right">
                        {s.originalAmount && s.originalAmount > s.amount && <div className="text-[10px] text-slate-300 line-through font-mono mb-0.5">${s.originalAmount.toFixed(2)}</div>}
                        <div className="text-[14.8px] font-mono font-black text-slate-900 tracking-tighter">${s.amount.toFixed(2)}</div>
                     </td>
                   </tr>
                 ))}
                 {sales.length === 0 && (
                   <tr><td colSpan={3} className="py-20 text-center">
                     <div className="text-4xl mb-4 grayscale opacity-20">📊</div>
                     <div className="text-slate-400 font-bold italic">No sales recorded yet. Ledger is empty.</div>
                   </td></tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>

        <div className="space-y-6">
           {/* REVENUE SPLIT */}
           <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 mb-8 uppercase tracking-widest text-slate-400 flex justify-between items-center">
                Revenue Split
                <TrendingUp size={14} />
              </h3>
              <div className="space-y-4">
                {Object.entries(planRevenue).map(([plan, rev]: any, i) => (
                  <div key={i} className="relative p-4 rounded-2xl bg-slate-50 overflow-hidden group">
                     <div className={`absolute top-0 left-0 w-1 h-full ${i % 3 === 0 ? 'bg-purple' : i % 3 === 1 ? 'bg-blue-600' : 'bg-emerald-500'}`} />
                     <div className="flex justify-between items-end">
                        <div>
                          <div className="text-[12.5px] font-black text-slate-800 leading-tight mb-1">{plan}</div>
                          <div className="text-[10.8px] font-bold text-slate-400 uppercase tracking-wide">{planCounts[plan]} Orders</div>
                        </div>
                        <div className="text-right">
                           <div className="text-[15.2px] font-black text-slate-900 font-mono tracking-tighter">${rev.toLocaleString()}</div>
                           <div className="text-[10.5px] font-bold text-green-600">{(rev/allTimeRevenue*100).toFixed(0)}% SHARE</div>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>

           {/* COUPON ADMIN */}
           <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xs bg-linear-to-bt from-slate-50/50 to-white">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Coupons</h3>
                 <button className="text-[18px] text-purple hover:scale-110 transition-transform active:scale-95">⊕</button>
              </div>
              <div className="space-y-3">
                 {coupons.map((c, i) => (
                   <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${c.status === 'expired' ? 'bg-white border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div>
                        <div className="font-mono font-black text-slate-900 text-[13.6px] leading-tight">{c.code}</div>
                        <div className="text-[10.5px] font-bold text-slate-400 mt-0.5">{c.uses} Uses · {c.pct}% OFF</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12.8px] font-black text-slate-700">${c.revenue.toFixed(0)}</div>
                        <div className="text-[9.2px] font-black uppercase text-purple-light bg-purple px-1.5 py-0.5 rounded leading-none mt-1">{c.status}</div>
                      </div>
                   </div>
                 ))}
                 <button className="w-full mt-4 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-black text-xs uppercase tracking-widest hover:border-purple hover:text-purple transition-all">Create New Coupon</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}


function ReferralTrackingTab() {
  const [referrers, setReferrers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setReferrers([]);
    setLoading(false);
  }, []);

  const totalEarnings = referrers.reduce((acc, curr) => acc + (curr.totalEarnings || 0), 0);
  const totalPaid = referrers.reduce((acc, curr) => acc + (curr.totalPaidOut || 0), 0);

  return (
    <div className="space-y-6">
      <h2 className="text-[19.2px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">🎁 Referral Commission Tracking</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrers', val: referrers.length.toString(), sub: 'All users with accounts', color: 'text-purple' },
          { label: 'Active Systems', val: referrers.filter(r => (r.referralCount || 0) > 0).length.toString(), sub: 'With 1+ referrals' },
          { label: 'Total Payouts', val: `$${totalPaid.toLocaleString()}`, sub: 'All time cleared', color: 'text-green' },
          { label: 'Life Commissions', val: `$${totalEarnings.toLocaleString()}`, sub: 'Estimated liability', color: 'text-amber' },
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
          {referrers.slice(0, 10).map((r, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-light flex items-center justify-center font-bold text-purple text-[11px]">{r.firstName?.[0]}{r.lastName?.[0]}</div>
                <div>
                   <div className="text-[13.6px] font-extrabold text-slate-900">{r.firstName} {r.lastName}</div>
                   <div className="text-[11.2px] font-bold text-slate-400">{r.referralCount || 0} active referrals · code: {r.referralCode}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14.4px] font-extrabold text-green font-mono">${(r.balance || 0).toFixed(2)}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Available</div>
              </div>
            </div>
          ))}
          {referrers.length === 0 && !loading && (
            <div className="py-10 text-center text-slate-400 italic">No referral data yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function LeaderboardTab() {
  const [topUsers, setTopUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);

  useEffect(() => {
    setTopUsers([]);
    setLoading(false);
  }, []);

  const first = topUsers[0];
  const second = topUsers[1];
  const third = topUsers[2];

  const publishLeaderboard = () => {
    setPublishStatus('Publishing to all channels...');
    setTimeout(() => {
      setPublishStatus('✓ Leaderboard successfully published to WhatsApp, Telegram, and X!');
      setTimeout(() => setPublishStatus(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[21.6px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">🏆 Referral Leaderboard</h2>
          <p className="text-[13.4px] text-slate-500 font-medium mt-0.5">Top-performing referrers by total lifetime earnings.</p>
        </div>
        <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500 outline-none">
           <option>Lifetime Earnings</option>
           <option>This Month</option>
           <option>This Week</option>
        </select>
      </div>
      
      {topUsers.length >= 3 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-[40px] p-10 relative flex items-end justify-center gap-0 overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <Trophy size={200} strokeWidth={1} className="text-white" />
             </div>
             
             {/* 2nd */}
             <div className="flex flex-col items-center gap-4 w-32 relative z-10">
               <div className="text-2xl mb-1">🥈</div>
               <div className="w-14 h-14 rounded-full bg-slate-700/50 border-2 border-slate-400 p-1">
                 <div className="w-full h-full rounded-full bg-slate-600 flex items-center justify-center text-white font-black text-lg shadow-inner">
                    {second.firstName?.[0]}{second.lastName?.[0]}
                 </div>
               </div>
               <div className="w-full bg-linear-to-b from-slate-700/60 to-slate-800/80 h-32 rounded-t-[32px] flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm border-x border-t border-white/5">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate w-full">{second.firstName}</div>
                  <div className="text-xl font-black text-white font-mono tracking-tighter">${(second.totalEarnings || 0).toFixed(0)}</div>
                  <div className="mt-2 h-1 w-8 bg-slate-400/30 rounded-full" />
               </div>
             </div>
             
             {/* 1st */}
             <div className="flex flex-col items-center gap-4 w-40 relative z-20">
               <div className="text-4xl mb-2 drop-shadow-lg">🥇</div>
               <div className="w-20 h-20 rounded-full bg-amber-500/20 border-4 border-amber-400 p-1.5 shadow-[0_0_30px_rgba(251,191,36,0.3)] group transition-all">
                 <div className="w-full h-full rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-xl">
                    {first.firstName?.[0]}{first.lastName?.[0]}
                 </div>
                 <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg transform rotate-12">
                   <span className="text-amber-600 text-xs font-black">#1</span>
                 </div>
               </div>
               <div className="w-full bg-linear-to-b from-amber-400 to-amber-600 h-48 rounded-t-[40px] flex flex-col items-center justify-center p-6 text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/20" />
                  <div className="text-[12px] font-black text-amber-100 uppercase tracking-widest mb-1 truncate w-full">{first.firstName}</div>
                  <div className="text-3xl font-black text-white font-mono tracking-tighter">${(first.totalEarnings || 0).toFixed(0)}</div>
                  <div className="mt-3 text-[10px] font-bold text-amber-900/50 uppercase">Top Performer</div>
               </div>
             </div>

             {/* 3rd */}
             <div className="flex flex-col items-center gap-4 w-32 relative z-10">
               <div className="text-2xl mb-1">🥉</div>
               <div className="w-14 h-14 rounded-full bg-amber-900/20 border-2 border-amber-700/50 p-1">
                 <div className="w-full h-full rounded-full bg-amber-800 flex items-center justify-center text-white font-black text-lg shadow-inner">
                    {third.firstName?.[0]}{third.lastName?.[0]}
                 </div>
               </div>
               <div className="w-full bg-linear-to-b from-amber-800/40 to-amber-900/60 h-24 rounded-t-[32px] flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm border-x border-t border-white/5">
                  <div className="text-[11px] font-black text-amber-200/50 uppercase tracking-widest mb-1 truncate w-full">{third.firstName}</div>
                  <div className="text-xl font-black text-white font-mono tracking-tighter">${(third.totalEarnings || 0).toFixed(0)}</div>
               </div>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xs flex flex-col relative group">
             <div className="absolute top-8 right-8 text-purple p-2 rounded-xl bg-purple/10">
                <Megaphone size={20} />
             </div>
             
             <div className="mt-2">
               <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Publish Stats</h3>
               <p className="text-[13.1px] text-slate-500 mb-8 leading-relaxed font-medium">Broadcast the current rankings to your community channels to drive FOMO and growth.</p>
             </div>

             <div className="space-y-4 mt-auto">
               <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                     <span>Preview Message</span>
                     <span className="text-green-600">✓ Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-3 font-mono leading-relaxed bg-white/50 p-3 rounded-lg border border-white">
                    🏆 VALO LEADERBOARD UPDATE<br/>
                    🥇 {first.firstName} - ${(first.totalEarnings || 0).toLocaleString()}<br/>
                    🥈 {second.firstName} - ${(second.totalEarnings || 0).toLocaleString()}...
                  </p>
               </div>

               {publishStatus && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-[11px] font-black text-center border border-emerald-100 italic uppercase tracking-tighter">
                   {publishStatus}
                 </motion.div>
               )}

               <button 
                 onClick={publishLeaderboard}
                 className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
               >
                 🚀 Broadcast Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <div className="text-[11px] text-slate-400 text-center font-bold tracking-tight">Recurrence: Weekly · Mon 9AM</div>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-20 text-center text-slate-400 font-bold italic">
          Waiting for more referral data to populate the podium systems...
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Full Rankings</h3>
           <span className="text-[10px] font-black text-slate-400 uppercase bg-white border border-slate-200 px-3 py-1 rounded-full">Top 20</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white border-b border-slate-100">
            <tr>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subscriber</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Referrals</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Lifetime Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {topUsers.map((user, i) => (
              <tr key={i} className="group hover:bg-slate-50/80 transition-colors">
                <td className="px-8 py-5">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${i < 3 ? 'bg-purple text-white shadow-lg shadow-purple/30' : 'bg-slate-100 text-slate-400'}`}>
                      {i + 1}
                   </div>
                </td>
                <td className="px-8 py-5">
                   <div className="font-black text-slate-900 text-[14.8px] leading-tight">{user.firstName} {user.lastName}</div>
                   <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wide mt-0.5 whitespace-nowrap">ID: {user.referralCode}</div>
                </td>
                <td className="px-8 py-5 text-center">
                   <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-tight">
                     {user.referralCount || 0} active
                   </span>
                </td>
                <td className="px-8 py-5 text-right font-mono font-black text-[15.6px] text-emerald-600 tracking-tighter">
                   ${(user.totalEarnings || 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function PayoutRequestsTab() {
  const [requests, setRequests] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock payout requests
    setRequests([]);
    setLoading(false);
  }, []);

  const handleApprove = async (id: string, userId: string, amount: number) => {
    try {
      // Mock approval
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Payout approved and user balance updated.');
    } catch (error) {
      console.error(error);
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
