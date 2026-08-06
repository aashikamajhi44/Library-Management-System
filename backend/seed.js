require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Book = require('./models/Book');

const seedData = async () => {
  await connectDB();

  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    await User.create({
      name: 'Site Admin',
      email: 'admin@shelfmark.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin account created: admin@shelfmark.com / admin123');
  } else {
    console.log('Admin already exists, skipping.');
  }

  const bookCount = await Book.countDocuments();
  if (bookCount === 0) {
    await Book.insertMany([
      { title: 'The Silent Patient', author: 'Alex Michaelides', isbn: '9781250301697', genre: 'Thriller', totalCopies: 3, availableCopies: 3, coverColor: '#1B4F82' },
      { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', genre: 'Memoir', totalCopies: 2, availableCopies: 2, coverColor: '#8A5A3B' },
      { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', genre: 'Self-Help', totalCopies: 4, availableCopies: 4, coverColor: '#2F6B4F' },
      { title: 'Project Hail Mary', author: 'Andy Weir', isbn: '9780593135204', genre: 'Sci-Fi', totalCopies: 2, availableCopies: 2, coverColor: '#5B3A8A' },
      { title: 'The Midnight Library', author: 'Matt Haig', isbn: '9780525559474', genre: 'Fiction', totalCopies: 3, availableCopies: 3, coverColor: '#1B4F82' },
      { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genre: 'History', totalCopies: 2, availableCopies: 2, coverColor: '#8A5A3B' },
      { title: 'The Silmarillion', author: 'J.R.R. Tolkien', isbn: '9780618391110', genre: 'Fantasy', totalCopies: 2, availableCopies: 2, coverColor: '#5B3A8A' },
      { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588364', genre: 'Thriller', totalCopies: 3, availableCopies: 3, coverColor: '#8A2C2C' },
      { title: 'Becoming', author: 'Michelle Obama', isbn: '9781524763138', genre: 'Memoir', totalCopies: 2, availableCopies: 2, coverColor: '#2F6B4F' },
      { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genre: 'Sci-Fi', totalCopies: 3, availableCopies: 3, coverColor: '#5B3A8A' },
      { title: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780062315007', genre: 'Fiction', totalCopies: 4, availableCopies: 4, coverColor: '#1B4F82' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', genre: 'Psychology', totalCopies: 2, availableCopies: 2, coverColor: '#8A5A3B' },
    ]);
    console.log('Sample books added.');
  } else {
    console.log('Books already exist, skipping.');
  }

  console.log('Seeding complete.');
  process.exit();
};

seedData();
