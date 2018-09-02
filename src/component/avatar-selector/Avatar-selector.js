import React from "react";
import { Grid, List } from "antd-mobile";
import PropTypes from "prop-types";
class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      icon: ""
    };
  }
  render() {
    let avatarList = [];
    for (let i = 1; i < 50; i++) {
      avatarList[i - 1] = String(i);
    }
    const AvatarList = avatarList.map(v => ({
      icon: require(`../img/${v}.png`),
      text: v
    }));
    const gridHeader = this.state.text
      ? <div style={{ marginTop: 40 }}>
          <span>已选择头像</span>
          <img style={{ width: 40 }} src={this.state.icon} alt="头像" />
        </div>
      : <div style={{ marginTop: 40 }}>'请选择头像'</div>;
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={AvatarList}
            activeStyle={false}
            columnNum={7}
            onClick={elm => {
              this.setState(elm);
              this.props.selectAvatar(elm.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
