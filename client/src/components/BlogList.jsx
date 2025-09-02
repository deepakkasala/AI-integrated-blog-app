import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();
  const filteredBlogs = () => {
    if (input == "") {
      return blogs;
    }
    return blogs.filter((blog) =>
      blog.title
        .toLowerCase()
        .includes(
          input.toLowerCase() ||
            blog.category.toLowerCase().includes(input.toLowerCase())
        )
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      {/* Blog Categories */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer relative px-4 py-2 rounded-lg font-medium transition-colors duration-300
            ${
              menu === item
                ? "text-white dark:text-gray-900 bg-primary shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:text-primary"
            }`}
            >
              {item}
              {item === menu && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="bg-primary rounded-full absolute left-0 right-0 top-0 h-7 -z-10"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {!filteredBlogs().filter((elem) =>
          menu === "All" ? true : elem.category === menu
        ).length ? (
          <div className="flex items-center justify-center w-full h-64 col-span-full text-2xl font-semibold text-gray-500 dark:text-gray-400">
            <p>
              No Blogs on <span className="text-primary ml-2">{`${menu}`}</span>
            </p>
          </div>
        ) : (
          filteredBlogs()
            .filter((blog) => (menu === "All" ? true : blog.category === menu))
            .map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </div>
  );
};
export default BlogList;
