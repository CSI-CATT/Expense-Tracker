
# 💰 Expense Tracker

## 👩‍💻  Maintainer

[Parth Nandwalkar](https://github.com/Parth-code286)

---

## 📝 Overview

A full-stack **Expense Tracker** web application to help you manage and visualize your income and expenses with interactive charts, Excel exports, file uploads, and more.

---

## ✨ Features

- 🔐 User login and registration
- ➕ Add income and expenses
- 📊 Visualize data with bar, line, and pie charts
- 🧾 Upload receipt images for each transaction
- 📁 Export data as Excel files
- 🧠 Dashboard with recent transactions and summaries
- 📱 Responsive design

---

## 🔧 Tech Stack

### 🔹 Frontend

- React
- Vite
- Tailwind CSS
- Axios

### 🔹 Backend

- Node.js
- Express
- MongoDB (via Mongoose)
- Multer (file upload)
- ExcelJS / xlsx (for exports)

---

## 📁 Backend Project Structure

```text
backend/
├── config/
│   ├── db.js
│   └── multer.js
│
├── controllers/
│   ├── authController.js
│   ├── dashboardController.js
│   ├── expenseController.js
│   └── incomeController.js
│
├── excelSheets/
│   ├── Expense_details.xlsx
│   └── income_details.xlsx
│
├── images/
│   └── default.jpg
│
├── middlewares/
│   ├── incomeMiddleware.js
│   ├── isLoggedIn.js
│   └── middleware.txt
│
├── models/
│   ├── expense-model.js
│   ├── income-model.js
│   └── user-model.js
│
├── routes/
│   ├── dashboardRoute.js
│   ├── expenseRoute.js
│   ├── incomeRoute.js
│   └── userRoute.js
│
├── uploads/
│
├── utils/
│   └── generateToken.js
│
├── .DS_Store
├── .gitignore
├── ProjectFlow.txt
├── package-lock.json
├── package.json
└── server.js
```

## 📁 Frontend Project Structure

```text
frontend/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── CARD2.png
│   │       └── react.svg
│   │
│   ├── components/
│   │   ├── Cards/
│   │   │   ├── CharAvatar.jsx
│   │   │   ├── InfoCard.jsx
│   │   │   └── TransactionInfoCard.jsx
│   │   ├── Charts/
│   │   │   ├── CustomBarCharts.jsx
│   │   │   ├── CustomLineChart.jsx
│   │   │   ├── CustomPieChart.jsx
│   │   │   └── CustomTooltip.jsx
│   │   ├── Dashboard1/
│   │   │   ├── ExpenseTransactions.jsx
│   │   │   ├── FinanceOverview.jsx
│   │   │   ├── Last30DaysExpenses.jsx
│   │   │   ├── RecentIncome.jsx
│   │   │   ├── RecentIncomeWithChart.jsx
│   │   │   └── RecentTransactions.jsx
│   │   ├── Expenses/
│   │   │   ├── AddExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── ExpenseOverview.jsx
│   │   ├── Income/
│   │   │   ├── AddIncomeForm.jsx
│   │   │   ├── IncomeList.jsx
│   │   │   └── IncomeOverview.jsx
│   │   ├── inputs/
│   │   │   ├── Input.jsx
│   │   │   └── ProfilePhotoSelector.jsx
│   │   └── layouts/
│   │       ├── AuthLayout.jsx
│   │       ├── DashboardLayout.jsx
│   │       ├── DeleteAlert.jsx
│   │       ├── EmojiPickerPopup.jsx
│   │       ├── Modals.jsx
│   │       ├── NavBar.jsx
│   │       └── SideMenu.jsx
│   │
│   ├── context/
│   │   ├── .gitkeep
│   │   └── userContext.jsx
│   │
│   ├── hooks/
│   │   ├── .gitkeep
│   │   └── userUserAuth.js
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   └── Dashboard/
│   │       ├── Expense.jsx
│   │       ├── Home.jsx
│   │       └── Income.jsx
│   │
│   ├── utils/
│   │   ├── apiPath.js
│   │   ├── axiosInstance.js
│   │   ├── data.js
│   │   ├── helper.js
│   │   └── uploadImage.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .DS_Store
```

## 🛠️ Getting Started

1️⃣ **Clone the Repository**

```bash
git clone https://github.com/yourusername/expense-tracker.git
```

2️⃣ **Navigate to the Project Directory**

```bash
cd expense-tracker
```

3️⃣**Install Backend Dependencies**

```bash
cd backend
npm install
```

4️⃣ **Start Backend Server**

```bash
npm start
```

5️⃣ **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

6️⃣ **Start Frontend Development Server**

```bash
npm run dev
```
