import React from "react";
import { connect } from "react-redux";
import { login } from "./Auth.redux";
import { Redirect } from "react-router-dom";
// 合併2個reducer combineReducers
@connect(
  state => state.auth,
  {
    login
  }
)
class Auth extends React.Component {
  render() {
    return (
      <div>
        {this.props.isAuth ? <Redirect to="/dashboard/" /> : null}
        <h2>你沒有权限，需要登录后才能查看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    );
  }
}

export default Auth;
