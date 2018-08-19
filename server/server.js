const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./user");

const DB_URL = "mongodb://localhost:27017/imooc";
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", () => {
  console.log("mongo connect success");
});

const app = express();

app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(9093, function() {
  console.log("Node app start at port 9093");
});

// 类似于mysql的表  mango里有文档、字段的概念
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
  })
);
