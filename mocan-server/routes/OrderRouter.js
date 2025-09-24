const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const authMiddleware = require("../Loaders/Auth");

// CRUD routes cho Order
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);
router.patch("/:id/status", authMiddleware, OrderController.updateOrderStatus);

module.exports = router;
