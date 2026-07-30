import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F6F2] dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsOpen} />

        <main className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}