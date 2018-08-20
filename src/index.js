import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import reducers from "./reducer";
import "./config";
import Login from "./container/login/Login";
import Register from "./container/register/Register";
import AuthRoute from "./component/authroute/authroute";
import BossInfo from "./container/bossinfo/Bossinfo";
import GeniusInfo from "./container/genius/Geniusinfo";
import "./index.css";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

ReactDom.render(
  // Provider包裹最外层
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />

        <Route path="/bossinfo" component={BossInfo} />
        <Route path="/geniusinfo" component={GeniusInfo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
