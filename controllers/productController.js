const productService = require('../services/productService');

const getProducts = (req, res) => {
    const products = productService.getAllProducts();
    res.json(products);
};

const getProduct = (req, res) => {
    const product = productService.getProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
};

const createProduct = (req, res) => {
    const newProduct = productService.createProduct(req.body);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const updated = productService.updateProduct(req.params.id, req.body);
    if (updated) {
        res.json(updated);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
};

const deleteProduct = (req, res) => {
    const deleted = productService.deleteProduct(req.params.id);
    if (deleted) {
        res.json(deleted);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
