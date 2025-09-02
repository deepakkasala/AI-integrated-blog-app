import React from "react";
import { assets, footer_data } from "../assets/assets";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    // <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
    //   <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
    //     <div>
    //       <img alt="logo" className="w-32 sm:w-44" />
    //       <p className="max-w-[410px] mt-6">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    //         ad minim veniam.
    //       </p>
    //     </div>
    //     <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
    //       {footer_data.map((section, index) => (
    //         <div key={index}>
    //           <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
    //             {section.title}
    //           </h3>
    //           <ul className="text-sm space-y-1">
    //             {section.links.map((link, i) => (
    //               <li key={i} className="hover:underline transition">
    //                 <a href="#">{link}</a>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
    //     Copyright 2025 &copy; Blog app - All rights reserved.
    //   </p>
    // </div>
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 dark:bg-gray-800 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300/30 dark:border-gray-700/30 text-gray-600 dark:text-gray-400">
        <div>
          {/* <img alt="logo" className="w-32 sm:w-44" /> */}
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
            <p>
              <span className="text-primary">AI</span> Blogger
            </p>
          </div>
          <p className="max-w-[410px] mt-6 text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:underline transition text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/80"
                  >
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-600/80 dark:text-gray-400/80">
        Copyright 2025 &copy; Blog app - All rights reserved.
      </p>
    </div>
  );
};
export default Footer;
