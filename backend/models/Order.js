const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  buyerDetails: {
    name: { type: String, required: [true, 'Name is required'] },
    contact: { type: String, required: [true, 'Contact is required'] },
    address: { type: String, required: [true, 'Address is required'] },
  },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Delivered'] },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Order', orderSchema);
