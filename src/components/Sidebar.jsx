import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-900 text-white shadow-lg z-50 transform transition-transform 
        md:static md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 font-bold text-xl border-b border-blue-700">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            className="block hover:bg-blue-700 p-2 rounded"
            onClick={onClose}
          >
            Dashboard
          </Link>
          <Link
            to="/orders"
            className="block hover:bg-blue-700 p-2 rounded"
            onClick={onClose}
          >
            Orders
          </Link>
          <Link
            to="/users"
            className="block hover:bg-blue-700 p-2 rounded"
            onClick={onClose}
          >
            Users
          </Link>
          <Link
            to="/settings"
            className="block hover:bg-blue-700 p-2 rounded"
            onClick={onClose}
          >
            Settings
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
