import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { blogCategories } from "../../assets/assets";
import Quill from "quill";
import { parse } from "marked";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const EditModal = ({ blog, Title, setEditModal }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [subTitle, setSubTitle] = useState(blog.subTitle);
  const [category, setCategory] = useState(blog.category);
  const [isPublished, setIsPublished] = useState(blog.isPublished);
  const [description, setDescription] = useState(blog.description);
  const [image, setImage] = useState(blog.image);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title for blog!");
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/blogs/generate`, {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const editedBlog = {
        id: blog._id,
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(editedBlog));
      if (image) {
        formData.append("image", image);
      } else {
      }
      const { data } = await axios.post(
        "http://localhost:3020/blogs/editBlog",
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
    quillRef.current.root.innerHTML = parse(blog.description);
  }, []);
  return (
    <form onSubmit={onSubmitHandler} className="">
      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl p-4 md:p-10 sm:m-10 rounded shadow border border-gray-500">
        <h1 className="text-2xl font-bold text-center text-primary">{Title}</h1>
        <p className="text-gray-700 dark:text-gray-200 mb-2">Edit Thumbnail</p>
        <label htmlFor="image">
          <div className=" flex flex-col items-center border border-gray-300 w-full sm:w-1/2 lg:w-1/3 overflow-hidden rounded-md cursor-pointer dark:border-gray-600">
            {image ? (
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                className={`w-full h-28 transition-all duration-300 ${
                  image ? "rounded-none" : "p-4"
                }`}
                alt="Upload preview"
              />
            ) : (
              <FiUploadCloud size={30} className="mt-4" />
            )}
            <p className="text-sm text-gray-400 text-center py-2">
              {image ? "Uploaded" : "Upload"}
            </p>
          </div>
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
              }
            }}
            type="file"
            id="image"
            hidden
          />
        </label>
        <p className="mt-4 text-gray-700 dark:text-gray-200">Edit Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="mt-4 text-gray-700 dark:text-gray-200">Edit Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />
        <p className="mt-4 text-gray-700 dark:text-gray-200">
          Edit Blog Description
        </p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div
            ref={editorRef}
            className="ql-container ql-snow dark:ql-dark"
          ></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex flex-col items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
              <div>Generating Blog...</div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="disabled absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-200">
          Edit Blog Category
        </p>
        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        >
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3 mt-4">
          <p className="text-gray-700 dark:text-gray-200">Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 w-4 h-4 text-purple-600 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <div className="flex gap-3 items-center mt-10">
          <button
            type="submit"
            disabled={isAdding}
            className="w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
          >
            {isAdding ? "Updating..." : "Update Blog"}
          </button>
          <button
            className="w-40 h-10 bg-primary text-white rounded"
            onClick={() => setEditModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditModal;
