import React from "react";
import { Link } from "react-router-dom";
import App from "./App";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./Auth.redux";

function Erying() {
  return <h2>二营</h2>;
}

function Qibinglian() {
  return <h2>骑兵连</h2>;
}

@connect(
  state => state.auth,
  { logout }
)
class Dashboard extends React.Component {
  render() {
    const redirectToLogin = <Redirect to="/login" />;
    const match = this.props.match;
    const app = (
      <div>
        <h1>Dashboard page</h1>
        <h2>独立团</h2>
        {this.props.isAuth ? (
          <button onClick={this.props.logout}>注销</button>
        ) : null}
        <ul>
          <li>
            <Link to={`${match.url}`}>一营</Link>
          </li>
          <li>
            <Link to={`${match.url}/erying`}>二营</Link>
          </li>
          <li>
            <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
          </li>
        </ul>
        <Route path="/dashboard/" exact component={App} />
        <Route path="/dashboard/qibinglian" component={Qibinglian} />
        <Route path="/dashboard/erying" component={Erying} />
      </div>
    );

    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;
