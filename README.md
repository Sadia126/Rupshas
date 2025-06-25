
# 🛍️ Rupsha - B2B Wholesale Marketplace

**Rupsha** is a responsive, modern web application built for B2B wholesale product listings, purchases, and inventory management. It allows users to browse, buy, and manage bulk products through an intuitive interface.

---

## 🌐 Live URL

[👉 Visit Live Site](https://rupshaa-1eb03.web.app)

---

## 🎯 Project Purpose

This project was developed to demonstrate the functionality of a B2B wholesale platform with the following goals:

- Enable users to browse wholesale products.
- Allow users to purchase products in bulk with minimum quantity enforcement.
- Secure routes using JWT and Firebase Authentication.
- Manage inventory stock automatically during order placement and cancellation.

---

## ✨ Key Features

- 🔐 **Authentication** (Email/Password & Google) via Firebase
- 📦 **Product Management** (CRUD operations)
- 🛒 **Order Placement** with stock validation
- ⛔ **Order Cancellation** with automatic inventory restore
- 🔍 **Category Filtering**
- 🧮 **Card & Table View Toggle** (for product browsing)
- 🧾 **JWT Authorization** for private routes
- 📱 **Responsive UI** with Tailwind & DaisyUI
- ⚙️ **Real-time Notifications** using React Hot Toast
- 🌈 **Animations** using Framer Motion and Lottie

---

## 🧩 Tech Stack & NPM Packages Used

### 🔧 Frontend

- **React 19**
- **React Router DOM v7**
- **Tailwind CSS + DaisyUI**
- **Vite** (for fast build & development)
- **Firebase** (authentication)
- **Framer Motion** (animations)
- **Lottie React** (animated illustrations)
- **React Hook Form** (form handling)
- **React Hot Toast** (toast notifications)
- **React Icons**, **Lucide React** (icon sets)
- **Swiper** (image slider)
- **React Modal**
- **React Simple Typewriter** (typing animation)
- **React Rating Stars Component**
- **Match Sorter**, **Sort By** (filtering/sorting helpers)
- **LocalForage** (optional offline/local storage support)

### 🧪 Dev Dependencies

- **Vite**
- **TailwindCSS**
- **DaisyUI**
- **ESLint** with:
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
- **PostCSS**, **Autoprefixer**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/rupsha.git
cd rupsha
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env` file

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# and other Firebase env variables
```

### 4. Run the development server

```bash
npm run dev
```

---

```
