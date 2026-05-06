import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Target, 
  ShieldCheck, 
  Smartphone, 
  SmartphoneNfc, 
  Clock, 
  Lock, 
  Globe, 
  Check, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#faf8ff] via-[#f0ebff] to-[#e8e0ff] pt-20 pb-0 lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white px-4 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-xs font-bold tracking-wide text-purple uppercase">Signals · Trade Setups · Market Alerts</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Trade smarter. <span className="text-purple">Win faster</span> with AI-powered signals to WhatsApp.
              </h1>
              
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
                Valo AI scans the market 24/7 and pushes complete trade setups, market alerts and coaching notes straight to your WhatsApp.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-10 py-5 text-lg font-bold text-white shadow-xl shadow-purple/30 transition-all hover:bg-purple-dark hover:translate-y-[-2px] active:translate-y-0"
                >
                  Start for free
                </Link>
                <Link
                  to="/#how-it-works"
                  className="rounded-full border-2 border-slate-200 px-10 py-[18px] text-lg font-bold text-slate-700 transition-all hover:border-purple hover:text-purple active:scale-95"
                >
                  How it works
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-lg">★</span>)}
                </div>
                <div>
                  <strong className="text-slate-800">4.9/5</strong> from 1,400+ traders
                </div>
              </div>
            </motion.div>

            {/* MOCKUP VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-end justify-center pt-10 lg:pt-0"
            >
              {/* Stats Card 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-4 z-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl md:left-10"
              >
                <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Signals this week</div>
                <div className="text-2xl font-black text-green-600 tracking-tight">+12</div>
                <div className="text-[10px] text-slate-400">Across 8 pairs</div>
              </motion.div>

              {/* Phone Frame */}
              <div className="relative mx-auto w-[280px] overflow-hidden rounded-[40px] bg-slate-900 p-2.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                <div className="relative h-[560px] overflow-hidden rounded-[32px] bg-emerald-950">
                  {/* WhatsApp UI */}
                  <div className="flex items-center gap-3 bg-emerald-900/80 px-4 py-4 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-600 to-green-500 font-bold">VA</div>
                    <div>
                      <div className="text-sm font-bold leading-tight">Valo AI Signals</div>
                      <div className="text-[10px] text-emerald-400">● Broadcasting · Live</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-4 flex flex-col items-center gap-2">
                       <div className="rounded-lg bg-emerald-900/20 px-3 py-1.5 text-center text-[10px] text-emerald-400/60 ring-1 ring-emerald-500/10">
                        🔔 New signal — BTC/USDT
                       </div>
                    </div>
                    
                    <div className="rounded-r-2xl rounded-bl-2xl bg-emerald-800/40 p-4 font-mono text-[10px] leading-relaxed text-emerald-100 ring-1 ring-emerald-500/20 shadow-lg">
                      <div className="mb-2 font-bold text-emerald-400">📊 BTC/USDT Signal</div>
                      <div>Trade Bias: <span className="text-emerald-400">Long</span></div>
                      <div>Entry Zone: <span className="text-emerald-400">$93,200–$95,400</span></div>
                      <div>Stop Loss: <span className="text-rose-400">$88,900</span></div>
                      <div>Take Profit: <span className="text-blue-400">$98.4K/$103K/$109K</span></div>
                      <div>Leverage: <span className="text-emerald-400">3x Cross</span></div>
                      <div>Duration: <span className="text-emerald-400">24–72 hours</span></div>
                      <div className="mt-3 text-right text-[8px] text-emerald-500">Valo AI · auto-delivered · now ✓✓</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-0 bottom-20 z-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl md:right-10"
              >
                <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Active subscribers</div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">1,400+</div>
                <div className="text-[10px] text-slate-400">Traders worldwide</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="border-y border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-between md:gap-4">
            {[
              { label: 'Active traders', val: '1,400+' },
              { label: 'Signal accuracy', val: '70%' },
              { label: 'Coin pairs covered', val: '200+' },
              { label: 'Market monitoring', val: '24/7' },
              { label: 'Trader satisfaction', val: '4.9★' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="text-2xl font-black tracking-tight text-purple sm:text-3xl">{stat.val}</span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-32 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block rounded-full bg-purple-light px-4 py-1 text-xs font-bold tracking-widest text-purple uppercase">How Valo AI works</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Three steps to smarter trading.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">No charts. No analysis. No complexity. Valo AI does the work — you get the signal.</p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {[
              { 
                step: 1, 
                title: 'Create your account', 
                desc: 'Sign up in under two minutes. No credit card needed. Your 7-day free trial starts immediately.', 
                icon: '👤',
                badge: null
              },
              { 
                step: 2, 
                title: 'Connect your WhatsApp', 
                desc: 'Add your number in the dashboard. One tap — and Valo AI is linked directly to your phone.', 
                icon: '📱',
                badge: 'Ready in 60 seconds'
              },
              { 
                step: 3, 
                title: 'Receive and execute', 
                desc: 'The moment a setup is found, a complete signal lands in your WhatsApp automatically.', 
                icon: '🚀',
                badge: 'Signals auto-delivered'
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-purple text-xl font-black text-white shadow-lg">
                  {item.step}
                </div>
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-10 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-2xl hover:shadow-purple/5">
                  <div className="mb-6 text-4xl">{item.icon}</div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  {item.badge && (
                    <span className="mt-6 inline-block rounded-full bg-purple-light px-3 py-1 text-[10px] font-bold text-purple">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNAL FORMAT */}
      <section className="border-y border-slate-200 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-purple-light px-4 py-1 text-xs font-bold tracking-widest text-purple uppercase">Signal Format</span>
              <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:leading-tight">Every field you need.<br/>Nothing left to figure out.</h2>
              <p className="mb-10 text-lg leading-relaxed text-slate-500">Every Valo AI signal arrives complete and structured — pushed straight to your WhatsApp. No charts to read. No calculations to do.</p>
              
              <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-6">
                  <span className="text-xl font-extrabold text-slate-900">TREE/USDT</span>
                  <span className="rounded-full bg-green-50 px-4 py-1 text-xs font-bold tracking-widest text-green-600 uppercase ring-1 ring-green-500/20">Long</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Entry Zone', val: '$0.265 – $0.272' },
                    { label: 'Stop Loss', val: '$0.249', color: 'text-rose-500' },
                    { label: 'TP 1', val: '$0.281', color: 'text-blue-500' },
                    { label: 'Leverage', val: '5x Cross' },
                    { label: 'Position Size', val: '10–15%' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-slate-400">{row.label}</span>
                      <span className={`font-mono text-sm font-bold ${row.color || 'text-slate-900'}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3">
                    <span className="text-xs font-bold text-amber-700">Risk Rule</span>
                    <span className="text-xs font-black text-amber-700 uppercase tracking-tighter">Max 2 trades · 20% total</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative max-w-sm overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
                 <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3 text-white">
                    <div className="h-9 w-9 bg-linear-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-white/20">VA</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">Valo AI Signals</div>
                      <div className="text-[10px] text-white/70">● Online</div>
                    </div>
                 </div>
                 <div className="bg-[#e5ddd5] p-6 h-[500px] flex flex-col gap-4 overflow-y-auto">
                    <div className="self-center bg-white/40 backdrop-blur-sm px-3 py-1 rounded text-[10px] text-slate-600 font-medium">🔔 New broadcast</div>
                    <div className="bg-white rounded-br-2xl rounded-tl-2xl rounded-bl-2xl p-4 shadow-sm max-w-[90%] border-t border-r border-[#6c35de]/10 relative group">
                        <div className="text-xs font-bold text-green-500 mb-2">📊 TREE/USDT Signal</div>
                        <div className="space-y-1.5">
                           <div className="flex justify-between text-[11px] border-b border-slate-100 pb-1.5">
                              <span className="text-slate-400 font-medium">Bias</span>
                              <span className="text-green-600 font-black">Long</span>
                           </div>
                           <div className="flex justify-between text-[11px] border-b border-slate-100 pb-1.5">
                              <span className="text-slate-400 font-medium">Entry</span>
                              <span className="text-slate-900 font-mono font-bold">$0.265–$0.272</span>
                           </div>
                           <div className="flex justify-between text-[11px] border-b border-slate-100 pb-1.5">
                              <span className="text-slate-400 font-medium">Stop</span>
                              <span className="text-rose-500 font-mono font-bold">$0.249</span>
                           </div>
                           <div className="flex justify-between text-[11px] border-b border-slate-100 pb-1.5">
                              <span className="text-slate-400 font-medium">Take Profit</span>
                              <span className="text-blue-500 font-mono font-bold">$0.281 / $0.289</span>
                           </div>
                        </div>
                        <div className="mt-3 text-right text-[9px] text-slate-400 italic">auto-delivered ✓✓</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS VALOAI - BENTO GRID */}
      <section id="features" className="scroll-mt-32 bg-white py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block rounded-full bg-purple-light px-4 py-1 text-xs font-bold tracking-widest text-purple uppercase">The Platform</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">What is ValoAi?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">More than just signals — a complete crypto intelligence ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Main Feature */}
            <div className="lg:col-span-1 rounded-[32px] bg-slate-900 p-8 text-white relative overflow-hidden group h-full min-h-[400px]">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Target size={120} strokeWidth={1} className="text-purple-light" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-auto">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple/20 text-purple ring-1 ring-purple/50">
                    <Target size={24} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Professional signals</h3>
                  <p className="text-slate-400">Receive precise buy & sell signals, complete with entry zone, multiple profit targets, and stop loss. No more second-guessing.</p>
                </div>
                <div className="mt-8">
                   <Link to="/signup" className="inline-flex items-center gap-2 font-bold text-purple-light hover:underline">Get signals <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="lg:col-span-1 rounded-[32px] bg-[#f8f6ff] border border-purple/5 p-8 text-slate-900 group h-full">
              <div className="h-full flex flex-col">
                <div className="mb-8">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-purple shadow-sm ring-1 ring-purple/10">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Expert support</h3>
                  <p className="text-slate-500 mb-6 font-medium">1-on-1 human guidance within 15 minutes. Not a bot. Professional traders ready to help.</p>
                  
                  <div className="space-y-3">
                    {['Strategic advice', 'Market analysis', 'Signal clarfication'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={14} className="text-purple" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Learning/Coaching */}
            <div className="lg:col-span-1 rounded-[32px] bg-white border border-slate-100 p-8 text-slate-900 flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
               <div className="mb-8">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900 ring-1 ring-slate-200">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Trading education</h3>
                  <p className="text-slate-500">Access exclusive educational notes and mid-trade coaching to master the "why" behind every signal.</p>
               </div>
               <div className="mt-auto pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />)}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expert coaches online</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-bold tracking-widest text-green-700 uppercase">Real Results</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Traders in our circle.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">Trusted by over 1,400 traders across 42 countries.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
             {[
               { name: 'Marcus R.', role: 'Full-time Trader', text: '“The WhatsApp delivery is the game-changer. I don\'t have to stare at charts all day. I get a notification, check the bias, and execute.”', avatar: 'MR' },
               { name: 'Sarah L.', role: 'Part-time Trader', text: '“As a beginner, I was lost. Valo\'s coaching notes helped me understand where to place stops and why. Accuracy is incredible.”', avatar: 'SL' },
               { name: 'David K.', role: 'Crypto Enthusiast', text: '“Finally a signal service that actually values risk management. Every trade has a stop loss and strict sizing rules.”', avatar: 'DK' },
             ].map((item, i) => (
               <div key={i} className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-100">
                  <div className="mb-6 flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="mb-8 text-slate-600 leading-relaxed italic">{item.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple flex items-center justify-center font-bold text-white shadow-lg shadow-purple/20">{item.avatar}</div>
                    <div>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.role}</div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* BLOG / ARTICLES */}
      <section id="blog" className="scroll-mt-32 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="mb-4 inline-block rounded-full bg-purple-light px-4 py-1 text-xs font-bold tracking-widest text-purple uppercase">Knowledge Base</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Learn as you earn.</h2>
                <p className="mt-6 text-lg text-slate-500">Expert articles and market outlooks to sharpen your trading edge.</p>
              </div>
              <Link to="/blog" className="rounded-full bg-slate-50 px-6 py-3 font-bold text-slate-700 hover:bg-slate-100 transition-colors">View all articles</Link>
           </div>

           <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                { title: 'The 3 Pillars of Risk Management', tag: 'Strategy', date: 'Oct 12, 2024', img: 'https://images.unsplash.com/photo-1611974714441-2b047d86f788?q=80&w=800&auto=format&fit=crop' },
                { title: 'Why 2024 is the Year of Altcoins', tag: 'Market Outlook', date: 'Oct 10, 2024', img: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop' },
                { title: 'Understanding Confluence in AI', tag: 'Education', date: 'Oct 05, 2024', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop' },
              ].map((post, i) => (
                <div key={i} className="group cursor-pointer">
                   <div className="mb-6 overflow-hidden rounded-[24px]">
                      <img src={post.img} alt={post.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   </div>
                   <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-bold text-purple uppercase tracking-widest bg-purple-light px-2 py-0.5 rounded">{post.tag}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple transition-colors">{post.title}</h3>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* UPDATES TIMELINE */}
      <section id="product-updates" className="scroll-mt-32 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
              <div>
                <span className="mb-4 inline-block rounded-full bg-slate-200 px-4 py-1 text-xs font-bold tracking-widest text-slate-600 uppercase">Product Updates</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:leading-tight">Continuous evolution.<br/>Always improving.</h2>
                <p className="mt-8 text-lg text-slate-500 max-w-md">We ship updates to the Valo AI brain weekly. See how the platform is evolving to stay ahead of the market.</p>
              </div>

              <div className="space-y-8 relative">
                 <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200" />
                 {[
                   { ver: 'v2.4.0', title: 'Enhanced RSI-Confluence Filter', date: 'Sep 2024', desc: 'Improved the AI brain filtering mechanism to reduce noise during low volatility periods.' },
                   { ver: 'v2.3.0', title: 'WhatsApp Push v2', date: 'Aug 2024', desc: 'Reduced delivery latency to under 3 seconds globally using new broadcast infra.' },
                   { ver: 'v2.1.2', title: 'Mid-Trade Alerts', date: 'Jul 2024', desc: 'Added automatic notifications when to move stop loss to entry (Break Even alerts).' },
                 ].map((update, i) => (
                   <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10">
                        <div className="h-2 w-2 rounded-full bg-purple" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-black text-purple uppercase tracking-tight">{update.ver}</span>
                          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">• {update.date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{update.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{update.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* WHY CHOOSE VALO */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="overflow-hidden rounded-[32px] bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-12 lg:p-20 relative">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple/20 blur-[80px]" />
              <div className="absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-green-500/10 blur-[60px]" />
              
              <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                 <div>
                   <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:leading-[1.1]">
                     Professional AI edge.<br/>
                     <span className="bg-linear-to-r from-purple-light to-green-400 bg-clip-text text-transparent">Zero complexity.</span>
                   </h2>
                   <p className="mt-8 text-lg leading-relaxed text-slate-400">
                     Valo AI combines multiple technical indicators and multi-timeframe analysis to filter out market noise, giving you high-probability setups with built-in risk management.
                   </p>
                   
                   <div className="mt-10 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/20 text-purple ring-1 ring-purple/50">🧠</div>
                        <span className="font-bold text-slate-200">Detect high-probability trades</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-400/10 text-green-400 ring-1 ring-green-400/40">🚀</div>
                        <span className="font-bold text-slate-200">Receive precise trade signals</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 ring-1 ring-blue-400/40">💰</div>
                        <span className="font-bold text-slate-200">Profit faster in the crypto market</span>
                      </div>
                   </div>
                   
                   <div className="mt-12 flex flex-wrap gap-4">
                      <Link to="/signup" className="rounded-full bg-linear-to-r from-purple to-purple-mid px-8 py-4 font-bold text-white shadow-xl shadow-purple/20">Start for free →</Link>
                      <Link to="/pricing" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm hover:bg-white/10">See pricing</Link>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {[
                      { icon: <BrainCircuit />, title: 'AI Brain', desc: 'Bollinger, RSI, MACD analyzed 24/7.' },
                      { icon: <Globe />, title: '200+ Pairs', desc: 'Cover BTC, ETH and top altcoins.' },
                      { icon: <Smartphone />, title: 'WhatsApp', desc: 'Push delivery. No extra apps.' },
                      { icon: <ShieldCheck />, title: 'Risk Rule', desc: 'Embedded sizing and stop loss.' },
                    ].map((feat, i) => (
                      <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md">
                        <div className="mb-4 text-purple-light">{feat.icon}</div>
                        <h4 className="mb-2 font-bold text-white">{feat.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 bg-slate-50 py-24 sm:py-32">
         <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">Crypto Signal FAQ — Questions? We have answers.</h2>
            <div className="space-y-4">
               {[
                 { q: 'What is Valo AI and how does it work?', a: 'Valo AI is a WhatsApp-first AI trading assistant. It monitors 200+ coin pairs around the clock and broadcasts high-quality setups with strong confluence directly to your phone.' },
                 { q: 'Do I need to do anything to receive signals?', a: 'No. Once you connect your WhatsApp, everything is automatic. No action required from you — just open WhatsApp and decide whether to execute.' },
                 { q: 'How often do signals arrive?', a: 'Frequency depends on market conditions. We prioritize quality over quantity, so signals only arrive when our strict technical confluence threshold is met.' },
                 { q: 'Is this suitable for beginners?', a: 'Yes. Every signal includes entry, stop loss, and multiple take profit targets, removing all technical complexity for you.' },
               ].map((item, i) => (
                 <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                   <h3 className="text-lg font-bold text-slate-900">{item.q}</h3>
                   <p className="mt-4 text-slate-500 leading-relaxed">{item.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-purple py-24 sm:py-32">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-purple-dark/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Trade smarter. Win faster.</h2>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-purple-light/80">Join 1,400+ traders already receiving complete, risk-managed signals to their WhatsApp. Your first 7 days are completely free.</p>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                 <Link to="/signup" className="rounded-full bg-white px-10 py-5 text-lg font-bold text-purple shadow-2xl transition-all hover:bg-slate-50 hover:translate-y-[-2px]">Start for free</Link>
                 <Link to="/pricing" className="rounded-full border-2 border-white/20 px-10 py-5 text-lg font-bold text-white hover:bg-white/10">Compare plans</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
