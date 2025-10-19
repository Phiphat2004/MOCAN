const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String },
    description: { type: String },
    ingredients: [{ type: String }],
    weight: { type: Number },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    skin_type: { type: String },
    colors: [{ type: String }],
    scent: { type: String },
    price: { type: Number, required: true },
    stock_quantity: { type: Number, default: 0 },
    manufacture_date: { type: Date },
    expiry_date: { type: Date },
    images: [{ type: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
