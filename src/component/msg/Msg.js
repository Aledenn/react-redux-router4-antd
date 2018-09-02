import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

@connect(state => state)
export default class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const userId = this.props.user._id;
    const userinfo = this.props.chat.users;
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });

    // Object.values
    // console.log(Object.values({ name: "imooc", age: 18 })); Output:["imooc", 18]
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    });

    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userId ? v[0].to : v[0].from;
          const name = userinfo[targetId] ? userinfo[targetId].name : "";
          const avatar = userinfo[targetId] ? userinfo[targetId].avatar : "";
          const unreadNum = v.filter(v => !v.read && v.to == userId).length;
          return (
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unreadNum} />}
                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {lastItem.content}
                <Brief>
                  {name}
                </Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}
