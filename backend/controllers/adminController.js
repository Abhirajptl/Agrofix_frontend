const pool = require("../models/db");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
    res.status(200).json(result.rows);
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
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
      status,
      orderId,
    ]);
    res.status(200).json({ message: "Order status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price || isNaN(price)) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  try {
    await pool.query("INSERT INTO products (name, price) VALUES ($1, $2)", [
      name,
      price,
    ]);
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a product
exports.editProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price } = req.body;

  if (!name || !price || isNaN(price)) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  try {
    await pool.query(
      "UPDATE products SET name = $1, price = $2 WHERE id = $3",
      [name, price, productId]
    );
    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await pool.query("DELETE FROM products WHERE id = $1", [productId]);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
