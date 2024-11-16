"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-4 sm:p4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            CraneoBlog
          </p>
        </Link>

        {/* Links */}
        <div className="flex space-x-6 text-gray-700 dark:text-gray-300">
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
    </nav>
  );
}
