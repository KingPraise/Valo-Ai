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
- **Custom Built CMS:** A bespoke Admin Dashboard (`/admin/cms`) that allows admins to:
  - Write and format posts using a built-in rich text editor.
  - Upload featured images.
  - Toggle specific article components (Table of Contents, FAQs, Author Box, Related Posts, CTA blocks).
  - Draft or Publish directly to the live site.
- **Premium UI/UX:** Built with a custom design system featuring glassmorphism, dynamic gradients, and smooth micro-animations using Framer Motion.

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Custom Vanilla CSS (Tailwind-inspired structure) + Framer Motion
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
   In the root of the project, replace the keys in \`firebase-applet-config.json\` with your own Firebase project credentials:
   \`\`\`json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "your-app.firebaseapp.com",
     "projectId": "your-project-id",
     "storageBucket": "your-app.firebasestorage.app",
     "messagingSenderId": "YOUR_SENDER_ID",
     "appId": "YOUR_APP_ID"
   }
   \`\`\`
   
   *(Ensure your Firestore Database is initialized and Rules are set to allow reads for the blog, and authenticated writes for the CMS).*

4. **Start the Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will run at `http://localhost:3000`.

## 🌐 Deploying to Production

This project is optimized to be deployed seamlessly to platforms like **Netlify** or **Vercel**. 
Simply connect your GitHub repository to your hosting provider, and set the build command to:
\`\`\`bash
npm run build
\`\`\`
The output directory will be `dist`.

---
*Created with focus on trading discipline, risk management, and beautiful design.*