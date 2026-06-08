<div align="center">
  <img src="public/images/ai_trading.png" alt="ValoAi Banner" width="800" style="border-radius: 16px; margin-bottom: 20px;" />
  
  # ValoAi
  **Intelligence that pays.**
  
  <p>An AI-powered crypto trading platform providing structured trade signals, market insights, and trading psychology education for disciplined traders.</p>

  ---
</div>

## 🚀 Features

- **Structured Trade Signals:** Provides fully risk-managed setups including Trade Bias, Entry Zones, Stop Loss levels, Take Profit targets (TP1–TP3), and Leverage guidance.
- **Dynamic Blog & Education:** A high-end reading experience with dynamic routing, dedicated author boxes, rich HTML content, and automatic Related Posts matching.
- **User Dashboard:** Seamless and responsive user portal with dynamic subscription status mapping and WhatsApp integration tracking.
- **Referral Dashboard:** Detailed analytics for referrers to track downlines and total commissions with integrated charts and automated link generation.
- **Admin Dashboard & CMS (`/admin` and `/admin/cms`):** A bespoke admin portal allowing you to:
  - Oversee global operations, signal broadcasts, subscriber metrics, and real-time payout requests.
  - Generate, edit, and format rich-text HTML blog posts with specific component toggling.
  - Approve payouts directly impacting user account balances via Firebase integration.
- **Premium UI/UX:** Meticulously mapped from original HTML mockups using a robust Custom Vanilla CSS design system tailored for elite aesthetics. 

## 🛠️ Tech Stack

- **Frontend:** React + Vite + React Router DOM
- **Styling:** Custom Vanilla CSS Design System + Framer Motion
- **Database:** Firebase Firestore (Real-time NoSQL)
- **Authentication:** Firebase Auth
- **Icons:** Lucide React

## 💻 Running Locally

### Prerequisites
- Node.js (v16 or higher)
- A Firebase Project (with Firestore and Auth enabled)

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/KingPraise/Valo-Ai.git
   cd Valo-Ai
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Firebase Configuration**
   In \`src/lib/firebase.ts\`, replace the keys in \`firebaseConfig\` with your own Firebase project credentials.
   *(Ensure your Firestore Database is initialized and Rules are set to allow reads for the blog, and authenticated writes for the CMS).*

4. **Start the Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will run at \`http://localhost:5173\`.

## 🌐 Deploying to Production

This project is optimized to be deployed seamlessly to **Netlify** or **Vercel**. 
Simply connect your GitHub repository to your hosting provider, and set the build command to:
\`\`\`bash
npm run build
\`\`\`
The output directory will be \`dist\`.

> **Note on Admin Access for Production:**  
> The \`/admin\` and \`/admin/cms\` pages are protected by Firebase Auth and firestore document rules. To view these pages on your production server:
> 1. Sign up/Log in using your account on the deployed site.
> 2. Go to your Firebase Console -> Firestore Database -> \`users\` collection.
> 3. Find your user document and set the \`isAdmin\` boolean field to \`true\`.
> 4. Refresh your browser; you will now have full access to \`/admin\` and \`/admin/cms\`.

---
*Created with focus on trading discipline, risk management, and beautiful design.*