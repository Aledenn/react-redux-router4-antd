import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, Card, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
export default class UserCard extends Component {
  static propsTypes = {
    userlist: PropTypes.array.isRequired
  };
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userlist.map(
          v =>
            v.avatar
              ? <Card onClick={() => this.handleClick(v)} key={v._id}>
                  <Card.Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={
                      <span>
                        {v.title}
                      </span>
                    }
                  />
                  <Card.Body>
                    {v.type === "boss"
                      ? <div>
                          公司：{v.money}
                        </div>
                      : null}
                    {v.desc
                      ? v.desc.split("\n").map(d =>
                          <div key={d}>
                            {d}
                          </div>
                        )
                      : null}
                    {v.type === "boss"
                      ? <div>
                          薪酬：{v.money}
                        </div>
                      : null}
                  </Card.Body>
                </Card>
              : null
        )}
      </WingBlank>
    );
  }
}
