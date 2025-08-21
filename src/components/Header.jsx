import { Menu } from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-2">
      {/* Hamburger (only on mobile) */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Hello, Admin 👋</span>
      </div>
    </header>
  );
};

export default Header;
