import React from "react";
import { NavBar, InputItem, TextareaItem } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/Avatar-selector";

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

  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector />
        <InputItem onChange={v => this.onChange("title", v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange("money", v)}>
          薪酬福利
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange("money", v)}
          rows={3}
          autoHeight
          title="职位要求"
        >
          职位要求
        </TextareaItem>
      </div>
    );
  }
}

export default BossInfo;
