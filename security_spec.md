# Security Specification — Valo AI

## Data Invariants
1. **Users**: Users can only read and write their own profile. Admins can read all profiles. Only system/admin can update `isAdmin` or `referralCode`.
2. **Signals**: Read-only for authenticated users with active trial or plan. Write-only for admins.
3. **Transactions**: Users can read their own transactions. Only system can create/update transactions (simulated on client for demo). Actually, write access to transactions should be restricted but is usually created by the payment webhook or a secure function. In this client-only demo, we'll allow users to create their own transaction doc if it matches their UID.
4. **Referrals (Commissions)**: Users can read commissions where they are the `referrerId`. Only system/admin can create/update.
5. **PayoutRequests**: Users can create payout requests for themselves and read their own. Admins can read and update status.
6. **Coupons**: Read-only for all users (to apply at checkout). Write-only for admins.

## The "Dirty Dozen" Payloads

1. **Identity Spoofing**: Attempt to update someone else's user document.
2. **Privilege Escalation**: Attempt to set `isAdmin: true` during signup.
3. **Price Poisoning**: Attempt to create a transaction with `amount: 0` for a 'yearly' plan.
4. **Referral Theft**: Attempt to update a user's `referrerId` after creation.
5. **Signal Injection**: Attempt to create a signal as a regular user.
6. **Payout Fraud**: Attempt to create a payout request for a UID other than the authenticated user.
7. **Coupon Overwrite**: Attempt to change a coupon's `pct` to 100%.
8. **Shadow Field**: Adding `isVerified: true` to a user profile.
9. **Status Bypass**: Manually updating `planExpiresAt` to a future date as a user.
10. **Resource Exhaustion**: Sending a 1MB string as a WhatsApp number.
11. **Ghost Commission**: Creating a commission record for oneself.
12. **Terminal State Break**: Updating a 'paid' payout request back to 'pending'.

## Test Runner (Draft)
I will implement security rules that block these.

