# Glamora - Women's Fashion E-commerce Platform

Glamora is a modern e-commerce platform focused on ladies' fashion. It provides a seamless shopping experience with features like user authentication, product browsing, reviews, order management, and secure payments.

---

## Features

- **User Authentication:** Register, login, logout, and manage user profiles.
- **Product Catalog:** Browse, filter, and search for women's fashion products.
- **Product Reviews:** Users can add and update reviews for products.
- **Order Management:** Place orders, view order history, and manage order status.
- **Admin Dashboard:** View platform statistics, manage users, products, and orders.
- **Stripe Payments:** Secure checkout and payment processing.
- **Cloudinary Integration:** Image uploads for products and user profiles.
- **Responsive Frontend:** Built with React, Redux, and React Router.

---

## Tech Stack

- **Frontend:** React + Vite, Redux, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, Cookies
- **Payments:** Stripe
- **Image Hosting:** Cloudinary

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)
- Stripe account
- Cloudinary account

---

### 1. Clone the Repository

```bash
git clone https://github.com/mohitraj061/glamora-ecommerce.git
cd glamora-ecommerce
```
---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a .env file in the backend root directory (see .env.sample file in the backend folder for reference or use the following):

```
MONGODB_URL=""
JWT_SECRET_KEY=""
STRIPE_SECRET_KEY=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```


#### Start the Backend Server

```bash
npm run start:dev
```
---

### 2. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Configure Environment Variables

Create a .env.local file in the frontend root directory (see .env.local for example):

```
VITE_STRIPE_PK=""
```

#### Start the Frontend

```bash
npm run dev
```

---

## Acknowledgements

- MongoDB Atlas
- Stripe
- Cloudinary
- React + Vite
- Express

---

## Author

- Mohit Raj

---

## License

Glamora is open-source software licensed under the [MIT License](LICENSE).