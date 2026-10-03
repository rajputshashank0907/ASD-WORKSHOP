const db = require('../database/db');

const getAllProducts = () => {
    return db.getProducts();
};

const getProductById = (id) => {
    return db.getProductById(Number(id));
};

const createProduct = (data) => {
    return db.addProduct(data);
};

const updateProduct = (id, data) => {
    return db.updateProduct(Number(id), data);
};

const deleteProduct = (id) => {
    return db.deleteProduct(Number(id));
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
