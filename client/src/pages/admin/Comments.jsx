import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import toast from "react-hot-toast";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { BASE_URL } from "../../utils/constants";
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filters, setFilters] = useState("Not Approved");
  const { theme } = useTheme();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/comments`);

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-gray-900">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-gray-900 dark:text-gray-100">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setFilters("Approved");
              fetchComments();
            }}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filters === "Approved"
                ? "text-primary"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => {
              setFilters("Not Approved");
              fetchComments();
            }}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filters === "Not Approved"
                ? "text-primary"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white dark:bg-gray-800 shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 dark:text-gray-200 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filters === "Approved") {
                  return comment.isApproved === true;
                }
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  fetchComments={fetchComments}
                  index={index + 1}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Comments;
