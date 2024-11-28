const pool = require("../models/db");

// Place an order
exports.placeOrder = async (req, res) => {
  const { name, contact, address, items } = req.body;

  if (!name || !contact || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO orders (name, contact, address, items, status) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, contact, address, JSON.stringify(items), "Pending"]
    );
    const orderId = result.rows[0].id;
    res.status(201).json({ message: "Order placed successfully!", order: { id: orderId } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (Admin use)
exports.getOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!["Pending", "In Progress", "Delivered"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, orderId]);
    res.status(200).json({ message: "Order status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
