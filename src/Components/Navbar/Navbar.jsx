import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

import { FaSignOutAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import useAuth from "../../Hooks/UseAuth";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
      ...(user ? [
      { name: "All Product", path: "/categories" },
      { name: "Add Product", path: "/addProduct" },
      // { name: "My Product", path: "/myProduct" },
      // { name: "Dashboard", path: "/dashboard" },
    ] : []),
    { name: "Update Product", path: "/allProduct" },
    { name: "Cart", path: "/Cart" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };

  return (
    <nav className="bg-[#8bcbd4] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img className="w-full h-8" src={logo} alt="logo" />
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={` transition hover:border-b-2 border-black
                      px-2 py-1 rounded ${
                       isActive(link.path) ? "border-b-2 border-black" : ""
                     }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons or Profile (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
             <label className="swap swap-rotate cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    document.documentElement.setAttribute("data-theme", "dark");
                    localStorage.setItem("theme", "dark");
                  } else {
                    document.documentElement.setAttribute(
                      "data-theme",
                      "light"
                    );
                    localStorage.setItem("theme", "light");
                  }
                }}
                defaultChecked={localStorage.getItem("theme") === "dark"}
              />

              {/* Sun icon (light mode) */}
              <IoMdSunny className="swap-on w-8 h-8 text-yellow-500" />

              {/* Moon icon (dark mode) */}
              <IoMoon className="swap-off w-8 h-8 text-gray-700" />
            </label>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-[#6a9c9f] px-4 py-2 rounded
                   hover:bg-[#7fc0c4]"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.photoURL}
                    alt="user"
                    title={user?.displayName || "User"}
                    className="w-9 h-9 rounded-full border border-gray-300"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border shadow-md z-10 p-4 rounded">
                    <p className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <FiUser /> {user?.displayName || "User"}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 w-full text-left hover:bg-red-50 p-2 rounded"
                    >
                      <FaSignOutAlt /> Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-gray-700 px-4 py-2 transition hover:bg-gray-200 ${
                  isActive(link.path) ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm px-4 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#6a9c9f] text-white px-4 py-2 rounded mx-4 mt-2 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="bg-gray-100 p-4 rounded text-sm">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.photoURL}
                    alt="user"
                    title={user?.displayName || "User"}
                    className="w-9 h-9 rounded-full border border-gray-300"
                  />
                </button>
                <p className="flex items-center gap-2">
                  <FiUser /> {user?.displayName || "User"}
                </p>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 text-red-600 mt-2 hover:underline"
                >
                  <FaSignOutAlt /> Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
