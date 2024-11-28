const express = require("express");
const {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productsController");

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Add a new product
router.post("/", addProduct);

// Edit an existing product
router.put("/:productId", editProduct);

// Delete a product
router.delete("/:productId", deleteProduct);

module.exports = router;
