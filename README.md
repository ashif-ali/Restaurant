# Restaurant Management Full-Stack Project

This is a complete MERN stack application designed to manage a restaurant's operations. The project is divided into three main parts: a robust backend API, a feature-rich dashboard for restaurant staff, and a modern, mobile-first web app for customers to place orders.

## 🚀 Live Demo

  * **Customer App:** [user-client2327.netlify.app](https://www.google.com/search?q=https://user-client2327.netlify.app)
  * **Restaurant Dashboard:** [restaurant-client2327.netlify.app](https://www.google.com/search?q=https://restaurant-client2327.netlify.app)
  * **Backend API:** [https://restaurant-api-k7su.onrender.com](https://restaurant-api-k7su.onrender.com)

-----

## ✨ Key Features

### Backend API (`/backend`)

  * **RESTful Architecture:** Built with Node.js and Express.js for scalable and maintainable endpoints.
  * **MongoDB Database:** Uses Mongoose for object data modeling and interaction with a MongoDB Atlas database.
  * **Smart Chef Assignment:** Automatically assigns new orders to the chef with the fewest active (`Processing`) orders.
  * **Intelligent Table Allocation:** Finds the smallest available table that can accommodate the number of people for a Dine-In order.
  * **Advanced Analytics:** Provides aggregated data for revenue, order summaries, and chef performance.
  * **Full CRUD Operations:** Endpoints for managing menu items, tables, chefs, and orders.

### Restaurant Client (`/frontend/restaurant-client`)

  * **Real-time Analytics Dashboard:** Displays key metrics like total revenue, orders, clients, and chef counts. Features interactive charts for order summaries and revenue trends.
  * **Order Line Management:** A live view of all incoming and processing orders, with timers for preparation and the ability to mark orders as complete.
  * **Table Management:** A visual grid of all restaurant tables, allowing staff to add or delete tables. Reserved tables are visually distinct and protected from deletion.
  * **Menu Overview:** A read-only view of all menu items, complete with a search filter.

### User Client (`/frontend/user-client`)

  * **Mobile-First Design:** A clean, responsive interface designed for an optimal mobile experience.
  * **Dynamic Menu:** Browse menu items with category-specific filtering and a server-side search that queries the entire database.
  * **Infinite Scroll:** Menu items are loaded in paginated chunks as the user scrolls, ensuring fast initial load times.
  * **Persistent Cart:** A global state (using React Context) manages the user's cart, so selections persist across different categories and pages.
  * **Full Checkout Flow:** A multi-step process for order confirmation, including adding cooking instructions, selecting Dine-In vs. Takeaway, and viewing a detailed bill.
  * **Interactive Order Placement:** A "Swipe to Order" button provides a modern, mobile-native feel for finalizing an order.
  * **Real-time Feedback:** Uses toast notifications to provide instant feedback on order success or failure (e.g., "No tables available").

-----

## 🛠️ Tech Stack

  * **Frontend:** React (Vite), JavaScript, Axios
  * **Backend:** Node.js, Express.js
  * **Database:** MongoDB (with Mongoose)
  * **Deployment:**
      * Frontends on **Netlify**
      * Backend on **Render**
      * Database on **MongoDB Atlas**

-----

## 📂 Project Structure

The project is organized in a monorepo-style structure within a single GitHub repository.

```
/restaurant
├── backend/            # The Node.js + Express.js API
├── frontend/
│   ├── restaurant-client/ # The React app for the restaurant staff
│   └── user-client/       # The React app for customers
└── .gitignore
```

-----

## 🏃‍♂️ Getting Started (Local Setup)

To run this project on your local machine, follow these steps.

### Prerequisites

  * Node.js (v18 or later recommended)
  * npm
  * A local or cloud instance of MongoDB (e.g., MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd restaurant
    ```

2.  **Set up the Backend:**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `/backend` directory and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_atlas_connection_string
    PORT=5000
    ```

    Then, start the backend server:

    ```bash
    npm start
    ```

    The API will be running at `http://localhost:5000`.

3.  **Set up the Restaurant Client:**
    Open a new terminal window.

    ```bash
    cd frontend/restaurant-client
    npm install
    ```

    Create a `.env.local` file in the `/frontend/restaurant-client` directory and add the local API URL:

    ```env
    VITE_API_URL=http://localhost:5000
    ```

    Start the frontend dev server:

    ```bash
    npm run dev
    ```

    The app will be accessible at `http://localhost:5173` (or another port if 5173 is busy).

4.  **Set up the User Client:**
    Open a third terminal window.

    ```bash
    cd frontend/user-client
    npm install
    ```

    Create a `.env.local` file in the `/frontend/user-client` directory:

    ```env
    VITE_API_URL=http://localhost:5000
    ```

    Start the frontend dev server:

    ```bash
    npm run dev
    ```

    This app will likely run on another port, such as `http://localhost:5174`.
