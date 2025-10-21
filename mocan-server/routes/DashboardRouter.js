const DashboardController = require('../controllers/DashboardController');
const express = require("express");
const router = express.Router();
const authMiddleware = require("../Loaders/Auth");

router.get('/stats', authMiddleware, DashboardController.getRevenueReport);
router.get('/monthly/:year', authMiddleware, DashboardController.getMonthlyRevenue);

module.exports = router;