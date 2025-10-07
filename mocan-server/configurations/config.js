require("dotenv").config();

module.exports = {
  databaseURI: process.env.DATABASE_URI || "mongodb://localhost:27017/mocan",
  port: process.env.PORT || 3000,
  secret_key: process.env.SECRET_KEY || "123456",

};
