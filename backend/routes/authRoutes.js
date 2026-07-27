const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getPendingBorrowers, updateBorrowerStatus } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/pending', protect, authorize('librarian'), getPendingBorrowers);
router.put('/pending/:id', protect, authorize('librarian'), updateBorrowerStatus);

module.exports = router;
