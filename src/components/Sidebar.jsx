import { NavLink, Link } from "react-router-dom";
import { FaHome, FaUsers, FaBox, FaCog, FaTimes } from "react-icons/fa";

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
        <div className="p-4 font-bold text-xl border-b border-blue-700 flex items-center justify-between">
          Admin Panel{" "}
          <button className="md:hidden" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
              }`
            }
            // "flex items-center hover:bg-blue-700 p-2 rounded"
            onClick={onClose}
          >
            <FaHome /> <span className="ml-2">Dashboard</span>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
              }`
            }
            onClick={onClose}
          >
            <FaBox /> <span className="ml-2">Orders</span>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
              }`
            }
            onClick={onClose}
          >
            <FaUsers /> <span className="ml-2">Users</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
              }`
            }
            onClick={onClose}
          >
            <FaCog /> <span className="ml-2">Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
