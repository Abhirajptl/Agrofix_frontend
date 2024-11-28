const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const router = express.Router();

router.get('/', getAllOrders);           // Fetch all orders
router.get('/:id', getOrderById);        // Fetch a specific order by ID
router.post('/', createOrder);           // Create a new order
router.put('/:id', updateOrderStatus);   // Update an order's status
router.delete('/:id', deleteOrder);      // Delete an order by ID

module.exports = router;
