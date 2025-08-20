import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="space-y-3">
        <Link to="/" className="block hover:bg-blue-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/orders" className="block hover:bg-blue-700 p-2 rounded">
          Orders
        </Link>
        <Link to="/users" className="block hover:bg-blue-700 p-2 rounded">
          Users
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
