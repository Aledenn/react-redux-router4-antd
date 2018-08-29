const express = require("express");
const userRouter = require("./user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const model = require("./model");
const Chat = model.getModel("chat");
// work with express
const app = express();
const server = require("http").Server(app);
// socket.io
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("user login");
  socket.on("sendmsg", data => {
    const { from, to, msg } = data;
    console.log(from, to);
    const chatid = [from, to].sort().join("_");
    console.log([from, to].sort());
    console.log(chatid);
    Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
      console.log(doc);
      io.emit("recvmsg", Object.assign({}, doc._doc));
    });
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
