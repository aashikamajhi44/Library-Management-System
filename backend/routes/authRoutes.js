const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getPendingBorrowers,
  updateBorrowerStatus,
  getPendingLibrarians,
  updateLibrarianStatus,
  getAllUsers,
  deleteUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Librarian: manage pending borrowers
router.get('/pending', protect, authorize('librarian'), getPendingBorrowers);
router.put('/pending/:id', protect, authorize('librarian'), updateBorrowerStatus);

// Admin: manage pending librarians
router.get('/pending-librarians', protect, authorize('admin'), getPendingLibrarians);
router.put('/pending-librarians/:id', protect, authorize('admin'), updateLibrarianStatus);

// Admin: oversee all users
router.get('/users', protect, authorize('admin'), getAllUsers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
