import React, { Component } from "react";
import { Result, List, WhiteSpace } from "antd-mobile";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.mlogout = this.mlogout.bind(this);
  }

  mlogout() {
    console.log("love");
  }

  render() {
    const Item = List.Item;
    return (
      <div>
        <List>
          <Item onClick={this.mlogout}>退出登录</Item>
        </List>
        <div>Test页面</div>
      </div>
    );
  }
}
