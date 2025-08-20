const Header = () => {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
