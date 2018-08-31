import { createStore } from "./myRedux";
// import { createStore } from "redux";

function counter(state = 0, action) {
  console.log(action);
  switch (action.type) {
    case "加机关枪":
      return state + 1;
    case "减机关枪":
      return state - 1;
    default:
      return 10;
  }
}
// 创建store
const store = createStore(counter);

const init = store.getState();
console.log(`一开始有${init}把`);

function listener() {
  const current = store.getState();
  console.log(`现在有机枪${current}把`);
}
store.subscribe(listener);
// 提交状态改变的申请
store.dispatch({ type: "加机关枪" });
store.dispatch({ type: "加机关枪" });
store.dispatch({ type: "加机关枪" });
store.dispatch({ type: "减机关枪" });
