const express = require("express");
const userRouter = require("./user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// work with express
const app = express();
const server = require("http").Server(app);
// socket.io
const io = require("socket.io")(server);

io.on("connection", socket => {
  // console.log("user login");
  socket.on("sendmsg", data => {
    console.log(data);
    io.emit("recvmsg", data);
  });
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);

server.listen(9093, function() {
  console.log("Node app start at port 9093");
});

// 类似于mysql的表  mango里有文档、字段的概念
// const User = mongoose.model(
//   "user",
//   new mongoose.Schema({
//     user: { type: String, require: true },
//     age: { type: Number, require: true }
//   })
// );
