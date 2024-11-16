import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto p-4  md:p-4 sm:p4 flex justify-between">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl font-bold">CraneoBlog</p>
        </Link>

        {/* Links */}
        <div className="flex space-x-6 text-gray-700">
          <Link href="/writings">My Writings</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
