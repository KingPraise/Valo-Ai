import React from 'react';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user doc exists, else create it
      const userDocRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userDocRef);
      
      if (!userSnap.exists()) {
         const referralCode = result.user.uid.substring(0, 5).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
         const userData = {
            uid: result.user.uid,
            firstName: result.user.displayName?.split(' ')[0] || '',
            lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
            email: result.user.email,
            whatsapp: '',
            country: '',
            plan: 'free',
            status: 'trial',
            trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            planExpiresAt: null,
            referrerId: null,
            referralCode,
            isAdmin: false,
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, userData);
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900 mb-8">
             <div className="h-3 w-3 rounded-full bg-purple" />
             Valo AI
           </Link>
           <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h1>
           <p className="mt-2 text-slate-500">Log in to your Valo AI account</p>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-sm border border-slate-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red text-xs font-bold rounded-xl border border-red/10">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-purple">Forgot?</a>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm focus:border-purple focus:ring-4 focus:ring-purple/5 outline-hidden transition-all"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-xl bg-purple py-4 font-extrabold text-white shadow-xl shadow-purple/20 transition-all hover:bg-purple-dark hover:translate-y-[-1px] active:translate-y-0 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log in to dashboard'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-slate-300">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-black uppercase tracking-widest">or</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-100 py-3.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <Link to="/signup" className="font-extrabold text-purple underline-offset-4 hover:underline">Start free trial</Link>
        </div>
      </div>
    </div>
  );
}
