const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/adminController");

const router = express.Router();

// Orders management
router.get("/orders", getAllOrders);
router.put("/orders/:orderId", updateOrderStatus);

// Inventory management
router.post("/products", addProduct);
router.put("/products/:productId", editProduct);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
