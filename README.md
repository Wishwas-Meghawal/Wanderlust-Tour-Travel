# 🌍 Wanderlust Tour & Travel

A full-stack travel listing web application where users can explore destinations, create listings, review places, and manage travel accommodations.
The project is inspired by platforms like Airbnb and demonstrates a complete **CRUD-based web application using Node.js, Express, MongoDB, and EJS**.

This project focuses on backend architecture, RESTful APIs, authentication, and database integration while providing a clean user interface for managing travel destinations.

---

# 🚀 Features

* 🔐 User Authentication (Register / Login / Logout)
* 🏨 Create, Edit, and Delete Travel Listings
* 📝 Add and Manage Reviews
* 🖼 Image Upload Support
* ⚠ Form Validation
* 📦 MVC Project Structure
* 💬 Flash Messages for Notifications
* 📱 Responsive UI

---

# 🛠 Tech Stack

## Frontend

* HTML
* CSS
* Bootstrap
* JavaScript
* EJS (Embedded JavaScript Templates)

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Other Tools & Libraries

* Cloudinary (Image Storage)
* Multer (File Upload)
* Passport.js (Authentication)
* Connect Flash
* Express Session
* Joi (Validation)

---

# 📂 Project Structure

```
Wanderlust-Tour-Travel
│
├── controllers/        # Route controller logic
├── models/             # Mongoose database models
├── routes/             # Express route handlers
├── views/              # EJS template files
├── public/             # Static files (CSS, JS, Images)
│
├── middleware.js       # Custom middleware functions
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # Cloudinary configuration
├── app.js              # Main application file
├── package.json
└── README.md
```

---

# ⚙ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Wishwas-Meghawal/Wanderlust-Tour-Travel.git
```

### 2. Navigate to the project folder

```bash
cd Wanderlust-Tour-Travel
```

### 3. Install dependencies

```bash
npm install
```

### 4. Setup environment variables

Create a `.env` file in the root directory and add:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 5. Initialize database (if seed data exists)

```bash
node init/index.js
```

### 6. Start the server

```bash
node app.js
```

Server will run on:

```
http://localhost:3000
```

---

# 📸 Screenshots

You can add project screenshots here.

Example:

```
![Home Page](screenshots/home.png)
![Listing Page](screenshots/listings.png)
![Login Page](screenshots/login.png)
```

---

# 📌 Future Improvements

* 💳 Payment Gateway Integration
* 📍 Map Integration (Google Maps / Mapbox)
* 🔎 Advanced Search & Filters
* 📅 Booking System
* 👨‍💼 Admin Dashboard
* 📱 Mobile Optimization

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```
git checkout -b feature-name
```

3. Commit your changes

```
git commit -m "Added new feature"
```

4. Push to your branch

```
git push origin feature-name
```

5. Create a Pull Request

---

# 👨‍💻 Author

**Wishwas Chauhan**

GitHub:
https://github.com/Wishwas-Meghawal

---

# ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub.

It helps others discover the project and supports the developer.
