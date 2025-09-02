const imagekit = require("../configs/imageKit");
const fs = require("fs");
const path = require("path");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const main = require("../configs/gemini");

const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res
        .status(404)
        .json({ message: "Required Fields are missing!", success: false });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    //Upload Image to Image kit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //Optimization through Image kit URL Transformation.
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //Auto Compression
        { format: "webp" }, //convert to modern format.
        { width: "1280" }, //width resizing.
      ],
    });

    const image = optimizedImageUrl;
    // const image = `/uploads/${imageFile.filename}`;
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res
      .status(201)
      .json({ message: "Blog added successfully", success: true, blog });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error." + error.message,
      error,
      success: false,
    });
  }
};

const editBlog = async (req, res) => {
  try {
    const { id, title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);

    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res
        .status(404)
        .json({ message: "Required Fields are missing!", success: false });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    //Upload Image to Image kit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //Optimization through Image kit URL Transformation.
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //Auto Compression
        { format: "webp" }, //convert to modern format.
        { width: "1280" }, //width resizing.
      ],
    });

    const image = optimizedImageUrl;
    // const image = `/uploads/${imageFile.filename}`;
    const blogData = {
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData);
    updatedBlog.save();
    res.status(201).json({
      message: "Blog updated successfully",
      success: true,
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error." + error.message,
      error,
      success: false,
    });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res
      .status(200)
      .json({ message: "Blogs fetched successfully!", success: true, blogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching all blogs!", success: false, error });
  }
};
const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.find({ _id: blogId });
    if (!blog) {
      res.status(404).json({ message: "Blog not found!", success: false });
    }
    res
      .status(200)
      .json({ message: "Blog fetched successfully!", success: true, blog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in finding blog by id.", success: false, error });
  }
};
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found", success: false });
    }
    const imagePath = path.join(__dirname, "../public", blog.image);
    await Blog.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Blog deleted successfully!", success: true });

    //Delete all the comments associated with this blog.
    await Comment.deleteMany({ blog: id });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting blog by id.",
      success: false,
      error,
    });
  }
};
const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById({ _id: id });
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({
      message: `Blog ${blog.isPublished ? "Published" : "Unpublished"}`,
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Error in toggling the published status!",
      success: false,
      error,
    });
  }
};
const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    const commentObj = await Comment.create({ blog, name, content });
    res.status(201).json({
      message: "Comment submitted sent for approval!",
      success: true,
      commentObj,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in adding comment to the blog.",
      success: false,
      error,
    });
  }
};
const getBlogComments = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found.", success: false });
    }

    const blogComments = await Comment.find({
      blog: id,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Blog comments fetched successfully",
      success: true,
      blogComments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting Blog comments.",
      success: false,
      error,
    });
  }
};
const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      "On this topic " +
        prompt +
        " Generate a blog content in simple text format.Don't ask any questions, I just need content to make blog about " +
        prompt
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
module.exports = {
  addBlog,
  editBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
  generateContent,
};
