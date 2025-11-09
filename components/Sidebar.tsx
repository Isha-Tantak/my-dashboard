export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-xl p-6 hidden md:block border-r border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
         Dashboard
      </h2>

      <nav className="flex flex-col gap-4">
        <a href="/" className="text-gray-800 hover:text-blue-600 font-semibold transition">
          Home
        </a>
        <a href="/analytics" className="text-gray-800 hover:text-blue-600 font-semibold transition">
          Analytics
        </a>
        <a href="/users" className="text-gray-800 hover:text-blue-600 font-semibold transition">
          Users
        </a>
        <a href="/settings" className="text-gray-800 hover:text-blue-600 font-semibold transition">
          Settings
        </a>
        <a href="/chat" className="text-gray-800 hover:text-blue-600 font-semibold transition">
           Chat with Data
        </a>
      </nav>
    </aside>
  );
}
