require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Book = require('./models/Book');

const seedData = async () => {
  await connectDB();

  const librarianExists = await User.findOne({ role: 'librarian' });
  if (!librarianExists) {
    await User.create({
      name: 'Head Librarian',
      email: 'librarian@shelfmark.com',
      password: 'librarian123',
      role: 'librarian',
    });
    console.log('Librarian account created: librarian@shelfmark.com / librarian123');
  } else {
    console.log('Librarian already exists, skipping.');
  }

  const bookCount = await Book.countDocuments();
  if (bookCount === 0) {
    await Book.insertMany([
      { title: 'The Silent Patient', author: 'Alex Michaelides', isbn: '9781250301697', genre: 'Thriller', totalCopies: 3, availableCopies: 3, coverColor: '#1B4F82' },
      { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', genre: 'Memoir', totalCopies: 2, availableCopies: 2, coverColor: '#8A5A3B' },
      { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', genre: 'Self-Help', totalCopies: 4, availableCopies: 4, coverColor: '#2F6B4F' },
      { title: 'Project Hail Mary', author: 'Andy Weir', isbn: '9780593135204', genre: 'Sci-Fi', totalCopies: 2, availableCopies: 2, coverColor: '#5B3A8A' },
    ]);
    console.log('Sample books added.');
  } else {
    console.log('Books already exist, skipping.');
  }

  console.log('Seeding complete.');
  process.exit();
};

seedData();
