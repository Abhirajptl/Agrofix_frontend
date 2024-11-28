const Order = require('../models/Order');
const Product = require('../models/Product');

// GET: Fetch all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Fetch a specific order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('items.product', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Create a new order
// POST: Create a new order
const createOrder = async (req, res) => {
  const { items, buyerDetails } = req.body;

  try {
    // Validate products in the order
    if (!buyerDetails.name || !buyerDetails.contact || !buyerDetails.address) {
      return res.status(400).json({ message: 'Buyer details are required' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'At least one product item must be added to the order' });
    }

    // Validate that each product in the order exists
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.product} not found` });
      }
    }

    // Create a new order with buyer details and items
    const newOrder = new Order({
      items,
      buyerDetails,
      status: 'Pending', // Default status
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Populate the product details in the response
    const populatedOrder = await savedOrder.populate('items.product').execPopulate();

    // Return the populated order with product details
    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder, // Return the full populated order
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT: Update an existing order's status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.remove();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
