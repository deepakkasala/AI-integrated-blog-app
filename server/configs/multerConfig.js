// // multerConfig.js
const multer = require("multer");

const upload = multer({ storage: multer.diskStorage({}) });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
// const path = require("path");

// // Storage config

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });
// // File filter (optional)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only jpg, jpeg, and png files are allowed."), false);
//   }
// };
// const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
