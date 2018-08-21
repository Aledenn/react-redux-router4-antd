import { InputItem, NavBar, TextareaItem, Button } from "antd-mobile";
import React from "react";
import AvatarSelector from "../../component/avatar-selector/Avatar-selector";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";

@connect(state => state.user, { update })
class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  selectAvatar(text) {
    this.setState({ avatar: text });
  }

  handleSave() {
    this.props.update(this.state);
  }

  render() {
    return (
      <div>
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
          onChange={v => this.onChange("money", v)}
          rows={3}
          autoHeight
          title="职位要求"
        />
        <Button type="primary" onClick={this.handleSave}>
          保存
        </Button>
      </div>
    );
  }
}

export default BossInfo;
