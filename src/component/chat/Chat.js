import React, { Component } from "react";
import { List, InputItem } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList, sendMsg, recvMsg } from "../../redux/chat.redux";

@connect(state => state, { getMsgList, sendMsg, recvMsg })
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", msg: [] };
  }
  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
    // 全局应用
    // socket.on("recvmsg", data => {
    //   console.log(data);
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   });
    // });
    // const socket = io("ws://localhost:9093");
  }

  handleSubmit() {
    // socket.emit("sendmsg", { text: this.state.text });
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: "" });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.chat.chatmsg.map(v => {
          return (
            <p key={v._id}>
              {v.content}
            </p>
          );
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v });
              }}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>
    );
  }
}
