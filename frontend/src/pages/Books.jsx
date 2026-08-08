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
    <div className="flex-1 bg-[#0F2A44] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#F4D58D] mb-2">
            The Catalog
          </h1>
          <div className="w-24 h-[2px] bg-[#F4D58D] mx-auto" />
        </div>

        {loading && <p className="text-[#F4D58D] text-center">Loading books...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {!loading && books.length === 0 && !error && (
          <p className="text-[#F4D58D] text-center">No books available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
