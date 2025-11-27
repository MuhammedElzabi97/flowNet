import React from "react";
import {
  Home,
  Search,
  MessageCircle,
  User,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div
      className={`
        fixed left-3 top-1/2 -translate-y-1/2 z-40
        bg-gradient-to-br from-[#6e6363] via-[#444444] to-[#6e6363]
        backdrop-blur-xl shadow-[0_0_30px_rgba(255,215,0,0.6)]
        border border-yellow-500
        flex flex-col items-center justify-start
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-56 h-[80vh] rounded-3xl" : "w-14 h-14 rounded-full"}
      `}
    >
      {/* المحتوى يظهر فقط عندما يكون السايدبار مفتوح */}
      {sidebarOpen && (
        <div className="mt-6 flex flex-col items-center space-y-10">
          <Link
            to="/"
            className="p-1 rounded-full transition-all hover:scale-110"
          >
            <Home size={26} className="text-indigo-50 hover:text-yellow-400" />
          </Link>

          <Link
            to="/search"
            className="p-1 rounded-full transition-all hover:scale-110"
          >
            <Search size={26} className="text-indigo-50 hover:text-yellow-400" />
          </Link>

          <Link
            to="/messages"
            className="p-1 rounded-full transition-all hover:scale-110"
          >
            <MessageCircle
              size={26}
              className="text-indigo-50 hover:text-yellow-400"
            />
          </Link>

          <Link
            to="/profile"
            className="p-1 rounded-full transition-all hover:scale-110"
          >
            <User size={26} className="text-indigo-50 hover:text-yellow-400" />
          </Link>

          <Link
            to="/settings"
            className="p-1 rounded-full transition-all hover:scale-110"
          >
            <Settings
              size={26}
              className="text-indigo-50 hover:text-yellow-400"
            />
          </Link>

          <Link
            to="/connections"
            className="p-1 rounded-full transition-all hover:scale-110"
          >
            <Users size={26} className="text-indigo-50 hover:text-yellow-400" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
