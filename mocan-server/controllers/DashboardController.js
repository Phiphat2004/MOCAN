const Product = require('../models/Product');
const Order = require('../models/Order');

//Tổng tiền bán đc trong tháng, hôm nay, tổng số đơn trong tháng, hôm nay, sản phẩm bán chạy nhất
exports.getRevenueReport = async (req, res) => {
    let todayRevenue = 0;
    let monthRevenue = 0;
    let todayOrders = 0;
    let monthOrders = 0;
    let top5Product = [
        {
            _id: null,
            productName: '',
            productImage: '',
            productPrice: 0,
            totalSold: 0,
            totalAmount: 0,
        }
    ];

    try {
        // Tổng doanh thu hôm nay
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Orders count (all statuses) for today
        const todayCountData = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfToday, $lte: endOfToday } } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);
        if (todayCountData.length > 0) {
            todayOrders = todayCountData[0].count;
        }

        // Revenue only from delivered orders (status === 'đã giao') for today
        const todayRevenueData = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfToday, $lte: endOfToday }, status: 'đã giao' } },
            { $group: { _id: null, totalAmount: { $sum: "$total_amount" } } }
        ]);
        if (todayRevenueData.length > 0) {
            todayRevenue = todayRevenueData[0].totalAmount;
        }

        // Tổng doanh thu tháng này
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Orders count (all statuses) for this month
        const monthCountData = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);
        if (monthCountData.length > 0) {
            monthOrders = monthCountData[0].count;
        }

        // Revenue only from delivered orders (status === 'đã giao') for this month
        const monthRevenueData = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth }, status: 'đã giao' } },
            { $group: { _id: null, totalAmount: { $sum: "$total_amount" } } }
        ]);
        if (monthRevenueData.length > 0) {
            monthRevenue = monthRevenueData[0].totalAmount;
        }

        // Top 5 sản phẩm bán chạy nhất trong tháng (theo số lượng đã bán) - chỉ tính đơn đã giao
        const topProductsAgg = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth }, status: 'đã giao' } },
            { $unwind: '$order_detail' },
            {
                $group: {
                    _id: '$order_detail.product_id',
                    totalSold: { $sum: '$order_detail.quantity' },
                    totalAmount: { $sum: { $multiply: ['$order_detail.quantity', '$order_detail.unit_price'] } }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'products',
                    let: { prodId: '$_id' },
                    pipeline: [
                        { $addFields: { idStr: { $toString: '$_id' } } },
                        { $match: { $expr: { $eq: ['$idStr', '$$prodId'] } } },
                        { $project: { idStr: 0 } }
                    ],
                    as: 'product'
                }
            },
            { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    product: '$product',
                    productId: '$_id',
                    productName: '$product.name',
                    productImage: { $arrayElemAt: ['$product.images', 0] },
                    productPrice: '$product.price',
                    totalSold: 1, totalAmount: 1
                }
            }
        ]);

        // Map to required shape and filter out missing products
        const topProducts = topProductsAgg.map(tp => ({ product: tp.product || null, totalSold: tp.totalSold, totalAmount: tp.totalAmount })).filter(p => p.product !== null);
        if (topProducts.length > 0) {
            top5Product = topProducts.map(tp => ({
                _id: tp.product._id,
                productName: tp.product.name,
                productImage: tp.product.images && tp.product.images.length > 0 ? tp.product.images[0] : '',
                productPrice: tp.product.price,
                totalSold: tp.totalSold,
                totalAmount: tp.totalAmount,
            }));
        } else {
            top5Product = [];
        }

        res.status(200).json({
            todayRevenue,
            monthRevenue,
            todayOrders,
            monthOrders,
            top5Product
        });

    } catch (err) {
        console.error('getRevenueReport error', err);
        res.status(500).json({ error: err.message });
    }

}
//Doanh thu hàng tháng trong năm
exports.getMonthlyRevenue = async (req, res) => {
    const year = parseInt(req.params.year, 10);
    const monthlyRevenue = { "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 }; // Initialize object for 12 months
    try {

        const revenueData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00Z`),
                        $lt: new Date(`${year + 1}-01-01T00:00:00Z`)
                    },
                    status: 'đã giao' // Only consider delivered orders
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalAmount: { $sum: "$total_amount" }
                }
            }
        ]);
        revenueData.forEach(item => {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthName = monthNames[item._id - 1];
            monthlyRevenue[monthName] = item.totalAmount;
        });
        res.status(200).json(monthlyRevenue);
    } catch (err) {
        console.error('getMonthlyRevenue error', err);
        res.status(500).json({ error: err.message });
    }
}
