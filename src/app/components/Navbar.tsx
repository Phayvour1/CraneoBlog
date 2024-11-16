"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  // Toggle function for the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 md:p-4 sm:p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            CraneoBlog
          </p>
        </Link>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-gray-700 dark:text-gray-300"
          onClick={toggleMenu} // Toggle menu state
        >
          <svg
            className={`w-6 h-6 transform transition duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
              className={`${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
              className={`${isMenuOpen ? "opacity-100" : "opacity-0"}`}
            />
          </svg>
        </button>

        {/* Links for larger screens */}
        <div className="hidden md:flex md:space-x-6 text-gray-700 dark:text-gray-300 text-center">
          <Link href="/writings">My Writings</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-2 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-md"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${
          isMenuOpen ? "block opacity-100 translate-y-0" : "hidden opacity-0 translate-y-4"
        } 
        md:hidden transition-all duration-500 ease-in-out absolute top-full left-0 w-full bg-white dark:bg-gray-900 p-4 flex flex-col items-center justify-center space-y-4`}
      >
        <Link
          href="/writings"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-110 hover:animate-typewriter text-center transition-all duration-300 ease-in-out transform group"
        >
          My Writings
        </Link>
        <Link
          href="/about"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-110 hover:animate-typewriter text-center transition-all duration-300 ease-in-out transform group"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-110 hover:animate-typewriter text-center transition-all duration-300 ease-in-out transform group"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
