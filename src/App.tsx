import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserDashboard from './components/UserDashboard';
import ReferralDashboard from './components/ReferralDashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback for cases where element might not be in DOM yet
        const timer = setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const showNavAndFooter = !['/dashboard', '/referral', '/admin'].some(path => location.pathname.startsWith(path));

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToAnchor />
      {showNavAndFooter && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/*" element={<UserDashboard />} />
          <Route path="/referral" element={<ReferralDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      {showNavAndFooter && <Footer />}
    </div>
  );
}

import { AuthProvider } from './context/AuthContext';

// Wrapper to handle useLocation in App
export function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
