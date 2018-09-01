import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import Page from "./context.demo";
import { Provider } from "./myRedux-react-redux";
import App from "./App";

// import thunk from "redux-thunk";
import thunk from "./mythunk";
import arrayThunk from "./Arraymiddleware";
import { counter } from "./index.redux";
// 自己写的组件
import { createStore, applyMiddleware } from "./myRedux";
// ReactDOM.render(<Page />, document.getElementById("root"));
// const store = createStore(
//   counter,
//   compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
// );

const store = createStore(counter, applyMiddleware(thunk, arrayThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
