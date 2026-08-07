import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Home = () => {
  const [feedback, setFeedback] = useState([]);
  const [bookCount, setBookCount] = useState(null);

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const [feedbackRes, booksRes] = await Promise.all([
          api.get("/feedback/public"),
          api.get("/books"),
        ]);
        setFeedback(feedbackRes.data);
        setBookCount(booksRes.data.length);
      } catch (err) {
        // Silently ignore — homepage still works without these
      }
    };
    fetchExtras();
  }, []);

  return (
    <div className="flex-1 bg-[#0F2A44]">
      {/* Hero */}
      <section className="py-24 px-6 text-center border-b-4 border-[#C9A227]">
        <p className="text-[#C9A227] uppercase tracking-widest text-sm mb-3">
          Est. Community Library
        </p>
        <h1 className="text-5xl font-serif font-bold text-[#F4D58D] mb-4">
          Shelfmark
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto mb-2 italic">
          "Every book you borrow, every card you stamp — a small mark on the shelf of your reading life."
        </p>
        {bookCount !== null && (
          <p className="text-[#8FA6BF] text-sm mb-8">
            {bookCount} titles currently on the shelves and growing.
          </p>
        )}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link
            to="/books"
            className="inline-block bg-[#F4D58D] text-[#0F2A44] font-serif font-semibold px-8 py-3 rounded shadow hover:bg-[#e8c56f] transition-colors"
          >
            Browse the Catalog
          </Link>
          <Link
            to="/register"
            className="inline-block border-2 border-[#F4D58D] text-[#F4D58D] font-serif font-semibold px-8 py-3 rounded hover:bg-[#F4D58D]/10 transition-colors"
          >
            Get a Library Card
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-[#FDF8EE]">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-serif font-bold text-[#1B2A3A]">How Shelfmark Works</h2>
          <div className="w-16 h-[2px] bg-[#C9A227] mx-auto mt-3" />
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#1B4F82] text-[#F4D58D] flex items-center justify-center mx-auto mb-3 font-serif font-bold">1</div>
            <h3 className="font-serif font-bold text-[#1B2A3A] text-lg mb-2">Register</h3>
            <p className="text-sm text-[#5A4A3A]">
              Sign up for a library card with your name, email, and phone. Every
              new member is reviewed by our librarian before borrowing begins.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#1B4F82] text-[#F4D58D] flex items-center justify-center mx-auto mb-3 font-serif font-bold">2</div>
            <h3 className="font-serif font-bold text-[#1B2A3A] text-lg mb-2">Borrow</h3>
            <p className="text-sm text-[#5A4A3A]">
              Once approved, browse the full catalog and check out books for
              two weeks at a time, with renewals available if you need more.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#1B4F82] text-[#F4D58D] flex items-center justify-center mx-auto mb-3 font-serif font-bold">3</div>
            <h3 className="font-serif font-bold text-[#1B2A3A] text-lg mb-2">Return & Review</h3>
            <p className="text-sm text-[#5A4A3A]">
              Return your books on time, or renew if you're not done yet.
              Then share your thoughts to help other readers discover them.
            </p>
          </div>
        </div>
      </section>

      {/* From the Community */}
      {feedback.length > 0 && (
        <section className="py-16 px-6 bg-[#0F2A44] border-t-4 border-[#C9A227]">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-[#F4D58D]">From the Community</h2>
            <div className="w-16 h-[2px] bg-[#C9A227] mx-auto mt-3" />
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {feedback.slice(0, 6).map((f) => (
              <div
                key={f._id}
                className="bg-[#FDF8EE] border-2 border-[#C9A227] rounded-md p-5"
              >
                <p className="text-[#C9A227] mb-2">
                  {"★".repeat(f.rating)}
                  <span className="text-[#8A7355]">{"★".repeat(5 - f.rating)}</span>
                </p>
                <p className="text-sm text-[#5A4A3A] italic mb-3">"{f.comment}"</p>
                <p className="text-xs uppercase tracking-wide text-[#8A7355] font-semibold">
                  — {f.borrower?.name || "A Member"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Closing note */}
      <section className="py-16 px-6 bg-[#FDF8EE] text-center">
        <h2 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-3">
          Your Next Great Read is Waiting
        </h2>
        <p className="text-[#5A4A3A] max-w-xl mx-auto mb-6">
          Whether you're chasing a thriller, a memoir, or your next favorite
          self-help book, Shelfmark's shelves are open to you.
        </p>
        <Link
          to="/books"
          className="inline-block bg-[#1B4F82] text-white font-serif font-semibold px-8 py-3 rounded shadow hover:bg-[#163f68] transition-colors"
        >
          Explore the Catalog
        </Link>
      </section>
    </div>
  );
};

export default Home;
