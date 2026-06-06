export enum SubscriptionStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export type PlanId = 'free' | 'monthly' | 'qtr' | '6months' | 'yearly';

export interface UserData {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  country: string;
  plan: PlanId;
  status: SubscriptionStatus;
  trialExpiresAt: any;
  planExpiresAt: any;
  referrerId?: string;
  referralCode: string;
  isAdmin: boolean;
  balance?: number;
  totalPaidOut?: number;
  pendingEarnings?: number;
  totalEarnings?: number;
  payoutMethod?: string;
  createdAt: any;
}

export interface Signal {
  id: string;
  pair: string;
  bias: 'Long' | 'Short';
  entryZone: string;
  stopLoss: string;
  takeProfits: string[];
  leverage: string;
  duration: string;
  riskRule?: string;
  priceAtSignal?: string;
  createdAt: any;
}

export interface Transaction {
  id: string;
  userId: string;
  planId: PlanId;
  amount: number;
  originalAmount: number;
  couponCode?: string;
  paymentMethod: string;
  status: string;
  createdAt: any;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  amount: number;
  method: string;
  accountDetails: string;
  status: 'pending' | 'processing' | 'paid' | 'rejected';
  createdAt: any;
}

export interface Commission {
  id: string;
  referrerId: string;
  referredUserId: string;
  transactionId: string;
  amount: number;
  status: 'pending' | 'cleared' | 'paid';
  createdAt: any;
}

export interface Coupon {
  code: string;
  pct: number;
  fixed: number;
  uses: number;
  limit: number;
  expiresAt?: any;
  isActive: boolean;
}
