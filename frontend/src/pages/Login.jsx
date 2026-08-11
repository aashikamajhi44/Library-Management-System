import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const dashboardPath = (role) => {
  if (role === "admin") return "/admin-dashboard";
  if (role === "librarian") return "/librarian-dashboard";
  return "/borrower-dashboard";
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      navigate(dashboardPath(data.role));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex-1 bg-[#0F2A44] flex items-center justify-center py-16 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FDF8EE] border-4 border-[#C9A227] rounded-md shadow-xl p-8 w-full max-w-md relative"
      >
        <div className="absolute -top-3 left-8 bg-[#C9A227] text-[#0F2A44] text-xs font-bold uppercase tracking-wide px-3 py-1 rounded">
          Library Card
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#1B2A3A] mb-6 text-center mt-2">
          Member Login
        </h1>

        {error && <p className="text-red-700 mb-4 text-sm">{error}</p>}

        <label className="block text-sm text-[#5A4A3A] mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          Login
        </button>

        <p className="text-sm text-[#5A4A3A] mt-4 text-center">
          Don't have a card? <Link to="/register" className="text-[#1B4F82] font-semibold">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
