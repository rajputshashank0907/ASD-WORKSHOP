let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
];

module.exports = {
    getProducts: () => products,
    getProductById: (id) => products.find(p => p.id === id),
    addProduct: (product) => {
        const newProduct = { id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1, ...product };
        products.push(newProduct);
        return newProduct;
    },
    updateProduct: (id, updatedData) => {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedData };
            return products[index];
        }
        return null;
    },
    deleteProduct: (id) => {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            return products.splice(index, 1)[0];
        }
        return null;
    }
};
