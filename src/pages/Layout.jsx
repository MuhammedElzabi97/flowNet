import { Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import { useState } from "react";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const user = dummyUserData;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // المسارات اللي ما بدنا نعرض فيها السايد بار
  const hideSidebar = location.pathname === "/login"; // أو "/sign-in" حسب مسارك

  if (!user) return <Loading />;

  return (
    <div className="w-full flex h-screen">
      {/* السايد بار يظهر فقط إذا ما كنا بصفحة اللوج إن */}
      {!hideSidebar && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div className="flex-1 relative">
        {/* زرار الـ Menu / X للموبايل - برضه بس لما السايد بار مفعل */}
        {!hideSidebar && (
          <>
            {sidebarOpen ? (
              <X
                className="absolute top-2 right-8 p-2 z-100 bg-blue-600 rounded-md shadow w-10 h-10 text-gray-50 sm:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            ) : (
              <Menu
                className=" absolute top-2 right-8 p-2 z-100 bg-blue-600 rounded-md shadow-2xl w-10 h-10 text-gray-50 sm:hidden"
                onClick={() => setSidebarOpen(true)}
              />
            )}
          </>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
