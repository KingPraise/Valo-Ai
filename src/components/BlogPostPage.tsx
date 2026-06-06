import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BlogLayout from './BlogLayout';

// common data
const commonAuthor = {
  name: "Chris Ani",
  role: "Founder, ValoAi",
  image: "/images/chris_ani.jpeg"
};

const bonusFAQs = [
  {
    question: "What is ValoAi?",
    answer: "ValoAi is an AI-powered crypto trading assistant designed to help traders make more structured decisions through trade signals, market insights, risk management guidance, and educational content."
  },
  {
    question: "Does ValoAi guarantee profits?",
    answer: "No. No trading platform, signal provider, or AI tool can guarantee profits. Trading always involves risk. ValoAi is designed to help traders make more informed decisions, not eliminate risk."
  },
  {
    question: "Who is Chris Ani?",
    answer: "Chris Ani is the founder of ValoAi, a crypto trader, educator, and entrepreneur. He is also the founder of Daba School and has helped thousands of people learn about crypto, Web3, trading, and digital opportunities."
  },
  {
    question: "How can I start using ValoAi?",
    answer: "You can start by visiting www.valoai.app and activating the free trial. New users can explore ValoAi's trade signals, trading education, and market analysis tools before choosing a subscription plan."
  },
  {
    question: "Why is ValoAi different from typical signal groups?",
    answer: "ValoAi focuses on structured trading rather than simply providing buy or sell alerts. Each signal includes trade bias, entry zones, stop loss levels, take profit targets, leverage guidance, position sizing, and expected trade duration to encourage disciplined trading."
  }
];

const allPosts = [
  {
    id: 'why-most-beginner-traders-lose-money-in-futures',
    title: 'Why Most Beginner Traders Lose Money in Futures',
    category: 'Trading Psychology',
    image: '/images/futures_trading.png',
    date: 'May 20, 2026',
    readTime: '7 min read'
  },
  {
    id: 'why-discipline-is-more-important-than-prediction',
    title: 'Why Discipline Is More Important Than Prediction',
    category: 'Trading Psychology',
    image: '/images/trading_discipline.png',
    date: 'May 18, 2026',
    readTime: '6 min read'
  },
  {
    id: 'how-ai-can-help-traders-make-faster-market-decisions',
    title: 'How AI Can Help Traders Make Faster Market Decisions',
    category: 'AI & Tech',
    image: '/images/ai_trading.png',
    date: 'May 15, 2026',
    readTime: '7 min read'
  }
];

function InContentCTA() {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl my-10 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple rounded-full blur-[40px] opacity-20 pointer-events-none" />
      <h4 className="text-xl font-black text-white mt-0 mb-4 tracking-tight">Want Structured Trade Signals?</h4>
      <p className="text-slate-300 font-medium text-sm mb-6">ValoAi provides structured trades to help you execute better:</p>
      <ul className="text-slate-300 space-y-2 mb-8 list-none pl-0">
         <li className="flex items-center gap-2 m-0"><span className="text-emerald-400">✓</span> Trade Bias</li>
         <li className="flex items-center gap-2 m-0"><span className="text-emerald-400">✓</span> Entry Zone</li>
         <li className="flex items-center gap-2 m-0"><span className="text-emerald-400">✓</span> Stop Loss</li>
         <li className="flex items-center gap-2 m-0"><span className="text-emerald-400">✓</span> TP1–TP3</li>
         <li className="flex items-center gap-2 m-0"><span className="text-emerald-400">✓</span> Expected Trade Duration</li>
      </ul>
      <Link to="/signup" className="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-black text-sm hover:bg-slate-50 transition-colors no-underline">
        Start Free Trial
      </Link>
    </div>
  );
}

