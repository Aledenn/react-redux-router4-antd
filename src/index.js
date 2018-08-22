import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducer";
import "./config";
import Login from "./container/login/Login";
import Register from "./container/register/Register";
import AuthRoute from "./component/authroute/authroute";
import BossInfo from "./container/bossinfo/Bossinfo";
import GeniusInfo from "./container/genius/Geniusinfo";
import Dashboard from "./component/dashboard/Dashboard";
import "./index.css";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
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
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
