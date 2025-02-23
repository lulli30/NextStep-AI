"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Sun,
  Moon,
  PanelLeftClose,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import Image from "next/image";

interface SidebarProps {
  userProfile: { username: string; email: string } | null;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({
  userProfile,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isSidebarOpen");
      if (savedState !== null) {
        setIsSidebarOpen(savedState === "true");
      }
    }
  }, [setIsSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", String(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/");
  };

  return (
    <div className="relative flex">
      <motion.div
        initial={{ width: isSidebarOpen ? 345 : 115 }}
        animate={{ width: isSidebarOpen ? 345 : 115 }}
        transition={{ duration: 0.1 }}
        className={`fixed left-0 top-0 min-h-screen overflow-hidden bg-white shadow-lg transition-all duration-200 dark:bg-gray-800
        ${isSidebarOpen ? "w-[345px]" : "w-[115px]"}`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute ${isSidebarOpen ? "right-4" : "right-[35px]"} top-4 rounded-full`}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-8 w-8 text-gray-900 dark:text-gray-300" />
          ) : (
            <Image
              src="/images/logo/NextStep AI Logo.png"
              alt="Logo"
              width={50} // specify the width of the image
              height={20} // specify the height of the image
            />
          )}
        </button>

        <div className="flex flex-grow flex-col p-6">
          {isSidebarOpen && (
            <h2 className="ml-[-10px] text-2xl font-bold text-gray-800 dark:text-white">
              <Image
                src="/images/logo/NextStep AI Logo1.png"
                alt="Logo"
                width={200} // specify the width of the image
                height={30} // specify the height of the image
              />
            </h2>
          )}

          {userProfile && isSidebarOpen && (
            <div className="mb-4 mt-10">
              <h3 className="text-xl text-black dark:text-gray-200">
                Welcome, {userProfile.username}!
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Email: {userProfile.email}
              </p>
            </div>
          )}

          <nav className={`space-y-6 ${isSidebarOpen ? "mt-6" : "mt-20"}`}>
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <LayoutDashboard className="h-8 w-8 text-gray-900 dark:text-gray-300" />
              {isSidebarOpen && (
                <span className="text-gray-900 dark:text-white">Dashboard</span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-900 hover:bg-red-500 dark:text-white"
            >
              <LogOut className="h-7 w-7 text-gray-900 dark:text-gray-300" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </nav>
        </div>

        {/* Theme Toggle */}
        <div className="mt-4 flex justify-center p-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full bg-gray-200 p-3 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
