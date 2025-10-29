const Order = require("../models/Order");
const Product = require("../models/Product");

// 🟢 Tạo Order mới
const nodemailer = require('nodemailer');

exports.createOrder = async (req, res) => {
  try {
    const { guest, order_detail, payment_method } = req.body;

    if (!order_detail || !Array.isArray(order_detail) || order_detail.length === 0) {
      return res.status(400).json({ message: 'Order must include order_detail items' });
    }

    const guestArr = Array.isArray(guest) ? guest : (guest ? [guest] : []);
    if (guestArr.length === 0) return res.status(400).json({ message: 'Guest information required' });
    const guestInfo = guestArr[0];
    if (!guestInfo.name || !guestInfo.phone || !guestInfo.address)
      return res.status(400).json({ message: 'Guest name, phone and address are required' });

    // validate products and stock
    let totalAmount = 0;
    const savedDetails = [];
    const decremented = [];
    for (const it of order_detail) {
      const pid = it.product_id;
      const qty = Number(it.quantity || 0);
      if (!pid || qty <= 0) {
        for (const d of decremented) {
          await Product.findByIdAndUpdate(d.pid, { $inc: { stock_quantity: d.qty } });
        }
        return res.status(400).json({ message: 'Invalid product or quantity' });
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: pid, stock_quantity: { $gte: qty } },
        { $inc: { stock_quantity: -qty } },
        { new: true }
      );

      if (!updatedProduct) {
        for (const d of decremented) {
          await Product.findByIdAndUpdate(d.pid, { $inc: { stock_quantity: d.qty } });
        }
        return res.status(400).json({ message: `Số lượng không đủ cho sản phẩm ${pid}` });
      }

      const unit_price = Number(it.unit_price ?? updatedProduct.price ?? 0);
      const total_price = unit_price * qty;
      totalAmount += total_price;
      savedDetails.push({
        product_id: String(pid),
        product_name: updatedProduct.name,
        image: updatedProduct.images && updatedProduct.images.length > 0 ? updatedProduct.images[0] : '',
        quantity: qty,
        color: it.color || '',
        size: it.size || '',
        unit_price,
        total_price,
      });
      decremented.push({ pid, qty });
    }

    const note = req.body.note ?? guestInfo.note ?? undefined;

    const orderDoc = new Order({
      order_date: new Date(),
      total_amount: totalAmount,
      note,
      payment_method: payment_method || 'COD',
      guest: [guestInfo],
      order_detail: savedDetails,
    });

    const savedOrder = await orderDoc.save();

    // ----------------------------
    // ✨ PHẢN HỒI CHO FRONTEND (KHÔNG GỬI EMAIL TỰ ĐỘNG)
    // ----------------------------
    // Email xác nhận khi thanh toán đã bị tắt theo yêu cầu
    res.status(201).json({
      message: 'Đặt hàng thành công!',
      order_id: savedOrder._id,
      total_amount: totalAmount,
    });

  } catch (error) {
    console.error('createOrder error', error);
    res.status(400).json({ message: error.message });
  }
};


// 🔵 Lấy tất cả Order
exports.getAllOrders = async (req, res) => {
  try {
    const { phone } = req.query;
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
    const skip = (page - 1) * limit;

    const query = {};
    if (phone) {
      // match orders where any guest entry has the provided phone
      query['guest.phone'] = String(phone).trim();
    }

    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limit) || 1;

    const orders = await Order.find(query)
      .sort({ order_date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('order_detail.product_id');

    res.json({ orders, total, page, limit, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟣 Lấy Order theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "order_detail.product_id"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Cập nhật Order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("order_detail.product_id");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔴 Xóa Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Nếu chuyển sang 'hủy' và trạng thái cũ không phải 'hủy', hoàn lại số lượng sản phẩm
    if (status === "hủy" && order.status !== "hủy") {
      for (const item of order.order_detail) {
        const pid = item.product_id;
        const qty = Number(item.quantity || 0);
        if (pid && qty > 0) {
          await Product.findByIdAndUpdate(pid, { $inc: { stock_quantity: qty } });
        }
      }
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
