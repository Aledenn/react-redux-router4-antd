const DB_URL = "mongodb://localhost:27017/imooc-chat";
const mongoose = require("mongoose");

mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("mongo connect success");
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    // 头像
    avatar: { type: String },
    // 个人简介
    desc: { type: String },
    title: { type: String },
    // boss的字段
    company: { type: String },
    money: { type: String }
  },
  // 聊天
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, require: true, default: false },
    content: { type: String, require: true, default: "" },
    create_time: { type: Number, default: new Date().getTime() }
  }
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};
