import React from 'react';

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <ul className="space-y-2">
              <li><a href="#">Notes</a></li>
              <li><a href="#">Reminders</a></li>
              <li><a href="#">Archive</a></li>
              <li><a href="#">Trash</a></li>
            </ul>
          </aside>

          {/* Main content */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}