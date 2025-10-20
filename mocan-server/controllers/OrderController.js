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
    // ✉️ GỬI EMAIL XÁC NHẬN
    // ----------------------------
    if (guestInfo.email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // tạo bảng HTML danh sách sản phẩm
      const tableRows = savedDetails.map(item => `
        <tr style="border-bottom:1px solid #ddd;text-align:center;">
          <td style="padding:8px;"><img src="${item.image}" width="70" /></td>
          <td style="padding:8px;">${item.product_name}</td>
          <td style="padding:8px;">${item.quantity}</td>
          <td style="padding:8px;">${item.unit_price.toLocaleString()}₫</td>
          <td style="padding:8px;">${item.total_price.toLocaleString()}₫</td>
        </tr>
      `).join('');

      const mailHTML = `
        <div style="font-family:sans-serif;">
          <h2>Cảm ơn bạn đã đặt hàng tại <span style="color:#4CAF50;">Mộc An</span>!</h2>
          <p>Mã đơn hàng: <strong>${savedOrder._id}</strong></p>
          <h3>Thông tin người nhận:</h3>
          <p><strong>Tên:</strong> ${guestInfo.name}</p>
          <p><strong>Số điện thoại:</strong> ${guestInfo.phone}</p>
          <p><strong>Địa chỉ:</strong> ${guestInfo.address}</p>
          ${note ? `<p><strong>Ghi chú:</strong> ${note}</p>` : ''}
          <h3>Chi tiết đơn hàng:</h3>
          <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <thead>
              <tr style="background:#f4f4f4;">
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <h3 style="text-align:right;margin-top:10px;">Tổng cộng: ${totalAmount.toLocaleString()}₫</h3>
          <p style="margin-top:20px;">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.</p>
          <p>Trân trọng,<br/>Đội ngũ <strong>Mộc An</strong></p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Mộc An" <${process.env.EMAIL_USER}>`,
        to: guestInfo.email,
        subject: `Xác nhận đơn hàng #${savedOrder._id}`,
        html: mailHTML,
      });

      console.log(`📩 Đã gửi email xác nhận tới ${guestInfo.email}`);
    }

    // ----------------------------
    // ✨ PHẢN HỒI CHO FRONTEND
    // ----------------------------
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
    const orders = await Order.find().populate("order_detail.product_id");
    res.json(orders);
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
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
