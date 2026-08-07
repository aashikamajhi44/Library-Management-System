import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#0F2A44] border-b-4 border-[#C9A227] text-[#F4D58D] px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-serif font-bold text-[#F4D58D]">
        Shelfmark
      </Link>
      <div className="flex items-center gap-6 text-sm uppercase tracking-wide">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/books" className="hover:text-white">Books</Link>
        <Link to="/about" className="hover:text-white">About Us</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link
              to="/register"
              className="bg-[#F4D58D] text-[#0F2A44] px-4 py-1.5 rounded font-semibold hover:bg-[#e8c56f]"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to={user.role === "librarian" ? "/librarian-dashboard" : "/borrower-dashboard"}
              className="hover:text-white"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#F4D58D] text-[#0F2A44] px-4 py-1.5 rounded font-semibold hover:bg-[#e8c56f]"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
