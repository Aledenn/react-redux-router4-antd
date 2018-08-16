const express = require("express");
const mongoose = require("mongoose");

// 连接mango
// 新建imooc集合
const DB_URL = "mongodb://localhost:27017/imooc";
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", () => {
  console.log("mongo connect success");
});

// 类似于mysql的表  mango里有文档、字段的概念
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
  })
);

// 新增数据;
// User.create(
//   {
//     user: "xiaohua",
//     age: 12
//   },
//   function(err, doc) {
//     if (!err) {
//       console.log(doc);
//     } else {
//       console.log(err);
//     }
//   }
// );

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/data", (req, res) => {
  // User.find()返回集合
  // findOne()返回对象
  User.findOne({ user: "xiaoming" }, (err, doc) => {
    res.json(doc);
  });
  // res.json({ name: "imooc", type: "IT" });
});

// User.update({ user: "xiaoming" }, { $set: { age: 26 } }, (err, doc) => {
//   console.log(doc);
// });

// User.remove(
//   {
//     age: 18
//   },
//   (err, doc) => {
//     console.log(doc);
//   }
// );

app.listen(9093, function() {
  console.log("Node app start at port 9093");
});
