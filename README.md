# Ecommerce-Website-using-React-and-Node.js


This repository contains a full-featured e-commerce application built with the **MERN stack** (MongoDB, Express, React, Node). It features a RESTful API for products, comprehensive user authentication, cart management, and payment processing integration.

---

## 💻 Tech Stack Overview

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | Core server environment and RESTful API framework. |
| **Database** | MongoDB, Mongoose | NoSQL database and Object Data Modeling (ODM) layer. |
| **State Mgt.** | React, Redux, Redux-Thunk | Component-based UI, predictable state container, and async actions. |
| **Authentication** | JWT, bcrypt | Secure token-based user sessions and password hashing. |
| **Payment** | Stripe | Handles creation of Payment Intents for checkout. |

---

## 🗂️ File Structure

The project follows a standard MERN separation of concerns.

### ⚙️ Backend Files

| Path | File Name | Description & Key Functionality |
| :--- | :--- | :--- |
| Root/Config | **server.js** | Entry Point: Initializes Express, middleware, static uploads, and API routing. |
| Config | db.js | Mongoose connection function to MongoDB. |
| Middleware | auth.js | JWT verification middleware (`protect`). |
| Models | **User.js** | Mongoose schema for users (includes cart array). |
| Models | **Product.js** | Mongoose schema for e-commerce products (includes category field). |
| Controllers | **authControllers.js** | Registration and login logic. |
| Controllers | **paymentControllers.js** | Logic for creating Stripe Payment Intents. |
| Routes | **productRoutes.js** | Handles `/api/products` for listing, searching, and detail viewing. |
| Routes | **paymentRoutes.js** | Handles `/api/payments/create-payment-intent`. |

### ⚛️ Frontend Files (`src/`)

| Path | File Name | Description & Key Functionality |
| :--- | :--- | :--- |
| Root | **App.jsx** | Defines all `react-router-dom` routes and structural components. |
| Redux | **store.jsx** | Configures the Redux Store, combines reducers, and includes the Axios Interceptor. |
| Actions | **cartActions.jsx** | Redux Thunks for `addToCart` and `removeFromCart`. |
| Components | **Navbar.jsx** | Header with cart counter, search input, and user profile dropdown/logout. |
| Components | **Home.jsx** | Landing page, displays featured products using `fetchProductList`. |
| Components | **ProductPage.jsx** | Detailed view for a single product ID, with quantity selector. |
| Components | **Cart.jsx** | Cart management view, displays items and totals. |
| Components | **Login.jsx** | Centralized component for both Login and Registration. |
| Checkout | **Checkout.jsx** | Checkout Step 3: Order review and final submission. |

---

## ⚠️ Critical Development Notes & Resolution Plan

The following issues must be addressed for security and full functionality.

### 1. 🔑 Security Vulnerability: JWT Storage

The current use of `localStorage` for the JWT token is a major **Cross-Site Scripting (XSS)** vulnerability.

| Issue | Resolution | Action |
| :--- | :--- | :--- |
| **JWT Access** | Token is accessible to client-side scripts. | Migrate to **HttpOnly Cookies**. |
| **Files Affected** | `authControllers.js`, `store.jsx` | Update `authControllers.js` to set the JWT as an HttpOnly cookie with `secure: true` and `sameSite: 'Strict'` flags. Remove all token `localStorage` management from the frontend.  |

### 2. Missing Order Submission Workflow

The "Place Order" feature is incomplete, as the order data is never saved to the database.

| Issue | Resolution | Action |
| :--- | :--- | :--- |
| **Functional Gap** | Orders are not recorded; inventory is not updated. | Implement the **POST /api/orders** protected route. |
| **Files Affected** | New **`Order.js`** Model, New `orderControllers.js`, `Checkout.jsx` | The new route must handle receiving final cart data, **creating the `Order` document**, and crucially, **decrementing the `countInStock`** for all purchased products in the `Product.js` model. |

### 3. Redundant Signup Component

The functionality of `Signup.jsx` has been merged into `Login.jsx`.

| Issue | Resolution | Action |
| :--- | :--- | :--- |
| **Maintainability** | Duplicate code and confusing file structure. | **Delete Redundant File**. |
| **Files Affected** | `Signup.jsx`, `App.jsx` | **Remove `Signup.jsx`** and ensure the `/signup` route in `App.jsx` is either removed or redirects users to `/login`. |


## 🚀 Getting Started

You will need **Node.js**, **npm**, and a running **MongoDB instance** (local or hosted) to set up and run this project.

### 1. Backend (Server) Setup

1.  **Navigate** to the server directory:
    ```bash
    cd server
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment:**
    Create a **`.env`** file in the server root and populate it with your configuration:

    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/blinkit_clone
    JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
    FRONTEND_URL=http://localhost:5173
    ```

4.  **Seed the Database (Optional but Recommended):**
    Run the `seed.js` script to populate the database with initial products and vendors for testing.

    ```bash
    node seed.js
    ```

5.  **Start the Server:** The API will run on `http://localhost:5000`.

    ```bash
    node server.js
    ```

***

### 2. Frontend (Client) Setup

1.  **Navigate** to the client directory:
    ```bash
    cd client
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment:**
    Ensure your client `.env` file (e.g., `client/.env`) is configured correctly to point to the backend:

    ```bash
    VITE_APP_API_URL=http://localhost:5000
    ```

4.  **Start the Client:** The application will typically open in your browser on `http://localhost:5173`.

    ```bash
    npm run dev
    ```

> 🔔 **Note:** Both the backend server and frontend client must be running **concurrently** in two separate terminal windows for the full application to function.
