import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Radio, History, Smartphone, Gift, User, CreditCard, Bell, HelpCircle, LogOut } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={`flex items-center gap-2.5 px-5 py-2.5 text-[0.875rem] transition-all border-l-3 ${
        active 
          ? 'bg-purple-light text-purple border-purple font-semibold' 
          : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className="shrink-0 text-base">{icon}</span>
      {label}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const navItems = [
    { section: 'Main', items: [
      { icon: '📊', label: 'Overview', href: '/dashboard' },
      { icon: '📡', label: 'Signal Feed', href: '/dashboard/feed' },
      { icon: '📜', label: 'Signal History', href: '/dashboard/history' },
      { icon: '📱', label: 'WhatsApp Setup', href: '/dashboard/whatsapp' },
      { icon: '🎁', label: 'Referrals', href: '/referral', badge: '30%' },
    ]},
    { section: 'Account', items: [
      { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
      { icon: '💳', label: 'Subscription', href: '/dashboard/billing' },
      { icon: '🔔', label: 'Notifications', href: '/dashboard/notifications' },
    ]},
    { section: 'Support', items: [
      { icon: '❓', label: 'Help Center', href: '/dashboard/help' },
      { icon: '🚪', label: 'Sign out', href: '/' },
    ]}
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
      {/* SIDEBAR */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col pt-8">
        <div className="flex-1 overflow-y-auto">
          {navItems.map((section, idx) => (
            <React.Fragment key={idx}>
               <div className={`px-6 ${idx === 0 ? 'mb-4' : 'mt-8 mb-4'} text-[10px] font-black tracking-widest text-slate-400 uppercase`}>
                 {section.section}
               </div>
               <div className="space-y-1">
                 {section.items.map((item: any) => (
                   <div key={item.label} className="relative">
                     <SidebarItem 
                       icon={item.icon} 
                       label={item.label} 
                       href={item.href} 
                       active={location.pathname === item.href} 
                     />
                     {item.badge && (
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                         {item.badge}
                       </span>
                     )}
                   </div>
                 ))}
               </div>
            </React.Fragment>
          ))}
        </div>

        {/* TRIAL BOX */}
        {!isAdmin && (
          <div className="m-4 rounded-2xl bg-purple p-6 text-white shadow-xl shadow-purple/20">
            <div className="mb-1 text-lg font-black tracking-tight flex items-center gap-2">
              <Zap size={18} className="fill-white" /> Free Trial
            </div>
            <p className="text-xs text-purple-light/80 leading-relaxed mb-4">5 days remaining. Upgrade to keep receiving signals.</p>
            <Link to="/pricing" className="block w-full rounded-lg bg-white px-4 py-2 text-center text-xs font-black text-purple transition-all hover:bg-slate-50">
              Upgrade to Pro →
            </Link>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}

function Zap({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