// Data fetching helper
function getPostData(id: string) {
  const related = allPosts.filter(p => p.id !== id);

  if (id === 'why-most-beginner-traders-lose-money-in-futures') {
    return {
      title: "Why Most Beginner Traders Lose Money in Futures",
      excerpt: "Futures trading can be profitable, but most beginners lose money because they trade without structure, risk control, and discipline.",
      category: "BEGINNER TRADING GUIDE",
      readTime: "7 min read",
      date: "May 20, 2026",
      updatedDate: "June 2026",
      author: commonAuthor,
      heroImage: "/images/futures_trading.png",
      tableOfContents: [
        { id: "futures-trading-is-not-just-about-direction", title: "Futures Trading Is Not Just About Direction" },
        { id: "the-biggest-reasons-beginners-lose-money", title: "The Biggest Reasons Beginners Lose Money" },
        { id: "why-stop-loss-matters", title: "Why Stop Loss Matters" },
        { id: "why-discipline-beats-emotion", title: "Why Discipline Beats Emotion" },
        { id: "how-valoai-helps-traders", title: "How ValoAi Helps Traders" },
        { id: "faqs", title: "FAQs" }
      ],
      takeaways: (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-slate-700 font-medium mb-0 mt-2 list-none pl-0 text-sm">
          <li className="flex items-start gap-3 m-0"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white shrink-0 mt-0.5"><Check size={12} strokeWidth={4} /></div> Most beginners lose because of leverage abuse</li>
          <li className="flex items-start gap-3 m-0"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white shrink-0 mt-0.5"><Check size={12} strokeWidth={4} /></div> Stop loss is essential</li>
          <li className="flex items-start gap-3 m-0"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white shrink-0 mt-0.5"><Check size={12} strokeWidth={4} /></div> Trading discipline matters more than prediction</li>
          <li className="flex items-start gap-3 m-0"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white shrink-0 mt-0.5"><Check size={12} strokeWidth={4} /></div> Position sizing protects capital</li>
          <li className="flex items-start gap-3 m-0"><div className="w-5 h-5 rounded-full bg-purple flex items-center justify-center text-white shrink-0 mt-0.5"><Check size={12} strokeWidth={4} /></div> Structure beats emotion</li>
        </ul>
      ),
      faqs: [
        {
          question: "Is futures trading good for beginners?",
          answer: "Yes, but beginners should approach futures trading carefully. Futures trading involves leverage, which can amplify both profits and losses. New traders should focus on learning risk management, using low leverage, and following a structured trading plan before risking significant capital."
        },
        {
          question: "What leverage should beginners use?",
          answer: "Most beginners should start with low leverage, typically between 2x and 5x. Higher leverage increases risk significantly and can lead to liquidation from small market movements. The goal is not to maximize profits quickly but to protect capital while learning."
        },
        {
          question: "How much should I risk per trade?",
          answer: "A standard rule in professional trading is to risk only 1% to 2% of your total trading account balance on any single trade. Position sizing is critical to protecting your capital during cold streaks."
        },
        {
          question: "What is a stop loss?",
          answer: "A stop loss is an automated order to close a trade at a specific price to prevent further losses. It protects your account when a trade moves against you by automatically limiting the loss to a predefined amount."
        },
        {
          question: "How does ValoAi work?",
          answer: "ValoAi analyzes the market and provides structured trade setups (signals). It gives you a clear trade bias, entry zone, stop loss, take profit targets, leverage guidance, and expected trade duration, helping you execute trades with discipline."
        },
        {
          question: "Can AI predict the market?",
          answer: "No. AI cannot predict the market with certainty because markets are influenced by unpredictable human behavior and news. However, AI can process data faster, identify patterns, and structure trades to help you manage risk and execute better."
        },
        ...bonusFAQs
      ],
      relatedPosts: related,
      content: (
        <>
          <p className="lead text-xl text-slate-600">
            Futures trading looks exciting from the outside. You see people posting screenshots of profits. You hear stories of traders turning small accounts into big money. You see coins moving 10%, 20%, or even 50% in a short time, and it feels like the market is full of opportunity.
          </p>

          <p>
            Then a beginner enters the market... and very quickly, the market teaches them a hard lesson.
          </p>

          <p>
            This is why many beginners lose money in futures. Not because futures trading is impossible, but because they approach it without a system.
          </p>

          <h3 id="futures-trading-is-not-just-about-direction" className="text-2xl mt-12 mb-6">1. Futures Trading Is Not Just About Direction</h3>
          <p>
            Most beginners think trading is only about choosing whether the market will go up or down. But professional trading is not only about direction. A good trade needs more than a guess.
          </p>
          
          <blockquote>
            <p className="text-lg font-bold">Being right is not enough.<br/>You must also manage the trade correctly.</p>
          </blockquote>

          <p>
            A good trade requires a clear bias, entry zone, stop loss, take profit levels, position size, risk management, and emotional discipline.
          </p>


          <h3 id="the-biggest-reasons-beginners-lose-money" className="text-2xl mt-12 mb-6">2. The Biggest Reasons Beginners Lose Money in Futures</h3>
          <p>Here are the most common reasons beginners lose money in futures trading.</p>

          <div className="space-y-4 my-8">
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl cursor-pointer hover:border-purple/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <div className="font-bold text-slate-900 w-1/3">They Use Too Much Leverage</div>
              <div className="text-sm text-slate-500 w-2/3">High leverage can wipe your account within a small market move.</div>
              <div className="text-slate-300 ml-auto select-none">&rarr;</div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl cursor-pointer hover:border-purple/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <div className="font-bold text-slate-900 w-1/3">They Enter Without a Plan</div>
              <div className="text-sm text-slate-500 w-2/3">No plan = emotional trades. Emotional trades lead to big losses.</div>
              <div className="text-slate-300 ml-auto select-none">&rarr;</div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl cursor-pointer hover:border-purple/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <div className="font-bold text-slate-900 w-1/3">They Ignore Stop Loss</div>
              <div className="text-sm text-slate-500 w-2/3">No stop loss means one bad trade can destroy your account.</div>
              <div className="text-slate-300 ml-auto select-none">&rarr;</div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl cursor-pointer hover:border-purple/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
              <div className="font-bold text-slate-900 w-1/3">They Chase the Market</div>
              <div className="text-sm text-slate-500 w-2/3">Entering late because of FOMO usually ends in losses.</div>
              <div className="text-slate-300 ml-auto select-none">&rarr;</div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl cursor-pointer hover:border-purple/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm shrink-0">5</div>
              <div className="font-bold text-slate-900 w-1/3">They Trade Too Many Times</div>
              <div className="text-sm text-slate-500 w-2/3">Overtrading leads to mistakes, fees, and emotional exhaustion.</div>
              <div className="text-slate-300 ml-auto select-none">&rarr;</div>
            </div>
          </div>
          
          <div className="text-center mt-6 mb-12">
            <button className="text-purple font-bold text-sm border border-purple px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">Read More Reasons &darr;</button>
          </div>

          <h3 id="why-stop-loss-matters" className="text-2xl mt-12 mb-6">3. Why Stop Loss Matters</h3>
          <p>
            Beginners often hate stop-loss because they see it as accepting defeat. A stop loss is not your enemy—it is protection. The purpose of a stop loss is simple: It protects your account when the market proves your trade idea wrong.
          </p>

          <InContentCTA />

          <h3 id="why-discipline-beats-emotion" className="text-2xl mt-12 mb-6">4. Why Discipline Beats Emotion</h3>
          <p>
            Discipline in trading means doing what your system says, even when your emotions disagree. It means waiting for the right entry, executing stop losses, taking profits when planned, and avoiding random emotional entries.
          </p>
          
          <h3 id="how-valoai-helps-traders" className="text-2xl mt-12 mb-6">5. How ValoAi Helps Traders</h3>
          <p>
            A beginner futures trader should not begin by trying to become rich overnight. They should begin by learning how to survive. That means: using low leverage, respecting stop loss, avoiding overtrading, and following a structured trading plan. ValoAi packages these principles into every signal it broadcasts.
          </p>
        </>
      )
    };
  }

  if (id === 'how-ai-can-help-traders-make-faster-market-decisions') {
    return {
      title: "How AI Can Help Traders Make Faster Market Decisions",
      excerpt: "Crypto moves fast. AI can help traders analyze price action, structure, risk, and opportunities faster — without relying on emotion or guesswork.",
      category: "AI & Tech",
      readTime: "7 min read",
      date: "May 15, 2026",
      updatedDate: "June 2026",
      author: commonAuthor,
      heroImage: "/images/ai_trading.png",
      tableOfContents: [
        { id: "the-problem-traders-face-too-much-information", title: "Traders Face Too Much Information" },
        { id: "ai-helps-traders-reduce-decision-fatigue", title: "Reduce Decision Fatigue" },
        { id: "speed-matters-in-crypto-trading", title: "Speed Matters" },
        { id: "ai-can-help-with-risk-planning", title: "AI Risk Planning" },
        { id: "faqs", title: "FAQs" }
      ],
      takeaways: (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-slate-700 font-medium mb-0 mt-2 list-none pl-0">
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> AI significantly reduces decision fatigue</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> Speed is critical in 24/7 crypto markets</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> AI helps identify trade direction/bias instantly</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> AI structures complex risk calculations</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> Human discipline + AI = the winning strategy</li>
        </ul>
      ),
      faqs: [
        {
          question: "Can AI predict the crypto market?",
          answer: "No. AI cannot predict the market with certainty. Markets are influenced by many unpredictable factors. AI can help analyze data, identify patterns, and improve decision-making, but it cannot guarantee outcomes."
        },
        {
          question: "How does AI help traders make decisions faster?",
          answer: "AI can process large amounts of market information quickly, identify potential opportunities, organize data, and provide structured insights. This helps traders spend less time gathering information and more time executing their strategy."
        },
        {
          question: "Will AI replace traders?",
          answer: "No. AI is best used as a tool that supports traders. Human judgment, risk management, emotional control, and decision-making remain essential. The strongest approach is combining human discipline with AI-powered insights."
        },
        {
          question: "How does ValoAi generate trade ideas?",
          answer: "ValoAi analyzes market conditions using structured trading logic that considers factors such as market structure, price action, volume, momentum, and risk management principles. It then presents trade opportunities in a clear and actionable format."
        },
        {
          question: "Can beginners use AI trading tools?",
          answer: "Yes. AI tools can be especially useful for beginners because they simplify complex market information. However, beginners should still learn trading fundamentals and understand the risks involved."
        },
        {
          question: "What are the limitations of AI in trading?",
          answer: "AI cannot eliminate risk, guarantee profits, or predict unexpected market events. It is a decision-support tool rather than a substitute for proper trading education, discipline, and risk management."
        },
        {
          question: "Is AI better than traditional indicators?",
          answer: "AI and traditional indicators serve different purposes. Indicators provide specific market measurements, while AI can analyze multiple inputs simultaneously and present information in a structured way. Many traders benefit from using both together."
        }
      ],
      relatedPosts: related,
      content: (
        <>
          <p className="lead">
            Crypto trading moves fast. A coin can break out in minutes. A setup can become invalid quickly. A strong move can turn into a rejection. A good entry can disappear before a trader finishes analyzing.
          </p>
          <p>
            By the time many traders check the chart, look at indicators, read market sentiment, compare timeframes, and decide what to do, the opportunity may already be gone. That is why AI is becoming important in trading.
          </p>
          
          <InContentCTA />

          <div className="bg-slate-50 border-l-4 border-purple p-6 rounded-r-2xl my-8">
            <p className="m-0 font-medium text-slate-700">
              AI does not remove risk. AI does not guarantee profit. AI does not replace discipline. But AI can help traders process market information faster, reduce confusion, and make more structured decisions. <strong>That is the role of ValoAi.</strong>
            </p>
          </div>

          <h3 id="the-problem-traders-face-too-much-information">Traders Face Too Much Information</h3>
          <p>
            A crypto trader has to look at many things before entering a trade: Price action, support, resistance, market structure, volume, trend direction, entry zones, stop losses, leverage, and macro news.
          </p>
          <p>
            For a beginner, this can feel overwhelming. Even experienced traders can miss important details when the market is moving quickly. AI can process and organize this information faster than humans can verify it manually.
          </p>

          <h3 id="ai-helps-traders-reduce-decision-fatigue">Reduce Decision Fatigue</h3>
          <p>
            Decision fatigue happens when a trader becomes mentally tired from making too many decisions in a volatile market. The more confused a trader becomes, the more likely they are to make emotional decisions. AI helps by turning messy market information into a clearer structure.
          </p>

          <h3 id="speed-matters-in-crypto-trading">Speed Matters in Crypto Trading</h3>
          <p>
            In traditional markets, traders may have more time to react. But crypto trades 24/7. Markets move during the day, at night, on weekends, and during global news events. A trader who analyzes too slowly may enter late. AI gives users faster, structured trade signals.
          </p>

          <h3 id="ai-can-help-with-risk-planning">AI Risk Planning</h3>
          <p>
            A trade is not complete without risk planning. Before entering, a trader must know their invalidation point. Many beginners ignore these questions. But good trading starts with risk management. Tools like ValoAi compute appropriate stop loss levels, leverage limits, and position sizing instantly, leaving the trader to just execute the plan with discipline.
          </p>
        </>
      )
    };
  }

  // why-discipline-is-more-important-than-prediction
  return {
    title: "Why Discipline Is More Important Than Prediction",
    excerpt: "In crypto trading, the best traders are not always the ones who predict every move. They are the ones who follow a system, manage risk, and stay disciplined.",
    category: "Trading Psychology",
    readTime: "6 min read",
    date: "May 18, 2026",
    updatedDate: "June 2026",
    author: commonAuthor,
    heroImage: "/images/trading_discipline.png",
    tableOfContents: [
      { id: "the-problem-with-prediction-based-trading", title: "The Problem With Prediction-Based Trading" },
      { id: "discipline-means-following-the-plan", title: "Discipline Means Following the Plan" },
      { id: "faqs", title: "FAQs" }
    ],
    takeaways: (
       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-slate-700 font-medium mb-0 mt-2 list-none pl-0">
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> You don't need to catch every move</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> You must respect risk and follow plans</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> Execution matters more than prediction</li>
          <li className="flex items-start gap-2 m-0"><span className="text-purple font-bold">✓</span> Protect your account over quick profits</li>
        </ul>
    ),
    faqs: [
        {
          question: "Can AI predict the crypto market?",
          answer: "No. AI cannot predict the market with certainty. Markets are influenced by many unpredictable factors. AI can help analyze data, identify patterns, and improve decision-making, but it cannot guarantee outcomes."
        },
        {
          question: "How does AI help traders make decisions faster?",
          answer: "AI can process large amounts of market information quickly, identify potential opportunities, organize data, and provide structured insights. This helps traders spend less time gathering information and more time executing their strategy."
        },
        {
          question: "Will AI replace traders?",
          answer: "No. AI is best used as a tool that supports traders. Human judgment, risk management, emotional control, and decision-making remain essential. The strongest approach is combining human discipline with AI-powered insights."
        },
        {
          question: "How does ValoAi generate trade ideas?",
          answer: "ValoAi analyzes market conditions using structured trading logic that considers factors such as market structure, price action, volume, momentum, and risk management principles. It then presents trade opportunities in a clear and actionable format."
        },
        {
          question: "Can beginners use AI trading tools?",
          answer: "Yes. AI tools can be especially useful for beginners because they simplify complex market information. However, beginners should still learn trading fundamentals and understand the risks involved."
        },
        {
          question: "What are the limitations of AI in trading?",
          answer: "AI cannot eliminate risk, guarantee profits, or predict unexpected market events. It is a decision-support tool rather than a substitute for proper trading education, discipline, and risk management."
        },
        {
          question: "Is AI better than traditional indicators?",
          answer: "AI and traditional indicators serve different purposes. Indicators provide specific market measurements, while AI can analyze multiple inputs simultaneously and present information in a structured way. Many traders benefit from using both together."
        }
    ],
    relatedPosts: related,
    content: (
     <>
        <p className="lead">
          Most traders enter the market looking for predictions. They want to know: Will Bitcoin go up? Will this altcoin pump? Is this the next big move? Prediction feels powerful. When a trader predicts correctly, they feel smart.
        </p>
        <p>
          But the truth is this: <strong>Prediction alone does not make you a good trader.</strong>
        </p>

        <InContentCTA />

        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl my-8">
          <h4 className="text-emerald-800 font-bold mt-0">Trading is about execution.</h4>
          <p className="text-emerald-700 text-sm mb-0">
            It is about when to enter, where to exit, how much to risk, when to take profit, and when to stay out. That is why discipline is more important than prediction.
          </p>
        </div>

        <h3 id="the-problem-with-prediction-based-trading">The Problem With Prediction-Based Trading</h3>
        <p>
          Prediction-based trading makes traders obsessed with being right. They want to prove that their market view is correct. So when the market goes against them, they do not exit. Sometimes, they may eventually be right. But in futures trading, being eventually right can still result in liquidation if you don't manage your risk first.
        </p>
        
        <h3 id="discipline-means-following-the-plan">Discipline Means Following the Plan</h3>
        <p>
          Discipline in trading means doing what your system says, even when your emotions disagree. It means waiting for the right entry, executing stop losses, taking profits when planned, and avoiding random emotional entries.
        </p>
        
        <p>
          Discipline is not exciting. It does not always feel dramatic. But discipline is what protects a trader from destroying their account. The market will always create temptation. But the disciplined trader asks: <em>“Is this a valid trade according to my system?”</em>
        </p>
     </>
    )
  };
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'posts', id);
        // Timeout after 3 seconds to avoid infinite loading if Firebase is disconnected/deleted
        const docSnap = await Promise.race([
          getDoc(docRef),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
        ]);
        
        if (docSnap.exists() && docSnap.data().status === 'Published') {
          const data = docSnap.data();
          setPostData({
            ...data,
            heroImage: data.image || '/images/ai_trading.png',
            date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) : 'Recent',
            updatedDate: data.updatedAt?.toDate ? data.updatedAt.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
            author: { name: data.author, role: '', image: '/images/chris_ani.jpeg' },
            tableOfContents: [],
            faqs: [],
            takeaways: null,
            content: <div dangerouslySetInnerHTML={{ __html: data.content }} />,
            relatedPosts: allPosts.filter(p => p.id !== id),
            showToc: data.showToc !== false,
            showFaq: data.showFaq !== false,
            showAuthor: data.showAuthor !== false,
            showRelated: data.showRelated !== false,
            showCta: data.showCta !== false,
          });
        } else {
          setPostData(getPostData(id));
        }
      } catch (e) {
        console.error("Error fetching post, falling back to hardcoded data:", e);
        setPostData(getPostData(id));
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (!id) return <div>Post not found.</div>;

  if (loading) {
    return <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 flex justify-center text-slate-500 font-medium">Loading post...</div>;
  }

  if (!postData) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h1>
        <Link to="/blog" className="text-purple hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Blog
        </Link>
      </div>
    );
  }

  return <BlogLayout {...postData} />;
}
