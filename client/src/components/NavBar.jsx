import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon, FiLogIn, FiArrowRightCircle } from "react-icons/fi";
const Navbar = () => {
  // const navigate = useNavigate();
  const { navigate, token } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-semibold text-3xl cursor-pointer"
      >
        <img
          // src={assets.blog_home_icon}
          alt="logo"
          src="https://img.icons8.com/nolan/512/google-blog-search.png"
          className="w-12"
        />
        <p className="dark:text-white">
          <span className="text-primary">AI</span> Blogger
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={toggleTheme}
          className="cursor-pointer text-lg text-primary dark:text-white"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
        <div
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 cursor-pointer text-primary hover:text-black dark:hover:text-white hover:scale-110"
        >
          <p className="text-lg font-semibold flex items-center gap-2">
            {token ? (
              <>
                {"Dashboard"}
                <FiArrowRightCircle size={20} />
              </>
            ) : (
              <>
                {"Login"}
                <FiLogIn size={20} />
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
