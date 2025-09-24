const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const config = require("../configurations/config"); // nơi lưu secret key

// 🔑 Login admin
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm admin theo username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Sai username hoặc password" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai username hoặc password" });
    }

    // Tạo token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      config.secret_key, // bạn cần khai báo trong config
      { expiresIn: "1h" } // token hết hạn sau 1h
    );

    res.json({ message: "Đăng nhập thành công", token });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
