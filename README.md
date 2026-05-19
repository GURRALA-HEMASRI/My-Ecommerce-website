# Modern Full Stack E-Commerce Platform

A full stack e-commerce web application built to demonstrate practical software engineering skills across frontend development, backend API design, authentication, database integration, and complete commerce workflows.

This project simulates a real-world shopping platform where users can browse products, view detailed product information, manage carts and wishlists, complete checkout, and track orders.

---

# Project Screenshots
## Login Page

![Home Page](https://github.com/GURRALA-HEMASRI/My-Ecommerce-website/blob/c82fa100e0767b5ba995db881af8527225b297e0/Screenshot%202026-05-19%20105655.png)

## Home Page
![Home Page](https://github.com/GURRALA-HEMASRI/My-Ecommerce-website/blob/c82fa100e0767b5ba995db881af8527225b297e0/Screenshot%202026-05-19%20105528.png)

## Product Listing
![Product Listing](./screenshots/products.png)

## Product Details
![Product Details](https://github.com/GURRALA-HEMASRI/My-Ecommerce-website/blob/c82fa100e0767b5ba995db881af8527225b297e0/Screenshot%202026-05-19%20111647.png)

## Shopping Cart
![Shopping Cart](https://github.com/GURRALA-HEMASRI/My-Ecommerce-website/blob/c82fa100e0767b5ba995db881af8527225b297e0/Screenshot%202026-05-19%20111742.png)

## Wishlist
![Wishlist](./screenshots/wishlist.png)

## Checkout Flow
![Checkout Flow](https://github.com/GURRALA-HEMASRI/My-Ecommerce-website/blob/c82fa100e0767b5ba995db881af8527225b297e0/Screenshot%202026-05-19%20110200.png)

## Orders Page
![Orders Page](https://github.com/GURRALA-HEMASRI/My-Ecommerce-website/blob/c82fa100e0767b5ba995db881af8527225b297e0/Screenshot%202026-05-19%20111848.png)

---

# Project Overview

This application was designed to replicate the core workflows of a modern e-commerce platform with a clean separation between frontend presentation, backend business logic, authentication, and persistent data storage.

The implementation focuses on practical engineering principles including modular architecture, reusable components, secure authentication, API abstraction, state management, and database-backed workflows.

The platform supports end-to-end shopping functionality from product discovery through final order placement.

---

# Core Features

## Authentication

The application includes secure authentication workflows for user access management.

Features include:

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Session persistence
- Logout support

Authenticated requests are secured using bearer token authorization.

---

## Product Catalog

Users can browse a structured product catalog designed for a realistic shopping experience.

Capabilities include:

- Product listing interface
- Category-based filtering
- Product search
- Ratings display
- Pricing display
- Product descriptions
- Related product suggestions

---

## Product Detail Experience

Each product includes a dedicated detailed product view.

Users can:

- View enlarged product images
- Review pricing and discounts
- Read detailed product descriptions
- Select quantities
- Add products to cart
- Add or remove products from wishlist
- Proceed directly to checkout

---

## Shopping Cart

The shopping cart system provides interactive cart management.

Supported operations:

- Add products
- Remove products
- Update quantities
- Dynamic pricing calculations
- Cart persistence
- Checkout navigation

---

## Wishlist

Users can maintain a personalized wishlist.

Features include:

- Add products to wishlist
- Remove products from wishlist
- Persist wishlist state
- Revisit saved products quickly

---

## Checkout Workflow

The checkout flow is implemented as a structured multi-step process.

### Shipping Information

Users provide:

- First Name
- Last Name
- Email
- Phone Number
- Address
- City
- State
- ZIP Code
- Country

### Payment Details

Users provide:

- Card Number
- Cardholder Name
- Expiry Date
- CVV

### Final Order Review

Users can review:

- Shipping summary
- Payment summary
- Ordered products
- Shipping charges
- Tax calculations
- Final payable amount

---

## Order Management

Users can access their order history.

Displayed information includes:

- Ordered products
- Product details
- Quantity purchased
- Product pricing
- Total order amount
- Order timestamps

---

# Technology Stack

## Frontend

The frontend application is built using:

- React.js
- Vite
- JavaScript (ES6+)
- React Router DOM
- Tailwind CSS
- Lucide React

---

## Backend

The backend API is built using:

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- dotenv
- CORS

---

# Architecture

## Frontend Architecture

Frontend structure:

```bash
frontend/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   │
│   ├── context/
│   │   ├── CartContext
│   │   └── WishlistContext
│   │
│   ├── data/
│   │
│   ├── pages/
│   │   ├── HomePage
│   │   ├── ProductsPage
│   │   ├── ProductDetailPage
│   │   ├── CartPage
│   │   ├── WishlistPage
│   │   ├── CheckoutPage
│   │   └── OrdersPage
│   │
│   └── App.jsx
```

Frontend engineering principles:

- Component-based architecture
- Reusable UI composition
- Context-based state management
- API abstraction
- Route-driven navigation
- Responsive interface design

---

## Backend Architecture

Backend structure:

```bash
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── productController.js
│   └── wishlistController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── wishlistRoutes.js
│
└── server.js
```

Backend engineering principles:

- Separation of concerns
- Controller-based business logic
- Route modularization
- Middleware authentication
- Database abstraction
- REST API structure

---

# Database Design

The application uses a relational MySQL database.

## Users

Stores registered user information.

Fields:

- id
- name
- email
- password

---

## Products

Stores product catalog information.

Fields:

- id
- title
- price
- image
- category
- description

---

## Cart

Stores active cart items.

Fields:

- id
- user_id
- product_id
- quantity

---

## Wishlist

Stores saved wishlist items.

Fields:

- id
- user_id
- product_id

---

## Orders

Stores completed order summaries.

Fields:

- id
- user_id
- total
- created_at

---

## Order Items

Stores individual order line items.

Fields:

- id
- order_id
- product_id
- quantity

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Products

```http
GET /api/products
```

---

## Cart

```http
GET /api/cart
POST /api/cart/add
PATCH /api/cart/items/:id
DELETE /api/cart/items/:id
```

---

## Wishlist

```http
GET /api/wishlist
POST /api/wishlist/toggle
```

---

## Orders

```http
POST /api/orders
GET /api/orders
```

---

# Setup Instructions

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create:

```env
backend/.env
```

Add:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
JWT_SECRET=your_secret_key
```

---

## Database Setup

Create database:

```sql
CREATE DATABASE ecommerce_db;
USE ecommerce_db;
```

Import schema if included.

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create:

```env
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

---

# Engineering Decisions

This implementation was intentionally structured to reflect real engineering practices.

Key design decisions include:

- Modular frontend component architecture
- Reusable interface design
- Context-driven state management
- REST API abstraction layer
- JWT-secured authentication
- Relational database normalization
- Backend modular routing
- Controller-based business logic
- Responsive UI implementation
- Clear separation between frontend and backend responsibilities

---

# Technical Challenges Addressed

This project required solving multiple practical implementation challenges.

These included:

- Authentication flow implementation
- Protected API request handling
- Cart state management
- Wishlist persistence
- Checkout workflow design
- Order persistence
- Frontend-backend integration
- Dynamic routing
- Product detail rendering
- Order history rendering
- Responsive layout consistency

---

# Future Enhancements

Potential production extensions:

- Payment gateway integration
- Inventory management
- Product image uploads
- Product reviews
- Order tracking
- Admin dashboard
- Email notifications
- Search indexing
- Pagination
- Lazy loading
- CI/CD deployment
- Docker containerization
- Cloud deployment

---

# Author

Gurrala Hemasri

GitHub: https://github.com/GURRALA-HEMASRI 
