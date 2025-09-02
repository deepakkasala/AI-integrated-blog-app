import React from "react";
import { useNavigate } from "react-router-dom";
const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { title, description, category, image, _id } = blog;
  return (
    <div
      onClick={() => {
        navigate(`/blog/${_id}`);
      }}
      className="w-full rounded-lg overflow-hidden shadow-md hover:scale-[1.02] hover:shadow-primary/40 duration-300 cursor-pointer bg-white dark:bg-gray-900 dark:shadow-gray-800"
    >
      <img
        src={image}
        alt={title}
        className="aspect-video w-full object-cover"
      />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
        {category}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h5>
        <p
          className="mb-3 text-sm text-gray-600 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};
export default BlogCard;
