# Shelfmark — Library Management System

A full-stack library management platform built with the MERN stack. Borrowers register and get approved by a librarian, then browse the catalog, borrow/renew/return books, and leave feedback — all through a vintage library-card themed interface.

## Tech Stack

| Layer      | Technology                                  |
|------------|----------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, React Router   |
| Backend    | Node.js, Express.js                          |
| Database   | MongoDB with Mongoose                        |
| Auth       | JWT, bcrypt password hashing                 |

## Project Structure

```
Library Management System/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── models/          # User, Book, BorrowRecord, Feedback
│   ├── middleware/       # JWT auth + role-based access
│   ├── controllers/      # Route logic
│   ├── routes/           # API route groups
│   ├── seed.js           # Seeds librarian account + sample books
│   └── server.js         # Express entry point
└── frontend/
    └── src/
        ├── api/          # Axios instance
        ├── context/      # AuthContext (login/register/logout state)
        ├── components/   # Navbar, Footer, BookCard, ProtectedRoute
        └── pages/         # Home, About, Books, Login, Register, Dashboards
```

## Key Features

- Borrower registration with librarian approval workflow (pending/approved/rejected)
- Book catalog with copy availability tracking
- Borrow, renew, and return flow with automatic due dates and late fines
- Feedback system with a public "From the Community" ratings section
- Role-based dashboards for Borrowers and Librarians
- JWT-based authentication with protected routes

## Database Models

| Model         | Description                                      |
|---------------|---------------------------------------------------|
| User          | Borrower and librarian accounts, approval status  |
| Book          | Catalog entries with copy counts                  |
| BorrowRecord  | Loan tracking — dates, status, renewals, fines    |
| Feedback      | Borrower ratings and comments                     |

## API Routes

| Prefix           | File                     | Description                                  |
|-------------------|--------------------------|-----------------------------------------------|
| `/api/auth`       | routes/authRoutes.js     | Register, login, pending borrower approval    |
| `/api/books`      | routes/bookRoutes.js     | Catalog CRUD                                  |
| `/api/loans`      | routes/loanRoutes.js     | Borrow, renew, return, loan history           |
| `/api/feedback`   | routes/feedbackRoutes.js | Submit feedback, public + librarian views     |

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/aashikamajhi44/Library-Management-System.git
cd "Library Management System"
```

### 2. Setup the backend

```bash
cd backend
npm install
# Create a .env file — see Environment Variables below
node seed.js       # creates the librarian account + sample books
npm run dev
```

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

## Environment Variables

Create a `.env` file inside `backend/`:

| Variable      | Description                                  |
|----------------|-----------------------------------------------|
| `PORT`         | Server port (default 5000)                    |
| `MONGO_URI`    | MongoDB connection string                     |
| `JWT_SECRET`   | Secret key for signing JWTs                   |

Never commit your `.env` file — it's listed in `.gitignore`.

## Default Librarian Account

After running `node seed.js`:

- Email: `librarian@shelfmark.com`
- Password: `librarian123`

## Branch Structure

| Branch    | Purpose                                            |
|-----------|-----------------------------------------------------|
| `main`    | Stable code                                          |
| `aashika` | Active development branch, merged into main periodically |

## License

Developed as an enrichment project.