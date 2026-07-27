const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, authorize('librarian'), createBook);
router.put('/:id', protect, authorize('librarian'), updateBook);
router.delete('/:id', protect, authorize('librarian'), deleteBook);

module.exports = router;
