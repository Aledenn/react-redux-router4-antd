import React, { Component } from "react";
import Axios from "axios";
import { WingBlank, Card, WhiteSpace } from "antd-mobile"; //两翼留白

export default class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Axios.get("/user/list?type=genius").then(res => {
      if (res.data.code == 0) {
        this.setState({ data: res.data.data });
      }
    });
  }
  render() {
    const card = this.state.data.filter(v => v.avatar);
    return (
      <WingBlank>
        <WhiteSpace />
        {card.map(v =>
          <Card key={v._id}>
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
              {v.desc.split("\n").map(v =>
                <div key={v}>
                  {v}
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </WingBlank>
    );
  }
}
