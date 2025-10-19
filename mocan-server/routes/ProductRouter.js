const express = require("express");
const multer = require('multer');
const ProductController = require("../controllers/ProductControllers");
const authMiddleware = require("../Loaders/Auth");
const router = express.Router();

// use memory storage so we can upload buffers to Cloudinary directly
const upload = multer({ storage: multer.memoryStorage() });

// accept up to 8 images in the `images` field
router.post("/", authMiddleware, upload.array('images', 8), ProductController.createProduct); // Tạo sản phẩm mới
router.get("/", ProductController.getProducts); // Lấy tất cả sản phẩm
router.get("/top-selling", ProductController.getTopSelling); // Lấy top 4 sản phẩm bán chạy
router.get("/:id", ProductController.getProductById); // Lấy sản phẩm theo ID
router.put("/:id", authMiddleware, upload.array('images', 8), ProductController.updateProduct); // Cập nhật sản phẩm theo ID
router.delete("/:id", authMiddleware, ProductController.deleteProduct); // Xóa sản phẩm theo ID
module.exports = router;
