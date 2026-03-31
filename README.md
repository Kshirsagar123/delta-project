# 🌍 WanderLust – Travel Listing Web Application

WanderLust is a full-stack Airbnb-like web application where users can explore, create, edit, and delete travel listings. It includes authentication, image uploads, and review functionality.

---

## 🚀 Live Demo

🔗 https://delta-project-sekh.onrender.com/listings

---

## 📸 Screenshots
🏠 Home https://github.com/Kshirsagar123/delta-project/blob/25102114e802e044c26c35cdf80bc31a35eadf42/Home.png
   


---

## 🛠️ Tech Stack

### 💻 Frontend
- EJS (Embedded JavaScript Templates)
- HTML5, CSS3
- Bootstrap 5
- JavaScript

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### 🔐 Authentication
- Passport.js (Local Strategy)
- express-session
- connect-mongo

### ☁️ Image Storage
- Cloudinary
- Multer
- multer-storage-cloudinary

### 📦 Other Tools
- Joi (Validation)
- Method-Override
- Connect-Flash
- Dotenv

---

## ✨ Features

- 🔐 User Authentication (Signup / Login / Logout)
- 🏡 Create, Edit, Delete Listings
- 🖼️ Image Upload with Cloudinary
- ⭐ Add & Delete Reviews
- 🧾 Flash Messages (Success/Error)
- 🔒 Authorization (Only owner can edit/delete)
- 📱 Responsive UI using Bootstrap
- 🧠 MVC Architecture

---


---

## 🔑 Key Functionalities

- RESTful CRUD operations
- Session-based authentication
- MongoDB relationships using `populate()`
- Image optimization using Cloudinary
- Centralized error handling
- Async error handling using `wrapAsync`

---

## 🧠 Important Methods Used

```js
req.login()
req.logout()
req.isAuthenticated()
User.register()
User.authenticate()

Model.find()
Model.findById()
Model.findByIdAndUpdate()
Model.findByIdAndDelete()
.populate()
```

---

## 🧪 Installation
```
git clone https://github.com/Kshirsagar123/delta-project
cd delta-project
npm install
```
---

## ⚙️ Environment Variables

Create a .env file and add:
```
ATLASDB_URL=your_mongodb_url
SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

```
---

## ▶️  Run Locally : npm start

---

## 🚀 Deployment 
- Backend & App: Render
- Database: MongoDB Atlas
- Image Storage: Cloudinary

---

## 📌 Author:

Ganesh Bharat Kshirsagar
