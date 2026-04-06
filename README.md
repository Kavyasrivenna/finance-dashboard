 Finance Dashboard UI

🔗 Live Demo: https://kavya-finance-dashboard.netlify.app/
📂 GitHub Repo: https://github.com/Kavyasrivenna/finance-dashboard

📌 Overview

The Finance Dashboard UI is a modern, responsive frontend application designed to help users visualize financial data, manage transactions, and gain insights.
This project demonstrates strong frontend engineering skills using a scalable architecture, clean UI design, and interactive data visualization.

🚀 Tech Stack

🧩Core Technologies
*React (with TypeScript)
*Vite
🗂 State Management
*Zustand
🎨 Styling & UI
*Tailwind CSS
*Framer Motion (animations)
*Lucide React (icons)
📊 Data Visualization
*Chart.js
*react-chartjs-2
⚙️ Utilities
*date-fns
*clsx
*tailwind-merge

✨ Features

📊 Dashboard Overview
Total Balance, Income, Expenses
Time-based trends chart
Category-wise spending breakdown
💳 Transactions Section
View transactions (Date, Amount, Category, Type)
🔍 Search transactions
↕️ Sort transactions
🎯 Filter transactions
✏️ Add/Edit (Admin only)
👥 Role-Based Access
Viewer → Read-only access
Admin → Full control (add/edit transactions)
Toggle between roles dynamically
📈 Insights
Highest spending category
Financial summaries
Simple data-driven observations
⚙️ State Management (Zustand)
Transactions data
Filters & search state
Role management
🎨 UI/UX Highlights
Minimal & clean design
Fully responsive (mobile + desktop)
Smooth animations (Framer Motion)
Handles empty states gracefully

🧠 Architecture
The project follows a modular and scalable structure:
finance-dashboard/
│
├── src/
│   ├── components/   # UI components
│   ├── store/        # Zustand state logic
│   ├── utils/        # Helper functions
│   ├── types/        # TypeScript types
│   └── App.tsx
│
├── public/
└── package.json

Screenshots

Dashboard View
Transactions Table
Insights Section
Admin Mode

⚡ Getting Started
# Clone the repository
git clone https://github.com/Kavyasrivenna/finance-dashboard.git

# Navigate into the project
cd finance-dashboard

# Install dependencies
npm install

# Run the app
npm run dev

# Build for production
npm run build

🔮 Future Improvements
🔐 Authentication system
🌐 Backend integration
💾 Persistent data storage
📊 Advanced analytics & reports

👩‍💻 Author
Kavya Sri
🔗 GitHub: https://github.com/Kavyasrivenna
