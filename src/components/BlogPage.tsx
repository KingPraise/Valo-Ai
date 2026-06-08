import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Activity, BrainCircuit, Target, Users, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Trading Lessons', icon: BookOpen, color: 'text-purple', bg: 'bg-purple/10' },
  { name: 'Signal Breakdowns', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Beginner Guides', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Trading Psychology', icon: BrainCircuit, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { name: 'AI & Crypto', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { name: 'User Results', icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'Market Watch', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
];

const FALLBACK_POSTS = [
  {
    id: 'how-ai-can-help-traders-make-faster-market-decisions',
    title: 'How AI Can Help Traders Make Faster Market Decisions',
    excerpt: 'Crypto moves fast. AI can help traders analyze price action, structure, risk, and opportunities faster — without relying on emotion or guesswork.',
    category: 'AI & Crypto Trading',
    readTime: '6 min read',
    image: '/images/ai_trading.png',
    date: 'June 06, 2026'
  },
  {
    id: 'why-discipline-is-more-important-than-prediction',
    title: 'Why Discipline Is More Important Than Prediction',
    excerpt: 'In crypto trading, the best traders are not always the ones who predict every move. They are the ones who follow a system, manage risk, and stay disciplined.',
    category: 'Trading Psychology',
    readTime: '5 min read',
    image: '/images/trading_discipline.png',
    date: 'June 05, 2026'
  },
  {
    id: 'why-most-beginner-traders-lose-money-in-futures',
    title: 'Why Most Beginner Traders Lose Money in Futures',
    excerpt: 'Futures trading can be profitable, but without discipline, risk control, and a clear system, beginners can lose money faster than they expect.',
    category: 'Trading Psychology',
    readTime: '6 min read',
    image: '/images/futures_trading.png',
    date: 'June 01, 2026'
  },
];


export default function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState<any[]>(FALLBACK_POSTS);

  React.useEffect(() => {
    // Firebase removed, fallback posts will be shown
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* TOP SECTION */}
      <section className="bg-slate-900 py-24 sm:py-32 relative overflow-hidden text-center z-10">
        <div className="absolute top-0 right-0 p-[20%] opacity-20 pointer-events-none">
          <div className="w-[500px] h-[500px] bg-purple rounded-full blur-[120px] mix-blend-screen" />
        </div>
        <div className="absolute bottom-0 left-0 p-[10%] opacity-20 pointer-events-none">
          <div className="w-[400px] h-[400px] bg-green-500 rounded-full blur-[100px] mix-blend-screen" />
        </div>
        
        <div className="mx-auto max-w-4xl px-4 relative z-20">
          <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-black tracking-widest text-purple-light uppercase border border-white/10">ValoAi Trading Blog</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6 sm:text-6xl">Intelligence that pays.</h1>
          <p className="text-lg leading-relaxed text-slate-300 mb-10 max-w-2xl mx-auto font-medium">Simple crypto trading lessons, AI-powered market insights, and practical guides to help you trade smarter and win faster.</p>
          
          <button 
            onClick={() => navigate('/signup')} 
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-black shadow-xl hover:bg-slate-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Start 7-Day Free Trial
          </button>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-[-40px] relative z-20">
        <div 
          onClick={() => navigate('/blog/why-stop-loss-is-not-optional')}
          className="group relative bg-white rounded-[32px] p-6 sm:p-10 shadow-2xl border border-slate-200 overflow-hidden cursor-pointer flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="md:w-1/2 relative rounded-2xl overflow-hidden aspect-video w-full">
            <img 
              src="/images/take_profit.png" 
              alt="Trading desk" 
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-purple text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Featured Trading Lesson</span>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 group-hover:text-purple transition-colors leading-tight">Why Stop Loss Is Not Optional in Futures Trading</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">It is the most common mistake among retail traders: removing a stop loss because "it will bounce back." Here is the math on why trading without a stop loss statistically guarantees a blown account over time.</p>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><Clock size={14} /> 7 min read</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded">Read Article →</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-sm font-black text-slate-900 mb-8 uppercase tracking-widest text-slate-400">Explore by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple/30 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <h4 className="font-bold text-slate-900">{cat.name}</h4>
              <p className="text-xs font-medium text-slate-400 mt-1">Explore articles →</p>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Latest Articles</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div 
              key={i} 
              onClick={() => navigate(`/blog/${post.id}`)}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image || '/images/ai_trading.png'} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[11px] font-bold text-slate-400 mb-3">{post.date} · {post.readTime}</div>
                <h4 className="text-[17px] font-black text-slate-900 mb-3 leading-tight group-hover:text-purple transition-colors">{post.title}</h4>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-purple group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-purple text-white rounded-[32px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-purple/20">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-screen" />
          <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6 tracking-tight">Stop learning the hard way.</h2>
          <p className="relative z-10 text-purple-light/90 mb-10 max-w-xl mx-auto font-medium leading-relaxed">Join 1,400+ traders already receiving complete, risk-managed setups straight to WhatsApp.</p>
          <button 
            onClick={() => navigate('/signup')} 
            className="relative z-10 bg-white text-purple px-8 py-4 rounded-full font-black shadow-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
          >
            Start 7-Day Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
