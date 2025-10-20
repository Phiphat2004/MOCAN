const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    order_date: { type: Date, default: Date.now },
    total_amount: { type: Number, required: true },
    note: { type: String },
    payment_method: {
      type: String,
      enum: ["COD", "Momo", "Chuyển khoản"],
      required: true,
    },
    guest: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["đang xử lý", "đang giao", "đã giao", "hủy"],
      default: "đang xử lý",
    },
    order_detail: [
      {
        product_id: {
          type: mongoose.Schema.Types.String,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        total_price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
