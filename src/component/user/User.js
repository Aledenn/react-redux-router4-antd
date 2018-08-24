import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace, Modal } from "antd-mobile";
import cookies from "browser-cookies";
import { logoutSubmit } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
@connect(state => state.user, {
  logoutSubmit
})
export default class User extends Component {
  constructor(props) {
    super(props);
    this.mlogout = this.mlogout.bind(this);
  }
  mlogout() {
    console.log("love");
    alert("注销", "确认退出???", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确认",
        onPress: () => {
          cookies.erase("userId");
          // 刷新界面
          // window.location.href = window.location.href;
          this.props.logoutSubmit();
        }
      }
    ]);
  }

  render() {
    const myProps = this.props;

    console.log(myProps);
    return myProps.user
      ? <div>
          <Result
            img={
              <img
                src={require(`../img/${myProps.avatar}.png`)}
                style={{ width: 72 }}
                alt="图片"
              />
            }
            title={myProps.user}
            message={myProps.type === "boss" ? myProps.company : null}
          />
          <List renderHeader={() => "简介"}>
            <Item multipleLine>
              {myProps.title}
              {myProps.desc.split("\n").map(v =>
                <Brief key={v}>
                  {v}
                </Brief>
              )}
              {myProps.money
                ? <Brief>
                    薪资：{myProps.money}
                  </Brief>
                : null}
            </Item>
          </List>
          <WhiteSpace />
          <List>
            <Item onClick={this.mlogout}>退出登录</Item>
          </List>
        </div>
      : <Redirect to={myProps.redirectTo} />;
  }
}
