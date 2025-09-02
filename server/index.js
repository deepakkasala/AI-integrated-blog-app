const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

//Routes
app.use("/admin", adminRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

PORT = process.env.PORT || 3020;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, (req, res) => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
