# Groupups Backend

This repository contains the **Node.js/Express** backend implementation for the **GroupUps** application – a conversational platform where users interact with a smart AI chatbot that recommends products based on their needs.

The **GroupUps** frontend provides a seamless chat interface that guides users through a dynamic conversation. The chatbot asks tailored questions, learns about the user's preferences, and recommends products – acting as a virtual salesperson.

---

## 🚀 Features

- **Admin Authentication:**  
  Secure login, registration, password management, and JWT-based authentication.

- **Industry & Equipment Management:**  
  CRUD APIs for industries, equipment, questions, products, and AI training snippets.

- **AI Chatbot Integration:**  
  Endpoints for conversational AI, chat history, and product recommendations.

- **Real-time Communication:**  
  Socket.io support for realtime chat and notifications.

- **Robust Validation & Error Handling:**  
  Input validation and comprehensive error responses using validators and dtos.

---

## 🏗️ Project Structure

```
src/
  ├── controllers/        # Route controllers (business logic)
  ├── models/             # Mongoose models (database schemas)
  ├── routes/             # Express route definitions
  ├── middlewares/        # Auth, validation, and error handling middleware
  ├── services/           # Communication with the db
  ├── dtos/               # to structure output response schema
  ├── validators/         # to validate request data
  ├── utils/              # Utility functions and helpers
  ├── config/             # Configuration files (DB, environment)
  └── server.js           # Main server entry point
```

---

## 🧩 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcrypt
- **Validation:** Zod
- **Real-time:** socket.io
- **AI Integration:** OpenAI API
- **Other:** dotenv, morgan, cors

---

## 📁 Environment Variables

Create a `.env` file in the root directory and set the following variables:

```
PORT=specify_your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=your_frontend_url
```

---

## ⚡ Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/Softaims/groupups-backend.git
cd groupups-backend
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Set up environment variables**

Create a `.env` file as described above.

### 4. **Run the development server**

```sh
npm run dev
```

---

## 🛠️ Available Scripts

- **Start development server (with nodemon):**

  ```sh
  npm run dev
  ```

- **Start production server:**

  ```sh
  npm start
  ```

---
