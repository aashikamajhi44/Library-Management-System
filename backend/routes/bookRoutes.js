const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, authorize('librarian', 'admin'), createBook);
router.put('/:id', protect, authorize('librarian', 'admin'), updateBook);
router.delete('/:id', protect, authorize('librarian', 'admin'), deleteBook);

module.exports = router;
