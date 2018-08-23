import React, { Component } from "react";
import { Result, List, WhiteSpace } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

export default class Test extends Component {
  mlogout() {
    console.log("love hww");
  }

  render() {
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
