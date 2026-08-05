import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(name, email, password, phone);
      setSuccess("Registered successfully! Waiting for librarian approval.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex-1 bg-slate-100 flex items-center justify-center py-16 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-amber-400 rounded-lg shadow-md p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Get Your Library Card
        </h1>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}

        <label className="block text-sm text-slate-700 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-slate-300 rounded px-3 py-2 mb-4"
        />

        <label className="block text-sm text-slate-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-slate-300 rounded px-3 py-2 mb-4"
        />

        <label className="block text-sm text-slate-700 mb-1">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-slate-300 rounded px-3 py-2 mb-4"
        />

        <label className="block text-sm text-slate-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-slate-300 rounded px-3 py-2 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-amber-400 font-semibold py-2 rounded hover:bg-slate-800"
        >
          Register
        </button>

        <p className="text-sm text-slate-600 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-amber-600 font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
