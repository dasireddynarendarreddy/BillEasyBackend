# 📚 Billeasy Backend API

This is the backend service for the Billeasy application, developed using **Node.js**, **Express**, and **MongoDB Atlas**. It handles user authentication, book management, and reviews. The backend is deployed on [render] https://billeasybackend.onrender.com and frontend deployed on [netlify] https://allbooksin.netlify.app/

---

## 🚀 Features

- ✅ User registration and login with JWT
- 📚 Book search and management
- ✍️ Reviews system for books
- 🌐 CORS enabled for frontend communication
- 🔐 Environment variable support for secure configs

---

## 🛠️ Project Structure
project-root/
├── routes/
│ ├── authRoutes.js
│ ├── bookRoutes.js
│ └── reviewRoutes.js
├── controllers/
│ ├── authController.js
│ ├── bookController.js
│ └── reviewController.js
├── models/
│ ├── User.js
│ ├── Book.js
│ └── Review.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md


**Set Up Environment Variables**
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

## Install Dependencies
npm install
## Start the Server
npm start


---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Token)
- **Deployment**: Railway

---

## 📦 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/dasireddynarendarreddy/BillEasyBackend
cd backend

**END POINTS**

curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"username":"john","password":"12345"}'

🔓 Login User
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"username":"john", "password":"12345"}'

📥 Add a Book (Authenticated)
curl -X POST http://localhost:5000/api/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{"title": "Atomic Habits", "author": "James Clear", "description": "Tiny changes, remarkable results."}'

✍️ Add a Review for a Book (Authenticated)

curl -X POST http://localhost:5000/api/reviews/<bookId> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{"reviewText": "Excellent read!", "rating": 5}'

📖 Get All Books
curl http://localhost:5000/api/books

📄 Get Reviews for a Book
curl http://localhost:5000/api/reviews/<bookId>



🗃️ Database Schema Overview
User
{
  username: String,
  password: String (hashed)
}
Book
{
  title: String,
  author: String,
  description: String
}
Review
{
  userId: ObjectId,
  bookId: ObjectId,
  reviewText: String,
  rating: Number
}


