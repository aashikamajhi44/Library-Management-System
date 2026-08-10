import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/borrower-dashboard"
              element={
                <ProtectedRoute allowedRole="borrower">
                  <BorrowerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/librarian-dashboard"
              element={
                <ProtectedRoute allowedRole="librarian">
                  <LibrarianDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
