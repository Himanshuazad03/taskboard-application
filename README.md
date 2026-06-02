# 🗂 Task Management Board

A Kanban-style task management application built using Next.js, React, Redux Toolkit, and ShadCN UI.  
The app allows users to create, update, delete, and move tasks across Todo, Doing, and Done columns with activity tracking and filtering.

---

## 🚀 Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit (State Management)
- ShadCN UI (Radix Primitives)
- Tailwind CSS
- dnd-kit (Drag and Drop)
- Jest + React Testing Library (Unit Testing)

---

## ✨ Features

- User Login (Redux-based authentication state)
- Create Task
- Edit Task
- Delete Task
- Move Tasks between Todo / Doing / Done
- Drag and Drop functionality
- Activity Log (Tracks last 10 actions)
- Search and Filter support
- Persistent storage using localStorage
- Unit tests for:
  - Login validation
  - Task creation
  - Task deletion

---

## 🧠 State Management

Redux Toolkit is used to manage:

### Auth State
- isAuthenticated
- user info

### Board State
- tasks
- activityLog
- filters (search, priority, sort)

Reducers handle:
- addTask
- updateTask
- deleteTask
- moveTask
- resetBoard
- filter management

---

## 📁 Project Structure

```
taskboard-app/
├── __tests__/
│   ├── login.test.tsx
│   ├── taskCreate.test.tsx
│   └── taskDelete.test.tsx
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── board/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── board/
│   │   │   ├── BoardColumns.tsx
│   │   │   └── Column.tsx
│   │   ├── tasks/
│   │   │   ├── TaskCard.tsx
│   │   │   └── CreateTaskDialog.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── badge.tsx
│   │       ├── alert-dialog.tsx
│   │       └── scroll-area.tsx
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── authSlice.ts
│   │   └── boardSlice.ts
│   │
│   └── lib/
│       ├── types.ts
│       ├── storage.ts
│       └── utils.ts
│
├── styles/
│   └── globals.css
│
├── public/
│
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

- git clone https://github.com/Himanshuazad03/taskboard-application.git
- cd taskboard-application

### 2️⃣ Install dependencies

npm install

### 3️⃣ Run development server

Open in browser: http://localhost:3000


---

## 🧪 Run Tests


Tests are written using:
- Jest
- React Testing Library
- jsdom environment

---

## 🧠 State Management

Redux Toolkit is used with two slices:

### 1️⃣ Auth Slice
- isAuthenticated
- user

Handles:
- login

### 2️⃣ Board Slice
- tasks
- activityLog
- filters

Handles:
- addTask
- updateTask
- deleteTask
- moveTask
- resetBoard
- filtering & sorting
- loading from storage

---

## 💾 Local Storage Keys

- `tasks`
- `activityLog`
- `user` (if remember me enabled)

---

## 🏗 Architecture Overview

- UI Layer → React + ShadCN components
- State Layer → Redux Toolkit
- Drag & Drop → dnd-kit
- Styling → Tailwind CSS
- Testing → Jest + React Testing Library

The project follows a modular and scalable structure separating UI, state logic, utilities, and tests.

---

## ⚠️ Challenges Faced

- Handling Radix Dialog components in test environment
- Managing TypeScript strict typing for Redux preloadedState
- Avoiding portal-based test failures
- Syncing localStorage with Redux state

---

## 🔮 Future Improvements

- Backend integration with database
- API-based authentication
- Real-time collaboration
- Dark mode support
- Advanced filtering (tags, date range)
- User roles

---

## 📌 Notes

This project is built as part of an internship assignment to demonstrate:

- State management skills
- Clean architecture
- UI component structuring
- Testing implementation
- Problem solving with third-party libraries

---

## 📜 License

This project is created for educational and evaluation purposes.
