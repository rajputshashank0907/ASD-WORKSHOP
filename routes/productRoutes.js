const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware, invalidateCacheMiddleware } = require('../middleware/cache');

// Apply invalidation middleware for mutations (POST, PUT, PATCH, DELETE)
router.use(invalidateCacheMiddleware);

// Define endpoints with cache middleware on GET routes
router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProduct);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
