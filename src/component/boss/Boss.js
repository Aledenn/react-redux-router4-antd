import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../usercard/UserCard";
@connect(state => state.chatuser, { getUserList })
export default class Boss extends Component {
  componentDidMount() {
    this.props.getUserList("genius");
  }
  render() {
    // const card = this.props.userlist.filter(v => v.avatar);
    return <UserCard userlist={this.props.userlist} />;
  }
}
