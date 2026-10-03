const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

// Built-in middleware for parsing JSON bodies
app.use(express.json());

// Mount the product routes
app.use('/products', productRoutes);

// Export app for testing purposes, or start server if run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
