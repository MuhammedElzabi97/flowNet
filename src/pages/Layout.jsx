import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  // حالة فتح/إغلاق السايدبار
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#222222] text-white relative">
      {/* زر فتح/إغلاق السايدبار (يظهر فقط على الموبايل) */}
      {sidebarOpen ? (
        <X
          className="absolute top-3 left-3 z-50 bg-amber-400 rounded-md shadow
                     w-10 h-10 text-gray-100 sm:hidden cursor-pointer p-2"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 left-3 z-50 bg-[#FFD700] rounded-md shadow
                     w-10 h-10 text-gray-100 sm:hidden cursor-pointer p-2"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* السايدبار */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* مكان عرض الصفحات (Feed, Profile, Messages, ... إلخ) */}
      <main className="ml-20 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
