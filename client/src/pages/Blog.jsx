import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Moment from "moment";
import Loader from "../components/Loader";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const getBlogData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/blogs/${id}`);
      data.success ? setData(data.blog[0]) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3020/comments/allComments/${id}`
      );

      data.success ? setComments(data.blogComments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:3020/comments/addComment`,
        { blog: id, name, content }
      );
      if (data.success) {
        toast.success(data.message);
        getBlogData();
        getComments();
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getBlogData();
    getComments();
  }, []);
  return data ? (
    <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300">
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600 dark:text-gray-400">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 dark:text-gray-100">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto text-gray-600 dark:text-gray-400">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Deepak
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} className="rounded-3xl mb-5 shadow-lg" />
        <div
          className="rich-text max-w-3xl mx-auto prose prose-gray dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comment Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Comments ({comments && comments.length})
          </p>
          <div className="flex flex-col gap-4">
            {comments &&
              comments.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-primary/2 dark:bg-gray-800 border border-primary/5 dark:border-gray-700 max-w-xl p-4 rounded text-gray-600 dark:text-gray-300 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} className="w-6" />
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Add Comment
          </p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded outline-none"
            />
            <textarea
              placeholder="Comment"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded outline-none h-48"
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Social Media Icons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4 text-gray-800 dark:text-gray-100">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <img
              src={assets.facebook_icon}
              width={50}
              className="cursor-pointer hover:scale-105 transition"
            />
            <img
              src={assets.twitter_icon}
              width={50}
              className="cursor-pointer hover:scale-105 transition"
            />
            <img
              src={assets.googleplus_icon}
              width={50}
              className="cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};
export default Blog;
