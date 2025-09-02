import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit, FiXCircle } from "react-icons/fi";
import EditModal from "./EditModal";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const [editModal, setEditModal] = useState(false);
  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/blogs/delete/${blog._id}`
      );

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const togglePublish = async () => {
    try {
      const { data } = await axios.put(`${BASE_URL}/blogs/update`, {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <tr className="border-y border-gray-300">
        <th className="px-2 py-4 dark:text-gray-300 text-gray-700">{index}</th>
        <td className="px-2 py-4 dark:text-gray-300 text-gray-700">{title}</td>
        <td className="px-2 py-4 dark:text-gray-300 text-gray-700 max-sm:hidden">
          {BlogDate.toDateString()}
        </td>
        <td className="px-2 py-4 dark:text-gray-300 text-gray-700 max-sm:hidden">
          <p
            className={`${
              blog.isPublished
                ? "text-green-700 dark:text-green-500"
                : "text-orange-600"
            }`}
          >
            {blog.isPublished ? "Published" : "Unpublished"}
          </p>
        </td>
        <td className="px-2 py-4 flex justify-between items-center text-xs gap-3 mr-3 dark:text-gray-300 text-gray-700">
          <button
            onClick={togglePublish}
            className="border px-2 py-0.5 mt-1 h-8 w-full rounded cursor-pointer"
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>
          <FiEdit
            size={30}
            className="hover:cursor-pointer"
            onClick={() => setEditModal(true)}
          />
          <FiXCircle
            size={40}
            onClick={deleteBlog}
            className="text-primary w-8 hover:scale-110 transition-all cursor-pointer"
          />
        </td>
      </tr>

      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <EditModal
            blog={blog}
            Title={"Edit Blog"}
            setEditModal={setEditModal}
          />
        </div>
      )}
    </>
  );
};
export default BlogTableItem;
