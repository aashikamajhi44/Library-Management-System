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
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-amber-400">
        Shelfmark
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <Link to="/books" className="hover:text-amber-400">Books</Link>
        <Link to="/about" className="hover:text-amber-400">About Us</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-amber-400">Login</Link>
            <Link to="/register" className="hover:text-amber-400">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link
              to={user.role === "librarian" ? "/librarian-dashboard" : "/borrower-dashboard"}
              className="hover:text-amber-400"
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className="hover:text-amber-400">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
