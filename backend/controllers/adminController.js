const Admin = require('../models/Admin');

// GET: Fetch all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, '-password'); // Exclude passwords for security
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Create a new admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this username already exists' });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully', admin: { username: newAdmin.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Update an existing admin
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (username) admin.username = username;
    if (password) admin.password = password; // Will be hashed due to pre-save hook

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully', admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Remove an admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await admin.remove();
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
