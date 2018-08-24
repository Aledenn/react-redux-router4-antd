import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;
@connect(state => state.user)
export default class User extends Component {
  constructor(props) {
    super(props);
    this.mlogout = this.mlogout.bind(this);
  }
  mlogout() {
    console.log("love");
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
      : null;
  }
}
