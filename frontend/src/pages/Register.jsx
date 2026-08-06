import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("borrower");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(name, email, password, phone, role);
      setSuccess(
        role === "librarian"
          ? "Registered successfully! Waiting for admin approval."
          : "Registered successfully! Waiting for librarian approval."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex-1 bg-[#0F2A44] flex items-center justify-center py-16 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FDF8EE] border-4 border-[#C9A227] rounded-md shadow-xl p-8 w-full max-w-md relative"
      >
        <div className="absolute -top-3 left-8 bg-[#C9A227] text-[#0F2A44] text-xs font-bold uppercase tracking-wide px-3 py-1 rounded">
          New Member
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-6 text-center mt-2">
          Get Your Library Card
        </h1>

        {error && <p className="text-red-700 mb-4 text-sm">{error}</p>}
        {success && <p className="text-[#2F6B4F] mb-4 text-sm font-semibold">{success}</p>}

        <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Register As</label>
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => setRole("borrower")}
            className={`flex-1 py-2 rounded border-2 font-semibold text-sm ${
              role === "borrower"
                ? "bg-[#0F2A44] text-[#F4D58D] border-[#0F2A44]"
                : "bg-white text-[#5A4A3A] border-[#1B4F82]/30"
            }`}
          >
            Borrower
          </button>
          <button
            type="button"
            onClick={() => setRole("librarian")}
            className={`flex-1 py-2 rounded border-2 font-semibold text-sm ${
              role === "librarian"
                ? "bg-[#0F2A44] text-[#F4D58D] border-[#0F2A44]"
                : "bg-white text-[#5A4A3A] border-[#1B4F82]/30"
            }`}
          >
            Librarian
          </button>
        </div>

        <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-2 border-[#1B4F82]/30 bg-white rounded px-3 py-2 mb-4 focus:border-[#C9A227] outline-none"
        />

        <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-[#1B4F82]/30 bg-white rounded px-3 py-2 mb-4 focus:border-[#C9A227] outline-none"
        />

        <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-2 border-[#1B4F82]/30 bg-white rounded px-3 py-2 mb-4 focus:border-[#C9A227] outline-none"
        />

        <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border-2 border-[#1B4F82]/30 bg-white rounded px-3 py-2 mb-6 focus:border-[#C9A227] outline-none"
        />

        <button
          type="submit"
          className="w-full bg-[#0F2A44] text-[#F4D58D] font-serif font-semibold py-2 rounded hover:bg-[#16385a]"
        >
          Register
        </button>

        <p className="text-sm text-[#5A4A3A] mt-4 text-center">
          Already have a card? <Link to="/login" className="text-[#1B4F82] font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
