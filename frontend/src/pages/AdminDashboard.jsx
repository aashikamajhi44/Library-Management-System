import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "../components/DashboardSidebar";

const AdminDashboard = () => {
  const [pendingLibrarians, setPendingLibrarians] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("pending");

  const [bookForm, setBookForm] = useState({
    title: "", author: "", isbn: "", genre: "", totalCopies: 1, coverColor: "#1B4F82",
  });
  const [bookMsg, setBookMsg] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);

  const fetchData = async () => {
    try {
      const [pendingRes, usersRes, booksRes, feedbackRes, contactsRes] = await Promise.all([
        api.get("/auth/pending-librarians"),
        api.get("/auth/users"),
        api.get("/books"),
        api.get("/feedback"),
        api.get("/contact"),
      ]);
      setPendingLibrarians(pendingRes.data);
      setUsers(usersRes.data);
      setBooks(booksRes.data);
      setFeedback(feedbackRes.data);
      setContacts(contactsRes.data);
    } catch (err) {
      setError("Could not load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDecision = async (id, status) => {
    try {
      await api.put(`/auth/pending-librarians/${id}`, { status });
      setPendingLibrarians((prev) => prev.filter((u) => u._id !== id));
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  const handleRemoveUser = async (id) => {
    if (!window.confirm("Remove this user permanently?")) return;
    try {
      await api.delete(`/auth/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not remove user");
    }
  };

  const resetBookForm = () => {
    setBookForm({ title: "", author: "", isbn: "", genre: "", totalCopies: 1, coverColor: "#1B4F82" });
    setEditingBookId(null);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setBookMsg("");
    try {
      if (editingBookId) {
        const { data } = await api.put(`/books/${editingBookId}`, bookForm);
        setBooks((prev) => prev.map((b) => (b._id === editingBookId ? data : b)));
        setBookMsg("Book updated.");
      } else {
        const { data } = await api.post("/books", bookForm);
        setBooks((prev) => [data, ...prev]);
        setBookMsg("Book added.");
      }
      resetBookForm();
    } catch (err) {
      setBookMsg(err.response?.data?.message || "Could not save book");
    }
  };

  const handleEditBook = (book) => {
    setEditingBookId(book._id);
    setBookForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre || "",
      totalCopies: book.totalCopies,
      coverColor: book.coverColor || "#1B4F82",
    });
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this book permanently?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete book");
    }
  };

  const librarians = users.filter((u) => u.role === "librarian");
  const borrowers = users.filter((u) => u.role === "borrower");

  const statusBadge = (status) => {
    const colors = {
      approved: "bg-[#2F6B4F] text-white",
      pending: "bg-[#C9A227] text-[#0F2A44]",
      rejected: "bg-[#8A2C2C] text-white",
    };
    return (
      <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const renderUserRow = (u) => (
    <div
      key={u._id}
      className="bg-white border-2 border-[#1B4F82] rounded p-4 flex justify-between items-center"
    >
      <div>
        <p className="font-serif font-semibold text-[#1B2A3A]">{u.name}</p>
        <p className="text-sm text-[#5A4A3A]">{u.email}</p>
      </div>
      <div className="flex items-center gap-3">
        {statusBadge(u.status)}
        <button
          onClick={() => handleRemoveUser(u._id)}
          className="text-sm border-2 border-[#8A2C2C] text-[#8A2C2C] px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );

  const items = [
    { key: "pending", label: "Pending Approvals", count: pendingLibrarians.length },
    { key: "librarians", label: "Librarians", count: librarians.length },
    { key: "borrowers", label: "Borrowers", count: borrowers.length },
    { key: "books", label: "Books", count: books.length },
    { key: "feedback", label: "Feedback", count: feedback.length },
    { key: "contacts", label: "Contact Messages", count: contacts.length },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#FDF8EE]">
      <DashboardSidebar
        title="Admin"
        subtitle="Shelfmark Control Panel"
        items={items}
        active={active}
        onSelect={setActive}
      />

      <main className="flex-1 p-8 max-w-4xl">
        {loading && <p className="text-[#5A4A3A]">Loading...</p>}
        {error && <p className="text-red-700">{error}</p>}

        {!loading && active === "pending" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">
              Pending Librarian Approvals
            </h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <div className="space-y-3">
              {pendingLibrarians.map((u) => (
                <div
                  key={u._id}
                  className="bg-white border-2 border-[#1B4F82] rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-serif font-semibold text-[#1B2A3A]">{u.name}</p>
                    <p className="text-sm text-[#5A4A3A]">{u.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(u._id, "approved")}
                      className="text-sm bg-[#0F2A44] text-[#F4D58D] px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(u._id, "rejected")}
                      className="text-sm border-2 border-[#0F2A44] text-[#0F2A44] px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {pendingLibrarians.length === 0 && (
                <p className="text-[#5A4A3A]">No pending librarian approvals.</p>
              )}
            </div>
          </>
        )}

        {!loading && active === "librarians" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">Librarians</h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <div className="space-y-3">
              {librarians.map(renderUserRow)}
              {librarians.length === 0 && <p className="text-[#5A4A3A]">No librarians yet.</p>}
            </div>
          </>
        )}

        {!loading && active === "borrowers" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">Borrowers</h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <div className="space-y-3">
              {borrowers.map(renderUserRow)}
              {borrowers.length === 0 && <p className="text-[#5A4A3A]">No borrowers yet.</p>}
            </div>
          </>
        )}

        {!loading && active === "books" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">
              Manage Books
            </h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />

            <form
              onSubmit={handleBookSubmit}
              className="bg-white border-2 border-[#C9A227] rounded p-4 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {bookMsg && <p className="sm:col-span-2 text-sm text-[#1B4F82] font-semibold">{bookMsg}</p>}
              <input
                type="text" placeholder="Title" required
                value={bookForm.title}
                onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                className="border-2 border-[#1B4F82]/30 rounded px-3 py-2"
              />
              <input
                type="text" placeholder="Author" required
                value={bookForm.author}
                onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                className="border-2 border-[#1B4F82]/30 rounded px-3 py-2"
              />
              <input
                type="text" placeholder="ISBN" required
                value={bookForm.isbn}
                onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                className="border-2 border-[#1B4F82]/30 rounded px-3 py-2"
              />
              <input
                type="text" placeholder="Genre"
                value={bookForm.genre}
                onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                className="border-2 border-[#1B4F82]/30 rounded px-3 py-2"
              />
              <input
                type="number" min="1" placeholder="Total Copies" required
                value={bookForm.totalCopies}
                onChange={(e) => setBookForm({ ...bookForm, totalCopies: Number(e.target.value) })}
                className="border-2 border-[#1B4F82]/30 rounded px-3 py-2"
              />
              <input
                type="color"
                value={bookForm.coverColor}
                onChange={(e) => setBookForm({ ...bookForm, coverColor: e.target.value })}
                className="border-2 border-[#1B4F82]/30 rounded h-11"
              />
              <div className="sm:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="bg-[#0F2A44] text-[#F4D58D] font-serif font-semibold px-4 py-2 rounded"
                >
                  {editingBookId ? "Update Book" : "Add Book"}
                </button>
                {editingBookId && (
                  <button
                    type="button"
                    onClick={resetBookForm}
                    className="border-2 border-[#0F2A44] text-[#0F2A44] px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3">
              {books.map((b) => (
                <div
                  key={b._id}
                  className="bg-white border-2 border-[#1B4F82] rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-serif font-semibold text-[#1B2A3A]">{b.title}</p>
                    <p className="text-sm text-[#5A4A3A]">
                      {b.author} — {b.genre} — {b.availableCopies}/{b.totalCopies} available
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBook(b)}
                      className="text-sm bg-[#0F2A44] text-[#F4D58D] px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(b._id)}
                      className="text-sm border-2 border-[#8A2C2C] text-[#8A2C2C] px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {books.length === 0 && <p className="text-[#5A4A3A]">No books yet.</p>}
            </div>
          </>
        )}

        {!loading && active === "feedback" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">All Feedback</h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <div className="space-y-3">
              {feedback.map((f) => (
                <div key={f._id} className="bg-white border-2 border-[#C9A227] rounded p-4">
                  <p className="font-serif font-semibold text-[#1B2A3A]">
                    {f.borrower?.name} — {f.rating}/5
                  </p>
                  <p className="text-sm text-[#5A4A3A]">{f.comment}</p>
                </div>
              ))}
              {feedback.length === 0 && <p className="text-[#5A4A3A]">No feedback yet.</p>}
            </div>
          </>
        )}

        {!loading && active === "contacts" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">
              Contact Messages
            </h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c._id} className="bg-white border-2 border-[#C9A227] rounded p-4">
                  <p className="font-serif font-semibold text-[#1B2A3A]">{c.name}</p>
                  <p className="text-xs text-[#8A7355] mb-2">{c.email}</p>
                  <p className="text-sm text-[#5A4A3A]">{c.message}</p>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-[#5A4A3A]">No messages yet.</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
