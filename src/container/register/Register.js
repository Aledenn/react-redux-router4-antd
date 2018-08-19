import React, { Component } from "react";
import Logo from "../../component/logo/logo";
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from "antd-mobile";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "genius" //或者boss
    };
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo />
        <List>
          <InputItem>用户名</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
          <InputItem>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type === "genius"}>牛人</RadioItem>
          <RadioItem
            onClick={() => {
              this.setState({ type: "boss" });
            }}
            checked={this.state.type === "boss"}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary">登录</Button>
        </List>
      </div>
    );
  }
}
