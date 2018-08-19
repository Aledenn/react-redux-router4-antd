import React, { Component } from "react";
import Axios from "axios";
// 让我们的AuthRoute有
import { withRouter } from "react-router-dom";

@withRouter
export default class AuthRoute extends Component {
  componentDidMount() {
    const publicList = ["/login", "register"];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    // 获取用户信息
    Axios.get("/user/info").then(res => {
      if (res.status === 200) {
        console.log(res);
        if (res.data.code === 0) {
        } else {
          this.props.history.push("/login");
        }
      }
    });
    // 用户状态
    // 现在url地址 login是不需要跳转的

    // 用户的type 身份是牛人还是Boss
    // 用户是否完善信息 (选择头像  个人简介)
  }
  render() {
    return <div />;
  }
}
