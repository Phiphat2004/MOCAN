const express = require("express");
const ProductController = require("../controllers/ProductControllers");
const authMiddleware = require("../Loaders/Auth");
const router = express.Router();

router.post("/", authMiddleware, ProductController.createProduct); // Tạo sản phẩm mới
router.get("/", ProductController.getProducts); // Lấy tất cả sản phẩm
router.get("/:id", ProductController.getProductById); // Lấy sản phẩm theo ID
router.put("/:id", authMiddleware, ProductController.updateProduct); // Cập nhật sản phẩm theo ID
router.delete("/:id", authMiddleware, ProductController.deleteProduct); // Xóa sản phẩm theo ID
module.exports = router;
