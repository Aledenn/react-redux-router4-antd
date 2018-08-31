const express = require("express");
const Router = express.Router();
const model = require("./model");
const utils = require("utility");
const User = model.getModel("user");
const Chat = model.getModel("chat");
const _filter = { pwd: 0, __v: 0 };

// Chat.remove({}, (e, d) => {});

Router.post("/readmsg", (req, res) => {
  const userId = req.cookies.userId;
  const { from } = req.body;
  console.log(userId, from);
  Chat.update(
    { from, to: userId },
    { $set: { read: true } },
    { multi: true },
    (err, doc) => {
      console.log(doc);
      if (!err) {
        return res.json({ code: 0, num: doc.nModified });
      }
      return res.json({ code: 1, msg: "修改失败" });
    }
  );
});

Router.get("/list", (req, res) => {
  // 删除原来的
  // User.remove({}, function(e, d) {});
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    return res.json({ code: 0, data: doc });
  });
});

Router.get("/getmsglist", (req, res) => {
  const user = req.cookies.userId;
  User.find({}, (e, userdoc) => {
    let users = {};
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
    Chat.find({ $or: [{ from: user }, { to: user }] }, (err, doc) => {
      if (!err) {
        return res.json({ code: 0, msgs: doc, users: users });
      }
    });
  });
});

Router.get("/list2", (req, res) => {
  // 删除原来的
  // User.remove({}, function(e, d) {});
  // User.find({}, (err, doc) => {
  //   return res.json({ code: 0, data: doc });
  // });
  Chat.find({}, (err, doc) => {
    return res.json({ code: 0, data: doc });
  });
});

Router.get("/delete/:id", (req, res) => {
  // user="..."
  // const id = `user=${req.params.id}`;
  const user = req.params.id;
  console.log(user);
  // const type = "boss";
  // {type}=>{type:"boss"}
  // console.log(id, typeof id);
  User.remove({ user }, (err, doc) => {
    return res.json({ code: 0, data: doc });
  });
});

Router.post("/update", (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return json.dumps({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userId, body, (err, doc) => {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data });
  });
});

Router.post("/login", (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或者密码错误" });
    }
    res.cookie("userId", doc._id);
    return res.json({ code: 0, data: doc });
  });
});

Router.post("/register", (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user: user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const { user, type, _id } = d;
      res.cookie("userId", _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.get("/info", (req, res) => {
  // 用户没有cookie
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userId }, _filter, (err, doc) => {
    if (err) return res.json({ code: 1, msg: "后端出错了" });
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

// 两层md5加盐
function md5Pwd(pwd) {
  const salt = "lcbhww2018@esquel";
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
