const express = require("express");
const { addComment, getBlogComments } = require("../controllers/blog");
const router = express.Router();

router.post("/addComment", addComment);
router.get("/allComments/:id", getBlogComments);

module.exports = router;
