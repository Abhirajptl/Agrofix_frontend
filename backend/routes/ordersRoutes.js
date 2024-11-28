const express = require("express");
const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/ordersController");

const router = express.Router();

// Place a new order
router.post("/", placeOrder);

// Get all orders (Admin only)
router.get("/", getOrders);

// Get a specific order by ID
router.get("/:orderId", getOrderById);

// Update an order's status
router.put("/:orderId", updateOrderStatus);

module.exports = router;
