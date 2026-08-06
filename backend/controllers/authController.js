const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc Register a new borrower or librarian
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const finalRole = role === 'librarian' ? 'librarian' : 'borrower';

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password, phone, role: finalRole });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      message:
        finalRole === 'librarian'
          ? 'Registered successfully. Waiting for admin approval.'
          : 'Registered successfully. Waiting for librarian approval.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user (borrower, librarian, or admin)
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
    const { status } = req.body;
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

// @desc Admin: list all pending librarians
const getPendingLibrarians = async (req, res) => {
  try {
    const pending = await User.find({ role: 'librarian', status: 'pending' }).select('-password');
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Admin: approve or reject a librarian
const updateLibrarianStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'librarian') {
      return res.status(404).json({ message: 'Librarian not found' });
    }
    user.status = status;
    await user.save();
    res.json({ message: `Librarian ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Admin: list all users (librarians + borrowers) for oversight
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Admin: remove a librarian or borrower account
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role === 'admin') {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getPendingBorrowers,
  updateBorrowerStatus,
  getPendingLibrarians,
  updateLibrarianStatus,
  getAllUsers,
  deleteUser,
};
