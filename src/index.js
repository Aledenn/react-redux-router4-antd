import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import reducers from "./reducer";
import "./config";
import Login from "./container/login/Login";
import Register from "./container/register/Register";
import AuthRoute from "./component/authroute/authroute";
import BossInfo from "./container/bossinfo/Bossinfo";
import GeniusInfo from "./container/genius/Geniusinfo";
import Dashboard from "./component/dashboard/Dashboard";
import Test from "./component/test/Test";
import "./index.css";
import Chat from "./component/chat/Chat";
import cookies from "browser-cookies";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f //调试用
  )
);

// boss genius me msg 4个页面
ReactDom.render(
  // Provider包裹最外层
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route
            exact
            path="/"
            render={() => {
              console.log(cookies.get("userId"));
              return cookies.get("userId")
                ? <Redirect to="/msg" />
                : <Redirect to="/login" />;
            }}
          />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
