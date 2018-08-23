import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, Card, WhiteSpace } from "antd-mobile";

export default class UserCard extends Component {
  static propsTypes = {
    userlist: PropTypes.array.isRequired
  };

  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userlist.map(
          v =>
            v.avatar
              ? <Card key={v._id}>
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
