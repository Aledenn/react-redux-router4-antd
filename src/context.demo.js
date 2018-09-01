import React, { Component } from "react";
import PropTypes from "prop-types";
// context
// 全局的 组件里声明，所有子元素可以直接获取

class Siderbar extends Component {
  static contextTypes = {
    user: PropTypes.string,
    from: PropTypes.string
  };
  render() {
    console.log("Siderbar", this.context);
    return (
      <div>
        <p>
          {this.context.from}的侧边栏
        </p>
        <Navbar />
      </div>
    );
  }
}

// function Navbar (props,context){}

class Navbar extends Component {
  static contextTypes = {
    user: PropTypes.string
  };
  render() {
    console.log("Navbar", this.context);
    return (
      <div>
        {this.context.user}的导航栏
      </div>
    );
  }
}

export default class Page extends Component {
  static childContextTypes = {
    user: PropTypes.string,
    from: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = { user: "lcb", from: "父组件" };
  }
  getChildContext() {
    console.log("context?");
    return this.state;
  }
  render() {
    return (
      <div>
        <p>
          我是{this.state.user}
        </p>
        <Siderbar />
      </div>
    );
  }
}
