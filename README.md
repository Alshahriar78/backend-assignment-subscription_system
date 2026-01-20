# Backend Subscription System – REST API & Stripe Integration

This project is a RESTful backend API for a simple subscription/e-commerce system built as part of a Backend Developer technical assignment. It includes user authentication, product management, order creation, Stripe payment integration, and webhook handling.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Get logged-in user profile
- Product / subscription plan creation & listing
- Order creation and payment initiation
- Stripe payment integration (test mode)
- Webhook handling for payment success & failure
- Centralized error handling
- Postman API documentation
- Live deployment

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment Gateway (Test Mode)
- Postman
- Deployed on Render / Vercel / Railway

---

## 📂 Project Structure

backend-assignment-subscription_system/
├── controllers/
├── routes/
├── models/
├── middleware/
├── utils/
├── server.js
├── package.json
├── .env.example


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Alshahriar78/backend-assignment-subscription_system.git
cd backend-assignment-subscription_system

2️⃣ Install dependencies

npm install

3️⃣ Setup environment variables

cp .env.example .env

4️⃣ Run the server

http://localhost:5000

Payment Flow (Stripe)

User logs in and selects a product/plan

Backend creates an order with pending status

Stripe Payment Intent / Checkout Session is created

User completes payment using Stripe test card

Stripe sends webhook event

Backend verifies webhook signature

Order status updates to paid or failed

🧪 Stripe Test Card

Card Number: 4242 4242 4242 4242
Expiry: 11/29
CVC: 142


Live Deployment
Base URL: https://backend-assignment-subscription-system.onrender.com
Webhook URL: https://backend-assignment-subscription-system.onrender.com/api/webhook


---



# backend-assignment-subscription_system
