# Job Tracker - Project Memory

## Project Goal

Job Tracker is a portfolio full-stack application.

Purpose:
A user can track job applications through different stages:
- saved jobs
- applied
- interviews
- offers
- rejected

The project should demonstrate professional React, Node.js, Express and MongoDB skills.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- CSS
- (Future) TanStack Query
- (Future) React Hook Form + Zod

Location:


client/


---

## Backend

- Node.js
- Express
- JavaScript
- Mongoose
- MongoDB Atlas

Location:


server/


---

# Architecture

Application structure:


Browser
|
|
React Client
|
| REST API
|
Express Server
|
|
MongoDB Atlas


Frontend responsibilities:
- UI
- routing
- forms
- user interaction

Backend responsibilities:
- authentication
- validation
- business logic
- database communication

---

# Current Project State

## Frontend Completed

[x] React project created with Vite

[x] TypeScript enabled

[x] React Router installed

[x] Pages created:
- Login
- Dashboard

[x] Routing working

[x] Login form created

[x] Login redirects to Dashboard

[x] Global CSS added

[x] Login page styling completed

---

## Backend Completed

[x] Express server initialized

[x] Server running on port 5000

[x] Environment variables configured

[x] MongoDB Atlas connected

[x] Mongoose installed

[x] User model created

User schema:


User
|
|-- email
|-- password
|-- createdAt
|-- updatedAt


---

# Authentication Progress

Completed:

[x] Register route created

Endpoint:


POST /api/auth/register


Functionality:

- receives email/password
- checks existing user
- hashes password using bcrypt
- saves user into MongoDB

Tested successfully using Postman.

MongoDB contains:


users collection


---

# Current Step

Implementing:

JWT Authentication

Next tasks:

1. Install jsonwebtoken

2. Create:


POST /api/auth/login


3. Verify:
- user exists
- password matches

4. Generate JWT token

5. Connect React Login form with backend

---

# Development Rules

Important:

- Build step by step
- Do not create unnecessary features before MVP is complete
- Understand every part of the code
- Keep frontend and backend separated
- Follow professional folder structure

---

# MVP Features

Authentication:
- Register
- Login
- Logout

Applications:
- Create job application
- Update status
- Delete application
- View applications

Statuses:


wishlist
applied
interview
offer
rejected
withdrawn


Dashboard:

- total applications
- status overview

---

# Future Features

After MVP:

- Kanban board
- Search
- Filters
- Analytics
- Reminders
- Export
- Dark mode

---

# Important Note

This file is the source of truth for project progress.

Before adding new features:
check architecture and update this file.