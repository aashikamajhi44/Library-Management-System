const express = require('express');
const router = express.Router();
const { borrowBook, renewBook, returnBook, getMyLoans, getAllLoans } = require('../controllers/loanController');
const { protect } = require('../middleware/auth');
const { authorize, requireApproved } = require('../middleware/role');

router.post('/borrow', protect, requireApproved, borrowBook);
router.put('/:id/renew', protect, requireApproved, renewBook);
router.put('/:id/return', protect, returnBook);
router.get('/mine', protect, getMyLoans);
router.get('/', protect, authorize('librarian'), getAllLoans);

module.exports = router;
