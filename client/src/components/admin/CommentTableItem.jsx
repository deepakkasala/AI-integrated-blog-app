import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { FiTrash, FiTrash2 } from "react-icons/fi";
const CommentTableItem = ({ comment, fetchComments }) => {
  const deleteComment = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/admin/deleteComment/${_id}`
      );

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const approveComment = async () => {
    try {
      const { data } = await axios.put(`${BASE_URL}/admin/approveComment`, {
        id: _id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  return (
    <tr className="order-y border-gray-300 dark:border-gray-600">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600 dark:text-gray-400">Blog</b>:
        <span className="font-medium text-md capitalize text-gray-700 dark:text-gray-200">
          {blog.title}
        </span>
        <br />
        <br />
        <b className="font-medium text-gray-600 dark:text-gray-400">Name</b>:
        <span className="dark:text-gray-200">{comment.name}</span>
        <br />
        <b className="font-medium text-gray-600 dark:text-gray-400">Comment</b>:
        <span className="dark:text-gray-200">{comment.content}</span>
      </td>
      <td className="px-6 py-4 max-sm:hidden dark:text-gray-300">
        {BlogDate.toDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={"https://img.icons8.com/nolan/512/checkmark.png"}
              className="w-8 hover:scale-110 transition-all cursor-pointer"
              onClick={approveComment}
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 dark:bg-green-900 dark:border-green-500 dark:text-green-300 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          {/* <img
            src={"https://img.icons8.com/pulsar-gradient/500/trash.png"}
            onClick={deleteComment}
            className="w-7 hover:scale-110 transition-all cursor-pointer"
          /> */}
          <FiTrash2
            size={22}
            className="text-primary hover:scale-110 transition-all cursor-pointer"
            onClick={deleteComment}
          />
        </div>
      </td>
    </tr>
  );
};
export default CommentTableItem;
