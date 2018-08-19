const express = require("express");
const userRouter = require("./user");

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
