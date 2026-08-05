import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const BorrowerDashboard = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  return (
    <div className="flex-1 bg-slate-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome, {user?.name}
        </h1>

        {isPending && (
          <div className="bg-amber-100 border border-amber-400 text-amber-800 rounded p-4 mb-8">
            Your account is pending librarian approval. You'll be able to borrow
            books once approved.
          </div>
        )}

        {!isPending && (
          <>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">My Loans</h2>
            {loading && <p className="text-slate-600">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div className="space-y-3 mb-10">
              {loans.map((loan) => (
                <div
                  key={loan._id}
                  className="bg-white border border-slate-200 rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{loan.book?.title}</p>
                    <p className="text-sm text-slate-500">
                      Due: {new Date(loan.dueDate).toLocaleDateString()} — Status: {loan.status}
                      {loan.fine > 0 && ` — Fine: Rs. ${loan.fine}`}
                    </p>
                  </div>
                  {loan.status === "borrowed" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRenew(loan._id)}
                        className="text-sm bg-slate-900 text-amber-400 px-3 py-1 rounded"
                      >
                        Renew
                      </button>
                      <button
                        onClick={() => handleReturn(loan._id)}
                        className="text-sm border border-slate-900 text-slate-900 px-3 py-1 rounded"
                      >
                        Return
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {!loading && loans.length === 0 && (
                <p className="text-slate-600">No loans yet.</p>
              )}
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Leave Feedback</h2>
            <form
              onSubmit={handleFeedbackSubmit}
              className="bg-white border border-slate-200 rounded p-4 max-w-md"
            >
              {feedbackMsg && <p className="text-sm text-amber-700 mb-2">{feedbackMsg}</p>}
              <label className="block text-sm text-slate-700 mb-1">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={feedbackRating}
                onChange={(e) => setFeedbackRating(Number(e.target.value))}
                className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
              />
              <label className="block text-sm text-slate-700 mb-1">Comment</label>
              <textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                required
                className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
              />
              <button
                type="submit"
                className="bg-slate-900 text-amber-400 font-semibold px-4 py-2 rounded"
              >
                Submit Feedback
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BorrowerDashboard;
