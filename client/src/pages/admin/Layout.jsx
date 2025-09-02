import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { fetchBlogs } = useAppContext();
  const navigate = useNavigate();
  const { setToken } = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/admin");
  };
  return (
    <>
      <div
        onClick={() => {
          navigate("/");
          fetchBlogs();
        }}
        className={`flex justify-between items-center px-4 sm:px-12 py-2 h-[70px] border-b 
      ${
        theme === "dark"
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-black"
      }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-2 font-semibold text-3xl cursor-pointer">
          <img
            src="https://img.icons8.com/nolan/512/google-blog-search.png"
            className="w-12"
          />
          <p className="hover:text-primary">
            <span className="text-primary">AI</span> Blogger
          </p>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // stop event bubbling
              toggleTheme();
            }}
            className="px-4 py-2 rounded-md cursor-pointer text-lg text-primary"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {/* Logout */}
          <div
            className="flex items-center gap-2 cursor-pointer text-primary hover:text-black dark:hover:text-white hover:scale-110"
            onClick={logout}
          >
            <p className="text-lg font-semibold">Logout</p>
            <FiLogOut size={20} />
          </div>
        </div>
      </div>

      <div
        className={`flex h-[calc(100vh-70px)] ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
