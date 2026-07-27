const Feedback = require('../models/Feedback');

// Borrower: submit feedback
const createFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const feedback = await Feedback.create({
      borrower: req.user._id,
      rating,
      comment,
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Librarian: get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('borrower', 'name email')
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: get recent feedback for "From the Community" section
const getPublicFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('borrower', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFeedback, getAllFeedback, getPublicFeedback };
