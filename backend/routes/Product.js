const express = require('express');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);            // Fetch all products
router.get('/:id', getProductById);      // Fetch a specific product by ID
router.post('/', addProduct);            // Add a new product
router.put('/:id', updateProduct);       // Update a product by ID
router.delete('/:id', deleteProduct);    // Delete a product by ID

module.exports = router;
