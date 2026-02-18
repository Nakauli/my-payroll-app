# Monolithic vs. Microservices Payroll System 💻

This project is a React application developed for **Laboratory Activity 3: Implementation of System Architecture**. It demonstrates the structural and functional differences between Monolithic and Microservices architectures using a simple Payroll System.

## 📂 Project Overview

The application is divided into two distinct parts:

### Part A: Monolithic Architecture
A traditional, tightly coupled system where the User Interface (UI), Business Logic, and Data Management all reside within a single component.
* **Features:** Employee CRUD (Create, Read, Update, Delete) and Payroll Computation.
* **Structure:** All logic is contained within `MonolithicPayroll.jsx`.

### Part B: Microservices Architecture (Simulated)
A simulated distributed system where responsibilities are decoupled into separate services.
* **Employee Service:** Handles data storage and CRUD operations.
* **Payroll Service:** Handles mathematical computations (Net Pay = Gross - Tax).
* **Frontend Gateway:** The UI interacts with these services independently.

## 🚀 How to Run the Project

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Nakauli/my-payroll-app/tree/master
    ```

2.  **Install dependencies**
    ```bash
    cd my-payroll-app
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser to the local host link provided (usually `http://localhost:5173`).

## 🛠️ Tech Stack
* **Frontend:** React (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** CSS-in-JS (Inline styles)

## 📁 File Structure
```text
src/
├── components/
│   ├── MonolithicPayroll.jsx    # All-in-one logic (Part A)
│   └── MicroservicesPayroll.jsx # UI Gateway (Part B)
├── services/
│   ├── EmployeeService.js       # Data Management Service
│   └── PayrollService.js        # Calculation Service
└── App.jsx                      # Main Entry Point

🧠 Key Learnings
Monolithic: Easier to build initially but becomes harder to maintain as code grows. Tightly coupled logic means one change can break the whole file.

Microservices: Requires more setup (boilerplates/files), but logically separates concerns. The "Payroll Service" doesn't need to know who the employee is, just the numbers, making it reusable and testable.

