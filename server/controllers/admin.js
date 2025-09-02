const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Login successful", token, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching all blogs by admin.",
      success: false,
      error: error.message,
    });
  }
};

const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Fetched all blogs by admin successfully!!",
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching all blogs by admin.",
      success: false,
      error,
    });
  }
};

const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully by admin",
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching blog comments by admin.",
      success: false,
      error,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };
    res.status(200).json({
      message: "Dashboard data fetched successfully!",
      success: true,
      dashboardData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching dashboard data.",
      success: false,
      error,
    });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Comment deleted!", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting comment by admin!",
      success: false,
      error,
    });
  }
};

const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res
      .status(200)
      .json({ message: "Comment approved!", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error in approving comment by admin.",
      success: false,
      error,
    });
  }
};
module.exports = {
  adminLogin,
  getAllBlogsAdmin,
  getDashboard,
  deleteCommentById,
  getAllCommentsAdmin,
  approveCommentById,
};
