import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import reducers from "./reducer";
import "./config";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

// console.log(store.getState());

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     console.log(this.props);
//     // 可实现页面跳转
//     // this.props.history.push('/')
//     return (
//       <h2>
//         测试组件
//         {this.props.location.pathname}
//       </h2>
//     );
//   }
// }

// provider组件在应用最外层。传入store即可。只用一次

ReactDom.render(
  // Provider包裹最外层
  <Provider store={store}>
    <BrowserRouter>
      {/* Switch只命中第一个抓取得 */}
      <Switch>
        {/* exact完全匹配 否则App会和别的内容一起出现*/}
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
