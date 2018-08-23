import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import NavLinkBar from "../navlink/NavLinkBar";
import { Switch, Route } from "react-router-dom";
import Boss from "../boss/Boss";
import Genius from "../genius/Genius";
import User from "../user/User";

function Msg() {
  return <h2>Msg</h2>;
}

@connect(state => state)
export default class Dashboard extends Component {
  render() {
    // console.log(user);
    // console.log(this.props);
    const user = this.props.user;

    const { pathname } = this.props.location;

    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "genius",
        title: "BOSS列表",
        component: Genius,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ];

    return (
      <div>
        <NavBar className="fixd-header" mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v =>
              <Route key={v.path} path={v.path} component={v.component} />
            )}
          </Switch>
        </div>
        <NavLinkBar data={navList}> </NavLinkBar>
        {/* <Route path="/boss" component={Boss} />
        <Route path="/genius" component={Genius} /> */}
        <h2>footer</h2>
      </div>
    );
  }
}
