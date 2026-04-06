# 💰 Finance Dashboard UI

A clean and interactive **Finance Dashboard UI** built to visualize financial data, manage transactions, and provide meaningful insights into spending patterns.

This project demonstrates strong frontend engineering skills including **component-based architecture, state management, and responsive design**.

---

## 🚀 Live Demo

🔗 https://kavyafinace.netlify.app/

## 📂 Repository

🔗 https://github.com/Kavyasrivenna/finance-dashboard

---

## 🎯 Objective

This project was built as part of a frontend evaluation assignment to:

* Design an intuitive dashboard interface
* Structure reusable components effectively
* Handle application state efficiently
* Present financial data clearly using visualizations

---

## 🧩 Features (Mapped to Requirements)

### 1. 📊 Dashboard Overview

* Summary cards:

  * Total Balance
  * Total Income
  * Total Expenses
* Time-based visualization:

  * Balance trend chart
* Category-based visualization:

  * Spending breakdown chart

---

### 2. 💳 Transactions Section

* Displays transaction details:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)

* Functionalities:

  * Search transactions
  * Sorting (including date-based sorting)
  * Filtering by category/type

---

### 3. 👤 Role-Based UI (Frontend Simulation)

* Role toggle implemented:

  * **Viewer**

    * Can only view data
  * **Admin**

    * Can add/edit transactions

* UI dynamically changes based on selected role

---

### 4. 📈 Insights Section

* Highlights key financial insights:

  * Highest spending category
  * Monthly comparison
  * Basic spending observations

---

### 5. 🧠 State Management

* Managed using React state:

  * Transactions data
  * Filters & search
  * Selected user role

* Ensures smooth UI updates and interaction flow

---

### 6. 🎨 UI & UX

* Clean and minimal design
* Responsive across devices
* Structured layout for easy navigation
* Handles edge cases like filtered results

---

## 🏗️ Architecture & Approach

The project follows a **component-based architecture** using React.

### 🔹 Key Design Principles:

* Separation of concerns
* Reusable UI components
* Clear data flow

### 🔹 Component Structure:

* `Dashboard`

  * Summary Cards
  * Charts (Trend + Category)
* `Transactions`

  * Transaction List
  * Filters & Search
* `Insights`
* `Role Selector`
* `Layout / Header`

### 🔹 Data Handling:

* Uses mock/static data
* State-driven rendering
* Derived data for charts and insights

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Charts:** Chart.js / Recharts (based on your implementation)
* **State Management:** React Hooks

---

## 📸 Screenshots

> Add your screenshots here

Example:

### Dashboard View

![Dashboard](./screenshots/dashboard.png)

### Transactions Section

![Transactions](./screenshots/transactions.png)

### Insights Section

![Insights](./screenshots/insights.png)

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Kavyasrivenna/finance-dashboard.git
```

2. Navigate to project folder:

```bash
cd finance-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Run the project:

```bash
npm run dev
```

---

## ✨ Future Enhancements

* Dark mode support 🌙
* Data persistence (local storage / API)
* Advanced filters (date range, multi-category)
* Export transactions (CSV/JSON)
* Animations and micro-interactions

---

## 📌 Conclusion

This project showcases the ability to:

* Build a complete frontend application from scratch
* Design intuitive user interfaces
* Manage state effectively
* Translate requirements into a functional product

---

## 👩‍💻 Author

**Kavya Sri Venna**

---
