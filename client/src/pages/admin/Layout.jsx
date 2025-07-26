import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
const Layout = () => {
  const { fetchBlogs } = useAppContext();
  const navigate = useNavigate();
  const { setToken } = useAppContext();
  const logout = () => {
    localStorage.setItem("token", null);
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
        className="flex justify-between items-center px-4 sm:px-12 py-2 h-[70px] border-b border-gray-200"
      >
        <img src={assets.logo} className="w-32 sm:w-40 cursor-pointer" />
        <button
          className="text-sm bg-primary text-white px-8 py-2 rounded-full cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
