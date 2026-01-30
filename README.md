# 📝 Blog Backend API

A **scalable, production-ready blog backend** built with **Node.js, Express, TypeScript, MongoDB**, featuring authentication, role-based access control, engagement features, analytics, and full Swagger documentation.

This project is designed for **real-world SaaS / portfolio use**, not just demos.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Swagger (OpenAPI 3.0)**
- **Role-Based Access Control (RBAC)**

---

## 📦 Features

### 👤 Authentication & Users
- JWT-based authentication
- Roles: `user`, `admin`
- User profile management
- Admin user management

### 🗂️ Blog Core
- Categories & Tags
- Posts (assumed existing)
- Comments (threaded replies)
- Comment moderation (admin)

### ❤️ Engagement
- Reactions (like, clap, love, insightful)
- Bookmarks (save posts)
- Shares (platform-wise tracking)
- Post views (logged-in + guest)

### 🔔 Notifications
- Comment notifications
- Reaction notifications
- Follow / system notifications
- Read / unread tracking

### 📊 Analytics
- Post view tracking
- Share counts by platform
- Reaction counts
- Bookmark stats (extendable)

### 📘 API Documentation
- Swagger UI available
- JWT-secured endpoints documented
- Admin & user APIs clearly separated

## ▶️ How to Run the Project

### 1️⃣ Prerequisites

Make sure the following are installed on your system:

- **Node.js** (v18+ recommended)
- **npm**
- **MongoDB** (local or Atlas)

Check versions:

node -v
npm -v

## ▶️ Run Commands

### Install Dependencies
npm install

npm run dev -- watch mode(nodemon)

npm run build

npm start

### Run seed data (Category and Tag)
npm run seed

