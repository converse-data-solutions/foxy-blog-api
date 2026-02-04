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

- **Node.js** (managed via **NVM**)
- **npm**
- **MongoDB** (Local instance or MongoDB Atlas)


### Check Installed Versions
node -v
npm -v

### 2️⃣ Set Up Node.js Version (Using NVM)
nvm install 24.13.0

nvm use $(Get-Content .nvmrc)

node -v

## 3️⃣ Install Dependencies
node -v

v24.13.0

npm install

## 4️⃣ Run the Application
### Development Mode
npm run dev
### Build the Project
npm run build
### Production Mode
npm start


## 5️⃣ Run Seed Data (Categories & Tags)
npm run seed

## 6️⃣ If Node.js Version Changes (Important)
rm -rf node_modules

npm install

