export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">📊 Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Analytics
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Users
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Settings
        </a>
      </nav>
    </aside>
  );
}
