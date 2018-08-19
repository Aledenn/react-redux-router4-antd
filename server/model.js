const DB_URL = "mongodb://localhost:27017/imooc";
const mongoose = require("mongoose");

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", () => {
  console.log("mongo connect success");
});
