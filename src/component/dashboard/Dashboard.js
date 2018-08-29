import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import NavLinkBar from "../navlink/NavLinkBar";
import { Switch, Route } from "react-router-dom";
import Boss from "../boss/Boss";
import Genius from "../genius/Genius";
import User from "../user/User";
import { getMsgList, sendMsg, recvMsg } from "../../redux/chat.redux";
// import Test from "../test/Test";

function Msg() {
  return <h2>Msg</h2>;
}

@connect(state => state, { getMsgList, recvMsg })
export default class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  render() {
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
      <React.Fragment>
        <NavBar mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <Switch style={{ marginTop: 45 }}>
          {navList.map(v =>
            <Route key={v.path} path={v.path} component={v.component} />
          )}
        </Switch>
        <NavLinkBar data={navList}> </NavLinkBar>
      </React.Fragment>
    );
  }
}
