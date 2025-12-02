import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "./Toast";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!fullName) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({ fullName }));
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setFullName("");
    setToast(true);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-5xl font-extrabold text-blue-600 tracking-wide w-10"
          >
            <img
              src="https://d1vwxdpzbgdqj.cloudfront.net/images/data-science/scikit_learn.png"
              alt=""
            />
          </Link>

          {/* Mobile Search Input */}
          <div className="flex-1 mx-4 sm:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchIcon className="absolute top-2.5 left-2.5 text-gray-500" />
            </div>
          </div>

          {/* Hamburger Icon */}
          <button
            className="sm:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon fontSize="medium" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            {[
              { path: "/", label: "Home" },
              { path: "/courses", label: "Courses" },
              { path: "/books", label: "Books" },
              ...(isLoggedIn
                ? [{ path: "/dashboard", label: "Dashboard" }]
                : []),
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Desktop Search Input */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchIcon className="absolute top-2.5 left-2.5 text-gray-500" />
            </div>

            {/* Desktop Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Slide-In Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="text-lg font-bold text-blue-600">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-700"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-4 py-6 space-y-4">
              {[
                { path: "/", label: "Home" },
                { path: "/courses", label: "Courses" },
                { path: "/books", label: "Books" },
                ...(isLoggedIn
                  ? [{ path: "/dashboard", label: "Dashboard" }]
                  : []),
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 text-base font-medium hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              ))}

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm space-y-4">
            <h2 className="text-xl font-semibold text-center text-blue-600">
              Login
            </h2>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast message={"Login Successful"} onClose={() => setToast(false)} />
      )}
    </>
  );
}
