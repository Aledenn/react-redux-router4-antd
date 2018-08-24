import React, { Component } from "react";
import PropTypes from "prop-types";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";

// const Item = TabBar.Item;
// 不是路由组件要加withRouter, 从react-router-dom中获得
@withRouter
export default class NavLinkBar extends Component {
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;
    return (
      <div style={{ position: "fixed", width: "100%", bottom: 0 }}>
        <TabBar>
          {navList.map(v =>
            <TabBar.Item
              key={v.path}
              title={v.text}
              icon={{ uri: require(`../img/${v.icon}.png`) }}
              selectedIcon={{ uri: require(`../img/${v.icon}-active.png`) }}
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path);
              }}
            />
          )}
        </TabBar>
      </div>
    );
  }
}
