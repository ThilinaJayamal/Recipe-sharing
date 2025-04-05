import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/" className="text-xl font-bold">Recipe Sharing</Link>

        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/add" className="text-black px-4 py-2 bg-white rounded-md hover:bg-gray-100">Add recipes</Link></li>
        </ul>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-blue-800 p-8 mt-5 space-y-4 rounded-lg">
          <li><Link to="/" className="block hover:text-gray-300">Home</Link></li>
          <li><Link to="/add" className="block text-black px-4 py-2 bg-white rounded-md hover:bg-gray-100">Add Recipes</Link></li>
        </ul>
      )}
    </nav>
  );
}
