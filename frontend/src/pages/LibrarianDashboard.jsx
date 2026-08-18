import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "../components/DashboardSidebar";

const LibrarianDashboard = () => {
  const [pending, setPending] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("pending");

  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const fetchData = async () => {
    try {
      const [pendingRes, feedbackRes] = await Promise.all([
        api.get("/auth/pending"),
        api.get("/feedback"),
      ]);
      setPending(pendingRes.data);
      setFeedback(feedbackRes.data);
    } catch (err) {
      setError("Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDecision = async (id, status) => {
    try {
      await api.put(`/auth/pending/${id}`, { status });
      setPending((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMsg("");
    try {
      await api.post("/feedback", { rating: feedbackRating, comment: feedbackComment });
      setFeedbackMsg("Feedback submitted!");
      setFeedbackComment("");
      fetchData();
    } catch (err) {
      setFeedbackMsg(err.response?.data?.message || "Could not submit feedback");
    }
  };

  const items = [
    { key: "pending", label: "Pending Borrowers", count: pending.length },
    { key: "feedback", label: "All Feedback", count: feedback.length },
    { key: "give-feedback", label: "Give Feedback" },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#FDF8EE]">
      <DashboardSidebar
        title="Librarian"
        subtitle="Shelfmark Desk"
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
              Pending Borrower Registrations
            </h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
            <div className="space-y-3">
              {pending.map((u) => (
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
              {pending.length === 0 && (
                <p className="text-[#5A4A3A]">No pending registrations.</p>
              )}
            </div>
          </>
        )}

        {!loading && active === "feedback" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">
              All Feedback
            </h1>
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

        {!loading && active === "give-feedback" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-1">
              Give Feedback
            </h1>
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

export default LibrarianDashboard;
