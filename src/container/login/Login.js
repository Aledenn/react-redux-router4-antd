import React, { Component } from "react";
import Logo from "../../component/logo/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register() {
    console.log(this.props);
    this.props.history.push("/register");
  }
  render() {
    return (
      <div>
        <Logo />
        <h2>登录页</h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
          </List>
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
