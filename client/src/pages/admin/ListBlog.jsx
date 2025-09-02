import React, { useEffect, useState } from "react";

import BlogTableItem from "../../components/admin/BlogTableItem";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/blogs`);

      if (data.success) {
        setBlogs(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-gray-900 relative">
      <h1 className="text-gray-900 dark:text-gray-100">All Blogs</h1>
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-600 dark:text-gray-300 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem
                index={index + 1}
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListBlog;
