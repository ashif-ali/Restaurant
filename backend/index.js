require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const menuItemRoutes = require('./src/api/routes/menuItem.routes')
const tableRoutes = require('./src/api/routes/table.routes')
const chefRoutes = require('./src/api/routes/chef.routes')
const orderRoutes = require('./src/api/routes/order.routes');
const analyticsRoutes = require('./src/api/routes/analytics.routes');
const clientRoutes = require('./src/api/routes/client.routes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to accept JSON in the request body

// Routes
app.use('/api/menu', menuItemRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/clients', clientRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });