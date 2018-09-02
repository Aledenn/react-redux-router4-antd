import { InputItem, NavBar, TextareaItem, Button } from "antd-mobile";
import React from "react";
import AvatarSelector from "../../component/avatar-selector/Avatar-selector";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

@connect(state => state.user, { update })
class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      company: "",
      money: ""
    };
    // this.handleSave = this.handleSave.bind(this);
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  selectAvatar(text) {
    this.setState({ avatar: text });
  }

  // handleSave() {
  //   this.props.update(this.state);
  // }

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {console.log(this.props.redirectTo)}
        {redirect && redirect !== path
          ? <Redirect to={this.props.redirectTo} />
          : null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        {/* <AvatarSelector selectAvatar={this.selectAvatar.bind(this)} /> */}
        <AvatarSelector
          selectAvatar={aaa => {
            this.setState({ avatar: aaa });
          }}
        />
        <InputItem onChange={v => this.onChange("title", v)}>招聘职位</InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>公司名称</InputItem>
        <InputItem onChange={v => this.onChange("money", v)}>薪酬福利</InputItem>
        <TextareaItem
          onChange={v => this.onChange("desc", v)}
          rows={3}
          autoHeight
          title="职位要求"
        />
        <Button
          type="primary"
          onClick={() => {
            this.props.update(this.state);
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}

export default BossInfo;
