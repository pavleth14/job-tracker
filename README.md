# 🚀 Job Tracker

A modern full-stack job application tracking system built with **React, TypeScript, Node.js, Express, and MongoDB**.

Job Tracker helps users organize their job search by managing applications, tracking progress, and viewing useful statistics through a clean and responsive dashboard.

---

## ✨ Features

### Authentication

* Secure user registration
* User login
* Password hashing with bcrypt
* JWT authentication
* Protected routes

### Job Management

* Create new job applications
* Edit existing applications
* Delete applications
* Confirmation modal before deleting
* View all jobs in a responsive dashboard

### Dashboard

* Job statistics
* Search and filtering
* Responsive layout
* Loading states
* Toast notifications

---

## 🛠 Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* React Router v7
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## 📁 Project Structure

```text
job-tracker
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   └── App.tsx
│   │
│   └── public
│
├── server
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       └── utils
│
└── docs
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/pavleth14/job-tracker.git
```

Move into the project

```bash
cd job-tracker
```

---

## Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run the Project

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run dev
```

---

## Screenshots

### Login

*Add screenshot*

### Dashboard

*Add screenshot*

### Create Job

*Add screenshot*

### Statistics

*Add screenshot*

---

## Current Features

* User Authentication
* Register
* Login
* JWT Authorization
* Protected Routes
* CRUD Operations
* Search & Filters
* Dashboard Statistics
* Toast Notifications
* Responsive UI

---

## Planned Improvements

* Pagination
* Sorting
* Charts & Analytics
* Profile Management
* Dark Mode
* Email Verification
* Password Reset
* Docker Support
* Unit & Integration Tests

---

## Live Demo

Coming soon.

---

## Author

**Pavle Stojanović**

Frontend Developer

GitHub:
https://github.com/pavleth14

---

## License

This project is licensed under the MIT License.
