const express = require("express");
// const upload = require("../middlewares/multer");
const upload = require("../configs/multerConfig");
const auth = require("../middlewares/auth");
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  generateContent,
} = require("../controllers/blog");
const router = express.Router();
router.post("/addBlog", upload.single("image"), auth, addBlog);
router.get("/all", getAllBlogs);
router.get("/:blogId", getBlogById);
router.delete("/delete/:id", auth, deleteBlogById);
router.put("/update", auth, togglePublish);
router.post("/generate", auth, generateContent);
module.exports = router;
