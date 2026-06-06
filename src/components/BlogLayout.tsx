import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Twitter, MessageCircle, Check, Linkedin, Facebook, Link2, Calendar, FileText } from 'lucide-react';

type Author = {
  name: string;
  role: string;
  image: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type RelatedPost = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
};

type BlogLayoutProps = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  updatedDate?: string;
  author: Author;
  heroImage: string;
  takeaways?: React.ReactNode;
  content: React.ReactNode;
  faqs: FAQ[];
  relatedPosts: RelatedPost[];
  tableOfContents?: { id: string; title: string }[];
  showToc?: boolean;
  showFaq?: boolean;
  showAuthor?: boolean;
  showRelated?: boolean;
  showCta?: boolean;
};

export default function BlogLayout({
  title,
  excerpt,
  category,
  readTime,
  date,
  updatedDate,
  author,
  heroImage,
  takeaways,
  content,
  faqs,
  relatedPosts,
  tableOfContents,
  showToc = true,
  showFaq = true,
  showAuthor = true,
  showRelated = true,
  showCta = true,
}: BlogLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* HEADER SECTION (Light background) */}
      <section className="pt-32 pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-slate-500 font-medium mb-8">
          <Link to="/" className="hover:text-purple transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/blog" className="hover:text-purple transition-colors">Blog</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-slate-900">{category}</span>
          <ChevronRight size={14} className="mx-2 hidden sm:block" />
          <span className="text-slate-400 hidden sm:block truncate max-w-xs">{title}</span>
        </nav>

        {/* Category Badge */}
        <div className="mb-6">
          <span className="bg-purple text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">{category}</span>
        </div>

        {/* Title & Excerpt */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl">{title}</h1>
        <p className="text-lg leading-relaxed text-slate-600 mb-10 max-w-3xl font-medium">{excerpt}</p>
        
        {/* Author, Meta & Share Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 pb-8 mt-10 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            {/* Author */}
            <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
              <img src={author.image} alt={author.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
              <div>
                <div className="text-slate-900 font-bold flex items-center gap-1 text-base">
                  By {author.name}
                  <span className="bg-purple text-white rounded-full p-0.5"><Check size={10} strokeWidth={4} /></span>
                </div>
                <div className="text-sm text-slate-500">{author.role}</div>
              </div>
            </div>
            {/* Social Share Buttons */}
            <div className="flex items-center gap-2 mt-1">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 text-xs font-bold">
                <Twitter size={14} /> X
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 text-xs font-bold">
                <Linkedin size={14} /> LinkedIn
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 text-xs font-bold">
                <Facebook size={14} /> Facebook
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 text-xs font-bold hidden sm:flex">
                <MessageCircle size={14} /> Telegram
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors text-slate-600 text-xs font-bold hidden sm:flex">
                <Link2 size={14} /> Copy Link
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:items-end justify-center gap-3 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
              <Calendar size={14} className="text-slate-400" />
              {date}
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
              <Clock size={14} className="text-slate-400" />
              {readTime}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-6 rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100">
          <img 
            src={heroImage} 
            alt={title} 
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      </section>

      {/* CONTENT WITH SIDEBAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* MAIN COLUMN */}
          <div className="w-full lg:w-2/3">
            
            {takeaways && (
              <div className="bg-purple/5 border border-purple/10 p-8 rounded-3xl mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center text-white"><Check size={16} strokeWidth={3} /></div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Key Takeaways</h3>
                </div>
                {takeaways}
              </div>
            )}

            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-purple hover:prose-a:text-purple-dark prose-img:rounded-3xl prose-blockquote:border-l-4 prose-blockquote:border-purple prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-800 prose-li:marker:text-purple">
              {content}
            </div>

            {showFaq !== false && faqs.length > 0 && (
              <div className="mt-16 mb-8" id="faqs">
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">FAQs</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <details className="group">
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-slate-900 hover:bg-slate-50 transition-colors">
                          <span>{faq.question}</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" w="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <p className="text-slate-600 p-6 pt-0 mb-0 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </p>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* END OF ARTICLE: ABOUT AUTHOR */}
            {showAuthor !== false && (
              <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-start gap-6">
                <img src={author.image} alt={author.name} className="w-20 h-20 rounded-full object-cover border border-slate-100 flex-shrink-0 shadow-sm" />
                <div>
                  <div className="text-sm font-black text-slate-900 mb-1 uppercase tracking-widest">About the Author</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-1">
                    {author.name}
                    <span className="bg-purple text-white rounded-full p-0.5"><Check size={12} strokeWidth={4} /></span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Crypto trader, educator, and founder of ValoAi. On a mission to help traders use AI and structured systems to make smarter trading decisions and build financial freedom.
                  </p>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-500 transition-colors"><Twitter size={14} /></div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"><Linkedin size={14} /></div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"><Facebook size={14} /></div>
                  </div>
                </div>
              </div>
            )}

            {/* END OF ARTICLE: RELATED ARTICLES */}
            {showRelated !== false && relatedPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.slice(0, 3).map(post => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                      <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 border border-slate-100">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-purple transition-colors leading-tight mb-2 line-clamp-2">{post.title}</h4>
                      <div className="text-xs text-slate-500 font-medium">{post.date} • {post.readTime}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FINAL CTA */}
            {showCta !== false && (
              <div className="mt-16 bg-slate-900 rounded-[32px] p-8 sm:p-12 border border-slate-800 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple rounded-full blur-[80px] opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Trade Smarter With ValoAi</h3>
                  <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
                    Get AI-powered crypto trade signals, entry zones, stop losses, take profits, and risk guidance.
                  </p>
                  <button 
                    onClick={() => navigate('/signup')} 
                    className="bg-purple text-white px-8 py-4 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-light transition-all active:scale-95 inline-block"
                  >
                    Start Your 7-Day Free Trial
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-1/3 space-y-10">
            
            {/* TABLE OF CONTENTS */}
            {showToc !== false && tableOfContents && tableOfContents.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 sticky top-32">
                <div className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest pl-4 border-l-2 border-slate-200">Table of Contents</div>
                <ul className="space-y-4">
                  {tableOfContents.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm font-medium">
                      <span className="text-purple w-4">{idx + 1}.</span>
                      <a href={`#${item.id}`} className="text-slate-600 hover:text-purple transition-colors leading-tight">{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SIDEBAR CTA */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-48 h-48 bg-purple rounded-full blur-[60px] opacity-20 pointer-events-none" />
               <h3 className="text-xl font-black text-white mb-4 relative z-10 tracking-tight">Trade Smarter<br/>With ValoAi</h3>
               <p className="text-slate-300 mb-6 relative z-10 text-sm leading-relaxed">
                 Get AI-powered trade signals with entry zones, stop loss, take profit levels, leverage & risk guidance.
               </p>
               <ul className="space-y-3 mb-8 relative z-10 text-sm font-medium text-slate-300">
                 <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div> Clear trade structure</li>
                 <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div> AI-powered market insights</li>
                 <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div> Risk management guidance</li>
                 <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div> Delivered on WhatsApp</li>
               </ul>
               <button 
                  onClick={() => navigate('/signup')} 
                  className="w-full bg-purple text-white px-6 py-4 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-light transition-all active:scale-95 relative z-10 flex items-center justify-center gap-2"
               >
                 Start Your 7-Day Free Trial <span>&rarr;</span>
               </button>
               <div className="text-center text-slate-500 text-[10px] mt-4 font-medium relative z-10">No credit card required.</div>
            </div>

            {/* ABOUT THE AUTHOR (SIDEBAR) */}
            {showAuthor !== false && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <div className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest pl-4 border-l-2 border-slate-200">About the Author</div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={author.image} alt={author.name} className="w-16 h-16 rounded-full object-cover border border-slate-100" />
                  <div>
                    <div className="font-black text-slate-900 flex items-center gap-1">
                      {author.name}
                      <span className="bg-purple text-white rounded-full p-0.5"><Check size={10} strokeWidth={4} /></span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">{author.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  Crypto trader, educator, and founder of ValoAi. On a mission to help traders use AI and structured systems to make smarter trading decisions and build financial freedom.
                </p>
                <div className="border-t border-slate-100 pt-6">
                  <div className="text-xs text-slate-500 font-bold mb-3">Follow {author.name}</div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-500 transition-colors"><Twitter size={14} /></div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"><span className="font-bold text-xs">YT</span></div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-pink-50 hover:text-pink-500 transition-colors"><span className="font-bold text-xs">IG</span></div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-500 transition-colors"><MessageCircle size={14} /></div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"><Linkedin size={14} /></div>
                  </div>
                </div>
              </div>
            )}

            {/* RELATED ARTICLES */}
            {showRelated !== false && relatedPosts.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <div className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest pl-4 border-l-2 border-slate-200">Related Articles</div>
                <div className="space-y-6">
                  {relatedPosts.map(post => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-4 items-start">
                      <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple transition-colors leading-tight line-clamp-2 mb-2">{post.title}</h4>
                        <div className="text-[10px] text-slate-500 font-medium">{post.date} • {post.readTime}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link to="/blog" className="inline-block mt-6 text-sm font-bold text-purple hover:underline">
                  View all articles &rarr;
                </Link>
              </div>
            )}
            
            {/* FEATURED IN */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest pl-4 border-l-2 border-slate-200">Featured In</div>
              <div className="flex flex-col gap-4 opacity-70">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-500">BINANCE</span>
                  <span className="text-sm font-black text-slate-500">BYBIT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-500">COINTELEGRAPH</span>
                  <span className="text-xs font-black text-slate-500">DABA SCHOOL</span>
                </div>
                <div className="flex items-center justify-center mt-2 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-black text-slate-500 text-center uppercase tracking-widest">Global School of Crypto & Web3</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}
