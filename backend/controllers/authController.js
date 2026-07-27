const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc Register a new borrower
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password, phone, role: 'borrower' });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      message: 'Registered successfully. Waiting for librarian approval.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user (borrower or librarian)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Librarian: list all pending borrowers
const getPendingBorrowers = async (req, res) => {
  try {
    const pending = await User.find({ role: 'borrower', status: 'pending' }).select('-password');
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Librarian: approve or reject a borrower
const updateBorrowerStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'borrower') {
      return res.status(404).json({ message: 'Borrower not found' });
    }
    user.status = status;
    await user.save();
    res.json({ message: `Borrower ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getPendingBorrowers, updateBorrowerStatus };
