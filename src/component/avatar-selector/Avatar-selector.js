import React from "react";

class AvatarSelector extends React.Component {
  render() {
    let avatarList = [];
    for (let i = 1; i < 50; i++) {
      avatarList[i] = String(i);
    }
    return <div>头像选择</div>;
  }
}

export default AvatarSelector;
