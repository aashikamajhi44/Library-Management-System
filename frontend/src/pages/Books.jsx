import { useEffect, useState } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/books");
        setBooks(data);
      } catch (err) {
        setError("Could not load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex-1 bg-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Book Catalog</h1>

        {loading && <p className="text-slate-600">Loading books...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {!loading && books.length === 0 && !error && (
          <p className="text-slate-600">No books available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
