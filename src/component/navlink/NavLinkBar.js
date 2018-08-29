import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// const Item = TabBar.Item;
// 不是路由组件要加withRouter, 从react-router-dom中获得
@withRouter
@connect(state => state.chat)
class NavLinkBar extends Component {
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;
    return (
      <div style={{ position: "fixed", width: "100%", bottom: 0 }}>
        <TabBar>
          {navList.map(v =>
            <TabBar.Item
              badge={v.path === "/msg" ? this.props.unread : 0}
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

export default NavLinkBar;
