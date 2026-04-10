import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-indigo-100 border-b border-indigo-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">PartTimePro</Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex mr-4 space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-600 hover:text-indigo-600">
            Jobs
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-indigo-600">
            Profile
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle Menu"
            onClick={toggleMenu}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-indigo-100 border-t border-indigo-200 transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
            transitionProperty: "opacity, max-height",
            transitionTimingFunction: "ease-in-out",
        }}
      >
        <nav className="flex flex-col items-center py-4 space-y-4">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 hover:text-indigo-600"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 hover:text-indigo-600"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
