const express = require("express");
const {
  adminLogin,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  approveCommentById,
  deleteCommentById,
  getDashboard,
} = require("../controllers/admin");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/login", adminLogin);

router.get("/blogs", auth, getAllBlogsAdmin);
router.get("/comments", auth, getAllCommentsAdmin);
router.get("/dashboard", auth, getDashboard);

router.put("/approveComment", auth, approveCommentById);
router.delete("/deleteComment/:id", auth, deleteCommentById);

module.exports = router;
