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

> <img width="1868" height="910" alt="image" src="https://github.com/user-attachments/assets/93730467-55ba-438a-b517-c848f17dca68" />



### Dashboard View
<img width="1875" height="915" alt="image" src="https://github.com/user-attachments/assets/f3aab544-08fb-45cf-86f9-8e3002371843" />

<img width="1885" height="896" alt="image" src="https://github.com/user-attachments/assets/b230e83a-3210-4eae-828e-302fa628cdeb" />

<img width="1885" height="912" alt="image" src="https://github.com/user-attachments/assets/832deeb7-66ab-4c29-8b4a-08ccc581ed5c" />



### Transactions Section
<img width="1881" height="905" alt="image" src="https://github.com/user-attachments/assets/35c51aa8-406a-4d4d-9f32-c25359861294" />

<img width="1827" height="456" alt="image" src="https://github.com/user-attachments/assets/6ce40641-03f6-48d6-adcd-1315a794594f" />

<img width="1880" height="911" alt="image" src="https://github.com/user-attachments/assets/036989c4-7c4d-409e-a72c-a8368dca38e7" />

<img width="1879" height="908" alt="image" src="https://github.com/user-attachments/assets/2dc2f9f8-f205-46ec-ae8f-afd63823c1d3" />



### Insights Section

<img width="1877" height="906" alt="image" src="https://github.com/user-attachments/assets/b0a4ddbf-e825-4896-bef4-c13393188670" />


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
