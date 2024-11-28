const express = require('express');
const { getAdmins, createAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const router = express.Router();

router.get('/', getAdmins);         // Fetch all admins
router.post('/', createAdmin);      // Create a new admin
router.put('/:id', updateAdmin);    // Update an admin by ID
router.delete('/:id', deleteAdmin); // Delete an admin by ID

module.exports = router;
