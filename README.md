# 🎓 Student Management System API

A RESTful backend API built using **Node.js, Express, TypeScript, and
MongoDB Atlas**.\
This project uses **JWT authentication (no sessions or cookies)** and
follows pure **JSON request/response architecture**.

------------------------------------------------------------------------

## 🚀 Base URL

    http://localhost:5000/api

------------------------------------------------------------------------

## 🔐 Authentication

All protected routes require JWT token in header:

    Authorization: Bearer YOUR_JWT_TOKEN

------------------------------------------------------------------------

# 👨‍💼 Admin APIs

## 1️⃣ Create Admin

**POST** `/api/admin`

### Request Body

``` json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
```

------------------------------------------------------------------------

## 2️⃣ Update Admin (Protected)

**PUT** `/api/admin`

------------------------------------------------------------------------

# 🎓 Student APIs (Admin Only)

## 3️⃣ Add Student

**POST** `/api/students`

``` json
{
  "name": "Ananthu",
  "email": "ananthu@gmail.com",
  "department": "CSE",
  "password": "Student@123"
}
```

------------------------------------------------------------------------

## 4️⃣ Get All Students

**GET** `/api/students`

------------------------------------------------------------------------

## 5️⃣ Get Student By ID

**GET** `/api/students/:id`

------------------------------------------------------------------------

## 6️⃣ Update Student

**PUT** `/api/students/:id`

------------------------------------------------------------------------

## 7️⃣ Delete Student

**DELETE** `/api/students/:id`

------------------------------------------------------------------------

# 📋 Task APIs (Admin Only)

## 8️⃣ Assign Task

**POST** `/api/tasks`

``` json
{
  "studentId": "65fabc123",
  "title": "Complete Assignment",
  "description": "Finish MongoDB project",
  "dueDate": "2026-02-20"
}
```

------------------------------------------------------------------------

## 9️⃣ Get All Tasks

**GET** `/api/tasks`

------------------------------------------------------------------------

## 🔟 Get Task By ID

**GET** `/api/tasks/:id`

------------------------------------------------------------------------

## 1️⃣1️⃣ Update Task

**PUT** `/api/tasks/:id`

Status values: - pending - completed - overdue

------------------------------------------------------------------------

## 1️⃣2️⃣ Delete Task

**DELETE** `/api/tasks/:id`

------------------------------------------------------------------------

# 🔐 Environment Variables

Create a `.env` file:

    PORT=5000
    MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studentDB
    JWT_SECRET=your_super_secret_key

------------------------------------------------------------------------

# 📦 Installation

    npm install
    npm run dev

------------------------------------------------------------------------

# 📂 .gitignore

    node_modules/
    dist/
    .env

------------------------------------------------------------------------

# 🛠 Tech Stack

-   Node.js
-   Express
-   TypeScript
-   MongoDB Atlas
-   JWT Authentication

------------------------------------------------------------------------

# ⚠️ Important Notes

-   No session or cookie-based authentication used.
-   Pure JSON request & response format.
-   MongoDB Atlas cloud database used.
-   Secure environment variables configuration.

