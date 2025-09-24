var config = require("../configurations/config");
const mongoose = require("mongoose");
const Admin = require("../models/Admin"); // import model Admin

const url = config.databaseURI;
const connect = mongoose.connect(url);

connect
  .then(async () => {
    console.log("✅ Connected to the database successfully");

    // 🔎 Kiểm tra có admin nào trong DB chưa
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        username: "admin",
        password: "123456", // sẽ được hash nhờ pre("save")
      });

      await defaultAdmin.save();
      console.log(
        "🆕 Default admin account created: username=admin, password=123456"
      );
    } else {
      console.log("ℹ️ Admin account already exists, skipping creation.");
    }
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });

module.exports = connect;
