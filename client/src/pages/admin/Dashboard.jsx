import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  const { theme } = useTheme();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const fetchDashboardData = async () => {
    // setDashboardData(dashboard_data);
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/dashboard`);

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    // <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
    //   <div className="flex flex-wrap gap-4">
    //     <div className="flex items-center gap-6 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
    //       <img
    //         src={"https://img.icons8.com/nolan/512/blogger.png"}
    //         className="w-12"
    //       />
    //       <div>
    //         <p className="text-xl font-semibold text-gray-600">
    //           {dashboardData.blogs}
    //         </p>
    //         <p className="text-gray-400 font-light">Blogs</p>
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
    //       <img
    //         src={"https://img.icons8.com/nolan/512/messaging-.png"}
    //         className="w-12"
    //       />
    //       <div>
    //         <p className="text-xl font-semibold text-gray-600">
    //           {dashboardData.comments}
    //         </p>
    //         <p className="text-gray-400 font-light">Comments</p>
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
    //       <img
    //         src={"https://img.icons8.com/nolan/512/edit-file.png"}
    //         className="w-12"
    //       />
    //       <div>
    //         <p className="text-xl font-semibold text-gray-600">
    //           {dashboardData.drafts}
    //         </p>
    //         <p className="text-gray-400 font-light">Drafts</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
    //       <img src={assets.dashboard_icon_4} />
    //       <p>Latest Blogs</p>
    //     </div>
    //     <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
    //       <table className="w-full text-sm text-gray-500">
    //         <thead className="text-xs text-gray-600 text-left uppercase">
    //           <tr>
    //             <th scope="col" className="px-2 py-4 xl:px-6">
    //               #
    //             </th>
    //             <th scope="col" className="px-2 py-4">
    //               Blog Title
    //             </th>
    //             <th scope="col" className="px-2 py-4 max-sm:hidden">
    //               Date
    //             </th>
    //             <th scope="col" className="px-2 py-4 max-sm:hidden">
    //               Status
    //             </th>
    //             <th scope="col" className="px-2 py-4">
    //               Actions
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {dashboardData.recentBlogs.map((blog, index) => (
    //             <BlogTableItem
    //               index={index + 1}
    //               key={blog._id}
    //               blog={blog}
    //               fetchBlogs={fetchDashboardData}
    //             />
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
    <div
      className={`flex-1 p-4 md:p-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-50/50 text-black"
      }`}
    >
      <div className="flex flex-wrap gap-4">
        <div
          className={`flex items-center gap-6 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all 
        ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"}`}
        >
          <img
            src={"https://img.icons8.com/nolan/512/blogger.png"}
            className="w-12"
          />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {dashboardData.blogs}
            </p>
            <p
              className={`font-light ${
                theme === "dark" ? "text-gray-400" : "text-gray-400"
              }`}
            >
              Blogs
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-4 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all 
        ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"}`}
        >
          <img
            src={"https://img.icons8.com/nolan/512/messaging-.png"}
            className="w-12"
          />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {dashboardData.comments}
            </p>
            <p
              className={`font-light ${
                theme === "dark" ? "text-gray-400" : "text-gray-400"
              }`}
            >
              Comments
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-4 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all 
        ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"}`}
        >
          <img
            src={"https://img.icons8.com/nolan/512/edit-file.png"}
            className="w-12"
          />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {dashboardData.drafts}
            </p>
            <p
              className={`font-light ${
                theme === "dark" ? "text-gray-400" : "text-gray-400"
              }`}
            >
              Drafts
            </p>
          </div>
        </div>
      </div>

      <div>
        <div
          className={`flex items-center gap-3 m-4 mt-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <img src={assets.dashboard_icon_4} />
          <p>Latest Blogs</p>
        </div>

        <div
          className={`relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide 
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
        >
          <table
            className={`w-full text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            <thead
              className={`text-xs uppercase ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4 text-left">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  index={index + 1}
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
