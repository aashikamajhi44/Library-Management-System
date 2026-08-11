import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import DashboardSidebar from "../components/DashboardSidebar";

const BorrowerDashboard = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("loans");

  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const isPending = user?.status !== "approved";

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await api.get("/loans/mine");
        setLoans(data);
      } catch (err) {
        setError("Could not load your loans.");
      } finally {
        setLoading(false);
      }
    };
    if (!isPending) fetchLoans();
    else setLoading(false);
  }, [isPending]);

  const handleReturn = async (id) => {
    try {
      await api.put(`/loans/${id}/return`);
      setLoans((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: "returned" } : l))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Return failed");
    }
  };

  const handleRenew = async (id) => {
    try {
      const { data } = await api.put(`/loans/${id}/renew`);
      setLoans((prev) => prev.map((l) => (l._id === id ? data : l)));
    } catch (err) {
      alert(err.response?.data?.message || "Renew failed");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMsg("");
    try {
      await api.post("/feedback", { rating: feedbackRating, comment: feedbackComment });
      setFeedbackMsg("Thank you for your feedback!");
      setFeedbackComment("");
    } catch (err) {
      setFeedbackMsg(err.response?.data?.message || "Could not submit feedback");
    }
  };

  const items = isPending
    ? [{ key: "loans", label: "My Loans" }]
    : [
        { key: "loans", label: "My Loans", count: loans.length },
        { key: "feedback", label: "Give Feedback" },
      ];

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#FDF8EE]">
      <DashboardSidebar
        title={user?.name || "Borrower"}
        subtitle="My Library Card"
        items={items}
        active={active}
        onSelect={setActive}
      />

      <main className="flex-1 p-8 max-w-4xl">
        {isPending && (
          <div className="bg-white border-2 border-[#C9A227] text-[#5A4A3A] rounded p-4">
            Your account is pending librarian approval. You'll be able to borrow
            books once approved.
          </div>
        )}

        {!isPending && active === "loans" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">My Loans</h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />

            {loading && <p className="text-[#5A4A3A]">Loading...</p>}
            {error && <p className="text-red-700">{error}</p>}

            <div className="space-y-3">
              {loans.map((loan) => (
                <div
                  key={loan._id}
                  className="bg-white border-2 border-[#1B4F82] rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-serif font-semibold text-[#1B2A3A]">{loan.book?.title}</p>
                    <p className="text-sm text-[#5A4A3A]">
                      Due: {new Date(loan.dueDate).toLocaleDateString()} — Status: {loan.status}
                      {loan.fine > 0 && ` — Fine: Rs. ${loan.fine}`}
                    </p>
                  </div>
                  {loan.status === "borrowed" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRenew(loan._id)}
                        className="text-sm bg-[#0F2A44] text-[#F4D58D] px-3 py-1 rounded"
                      >
                        Renew
                      </button>
                      <button
                        onClick={() => handleReturn(loan._id)}
                        className="text-sm border-2 border-[#0F2A44] text-[#0F2A44] px-3 py-1 rounded"
                      >
                        Return
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {!loading && loans.length === 0 && (
                <p className="text-[#5A4A3A]">No loans yet.</p>
              )}
            </div>
          </>
        )}

        {!isPending && active === "feedback" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">Leave Feedback</h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <form
              onSubmit={handleFeedbackSubmit}
              className="bg-white border-2 border-[#C9A227] rounded p-4 max-w-md"
            >
              {feedbackMsg && <p className="text-sm text-[#1B4F82] font-semibold mb-2">{feedbackMsg}</p>}
              <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={feedbackRating}
                onChange={(e) => setFeedbackRating(Number(e.target.value))}
                className="w-full border-2 border-[#1B4F82]/30 bg-white rounded px-3 py-2 mb-3"
              />
              <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Comment</label>
              <textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                required
                className="w-full border-2 border-[#1B4F82]/30 bg-white rounded px-3 py-2 mb-3"
              />
              <button
                type="submit"
                className="bg-[#0F2A44] text-[#F4D58D] font-serif font-semibold px-4 py-2 rounded"
              >
                Submit Feedback
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default BorrowerDashboard;
