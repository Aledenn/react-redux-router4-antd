import React, { Component } from "react";
import { connect } from "react-redux";
import { Result } from "antd-mobile";

@connect(state => state.user)
export default class User extends Component {
  render() {
    return (
      <div>
        <p>用户中心页</p>
      </div>
    );
  }
}
