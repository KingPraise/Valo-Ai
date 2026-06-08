import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserData, SubscriptionStatus } from '../types';

interface WebUser {
  id: string;
  email: string;
  phone: string;
  name?: string;
}

interface AuthContextType {
  user: WebUser | null;
  userData: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  login: (token: string, user: WebUser) => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  refreshUserData: async () => {},
});

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WebUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserData(null);
  };

  const login = (token: string, userObj: WebUser) => {
    localStorage.setItem('token', token);
    setUser(userObj);
    refreshUserData();
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/web/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) logout();
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      
      setUser({
        id: data.user._id,
        email: data.user.email,
        phone: data.user.phone,
        name: data.user.name,
      });

      // Map backend subscription state to local UserData type
      const sub = data.subscription;
      let status = SubscriptionStatus.EXPIRED;
      let plan = 'free';
      let trialExpiresAt = null;
      let planExpiresAt = null;

      if (sub) {
        if (sub.status === 'active') {
          if (sub.type === 'trial') {
             status = SubscriptionStatus.TRIAL;
             trialExpiresAt = sub.trialExpiresAt;
          } else {
             status = SubscriptionStatus.ACTIVE;
             plan = sub.plan;
             planExpiresAt = sub.subscriptionExpiresAt;
          }
        }
      }

      setUserData({
        uid: data.user._id,
        firstName: data.user.name?.split(' ')[0] || '',
        lastName: data.user.name?.split(' ').slice(1).join(' ') || '',
        email: data.user.email,
        whatsapp: data.user.phone,
        country: '',
        plan: plan as any,
        status: status,
        trialExpiresAt,
        planExpiresAt,
        referralCode: data.user.referralCode || '',
        isAdmin: false, // We'll handle admin separately
        createdAt: data.user.createdAt,
      });

    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin: userData?.isAdmin || false, login, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
