<div align="center">

# 🥕 Prince Vegetables 🌿

### Fresh Vegetables Delivered with Quality, Trust & Farm-Fresh Goodness 🚚💚

<p align="center">
  <a href="https://prince-vegetables.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐 Live Demo-Visit Website-green?style=for-the-badge" />
  </a>
  <a href="https://github.com/princethakur931/Prince-Vegetables" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" />
  </a>
</p>

</div>

---

## 📌 About the Project

**Prince Vegetables** is a modern and responsive vegetable shop website built to provide users with a clean and fresh online shopping experience.  
It showcases vegetables in an attractive layout with a user-friendly interface, smooth design, and mobile-friendly responsiveness.

---

## ✨ Features

- 🥕 Beautiful vegetable showcase
- 🌿 Clean and modern UI
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🛒 Easy-to-browse layout
- 🎨 Attractive color combination and fresh look

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|-------|
| **React.js** | Frontend Development |
| **Vite** | Fast Build Tool |
| **JavaScript** | Functionality |
| **HTML5** | Structure |
| **CSS3** | Styling |
| **Vercel** | Deployment |

---

## 🚀 Live Website

🔗 **Visit Here:**  
👉 [Prince Vegetables Live](https://prince-vegetables.vercel.app/)

---

## 📂 Project Structure

```bash
Prince-Vegetables/
│── public/
│── src/
│── .gitignore
│── index.html
│── package.json
│── package-lock.json
│── vite.config.js
│── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/princethakur931/Prince-Vegetables.git
```

### 2️⃣ Go to the project folder

```bash
cd Prince-Vegetables
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Start the development server

```bash
npm run dev
```

### 5️⃣ Connect MongoDB Atlas

Create a `.env` file from `.env.example` and add your MongoDB Atlas connection string. The app uses the `/api/catalog` route on Vercel to read and save the catalog document.

Required variables:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
MONGODB_DB=prince_vegetables
MONGODB_COLLECTION=catalogs
VITE_CATALOG_API_BASE_URL=https://prince-vegetables.vercel.app
VITE_ADMIN_PANEL_PATH=/admin
ADMIN_PANEL_PASSWORD=replace_with_strong_password
```

`VITE_CATALOG_API_BASE_URL` is optional on Vercel. For local development, set it to your deployed site URL so local admin edits and live edits both sync to the same MongoDB catalog.

`VITE_ADMIN_PANEL_PATH` controls which route renders the admin panel (for example `/internal-admin`).

`ADMIN_PANEL_PASSWORD` is verified on the server through `/api/admin-auth`, so the password is not bundled in frontend code.

---

## 🎯 Purpose of This Project

This project was created to build a **modern vegetable shop website UI** that looks clean, fresh, and professional.  
It can be used as a base for:

- Online vegetable store 🥬
- Grocery shopping website 🛒
- Local fresh produce business 🌽
- Organic food delivery website 🍅

---

## 📸 Preview

> Add your website screenshot here for a more professional GitHub look 📷

Example:
```md
![Project Preview](your-image-link-here)
```

---

## 🌟 Future Improvements

- 🔐 User Login / Signup
- 🛒 Add to Cart functionality
- 💳 Payment Integration
- 📦 Order Tracking
- 📱 Better animations and interactions
- 🧾 Product filtering and categories

---

## 🙋‍♂️ Author

**Prince Thakur**  
💻 Computer Engineering Student | Frontend Developer | Tech Enthusiast

- 🌐 Portfolio: *(Add if available)*
- 💼 LinkedIn: *(Add your LinkedIn link)*
- 📧 Email: *(Add your email if you want)*

---

<div align="center">

### 🌿 Thank You for Visiting This Project 💚

⭐ If you like this project, don't forget to **star** the repository!

</div>
