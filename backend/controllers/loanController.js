const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');

const DUE_DAYS = 14;
const FINE_PER_DAY = 5;

// Borrower: borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies < 1) {
      return res.status(400).json({ message: 'No copies available' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + DUE_DAYS);

    const record = await BorrowRecord.create({
      book: book._id,
      borrower: req.user._id,
      dueDate,
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrower: renew a borrowed book
const renewBook = async (req, res) => {
  try {
    const record = await BorrowRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    if (record.status !== 'borrowed') {
      return res.status(400).json({ message: 'Only active loans can be renewed' });
    }
    record.dueDate = new Date(record.dueDate.getTime() + DUE_DAYS * 24 * 60 * 60 * 1000);
    record.renewCount += 1;
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrower/Librarian: return a book
const returnBook = async (req, res) => {
  try {
    const record = await BorrowRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.returnDate = new Date();
    record.status = 'returned';

    if (record.returnDate > record.dueDate) {
      const daysLate = Math.ceil((record.returnDate - record.dueDate) / (1000 * 60 * 60 * 24));
      record.fine = daysLate * FINE_PER_DAY;
    }
    await record.save();

    const book = await Book.findById(record.book);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrower: get own loan history
const getMyLoans = async (req, res) => {
  try {
    const records = await BorrowRecord.find({ borrower: req.user._id })
      .populate('book')
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Librarian: get all loan records
const getAllLoans = async (req, res) => {
  try {
    const records = await BorrowRecord.find()
      .populate('book')
      .populate('borrower', 'name email')
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { borrowBook, renewBook, returnBook, getMyLoans, getAllLoans };
