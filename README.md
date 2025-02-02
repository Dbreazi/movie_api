# 📽️ Strobe API

Welcome to the **Strobe API**, a RESTful API for managing users and movies in the Strobe application—a platform dedicated to documentary sports. This API handles user authentication, registration, movie data management, and more.

---

## 📋 Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features
- User Registration & Authentication (JWT-based)
- User Profile Management
- Favorite Movies (Add/Remove)
- Movie Data (CRUD operations)
- Protected Routes using Passport.js

---

## ⚙️ Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/strobe-api.git
   cd strobe-api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file with the following:
     ```env
     CONNECTION_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. **Run the server:**
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:3000/`

---

## 📡 Usage
All API requests require the `Authorization: Bearer <token>` header (except for login and registration).

- **Register:** `POST /users`
- **Login:** `POST /login`
- **Protected Routes:** Add JWT token in headers for authenticated requests.

---

## 📚 API Endpoints

### **Users**
- **POST /users** - Register a new user
- **POST /login** - Login with credentials
- **GET /users** - Get all users *(protected)*
- **GET /users/:Username** - Get user by username *(protected)*
- **PUT /users/:Username** - Update user info *(protected)*
- **DELETE /users/:Username** - Delete a user *(protected)*
- **POST /users/:Username/movies/:MovieID** - Add a movie to favorites *(protected)*
- **DELETE /users/:Username/movies/:MovieID** - Remove a movie from favorites *(protected)*

### **Movies**
- **GET /movies** - Get all movies *(protected)*
- **GET /movies/:title** - Get movie by title *(protected)*
- **GET /movies/genre/:genreName** - Get movies by genre *(protected)*
- **GET /movies/directors/:directorName** - Get movies by director *(protected)*

### **General**
- **GET /** - Welcome message

---

## ⚠️ Error Handling
The API uses standard HTTP status codes for errors:
- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Missing or invalid JWT token
- **404 Not Found:** Resource doesn’t exist
- **500 Internal Server Error:** Server-side error

Example Error Response:
```json
{
  "message": "Authentication failed: Incorrect password"
}
```

---

## 🛠️ Technologies Used
- **Node.js & Express.js** - Backend framework
- **MongoDB & Mongoose** - Database
- **JWT (JSON Web Tokens)** - Authentication
- **Passport.js** - Authentication middleware
- **JSDoc** - API documentation

---

## 🤝 Contributing
1. Fork this repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author
- **Dario** - 
