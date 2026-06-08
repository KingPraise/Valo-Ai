import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/web/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      
      login(data.token, data.user);
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

        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <Link to="/signup" className="font-extrabold text-purple underline-offset-4 hover:underline">Start free trial</Link>
        </div>
      </div>
    </div>
  );
}
