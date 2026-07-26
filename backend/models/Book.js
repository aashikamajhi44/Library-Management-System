const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    genre: { type: String, trim: true },
    description: { type: String, trim: true },
    totalCopies: { type: Number, required: true, default: 1 },
    availableCopies: { type: Number, required: true, default: 1 },
    coverColor: { type: String, default: '#1B4F82' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
