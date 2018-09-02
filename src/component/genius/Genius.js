import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../usercard/UserCard";

// 没有user信息
@connect(state => state.chatuser, { getUserList })
export default class Genius extends Component {
  componentDidMount() {
    this.props.getUserList("boss");
  }
  render() {
    // console.log(this.props.userlist);
    // const card = this.props.userlist.filter(v => v.avatar);
    return <UserCard userlist={this.props.userlist} />;
  }
}
