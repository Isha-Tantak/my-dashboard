import "./globals.css";
import Sidebar from "../components/Sidebar";


export const metadata = {
  title: "My Dashboard",
  description: "Simple Next.js Dashboard App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 text-gray-900">
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  );
}
