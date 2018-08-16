// 通过reducer建立
// 根据老的state和action 生成新的state

const ADD_GUN = "加机关枪";
const REMOVE_GUN = "减机关枪";

export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_GUN:
      return state + 1;
    case REMOVE_GUN:
      return state - 1;
    default:
      return 10;
  }
}

export function addGun() {
  return { type: ADD_GUN };
}

export function removeGun() {
  return { type: REMOVE_GUN };
}

export function addGunAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(addGun());
    }, 2000);
  };
}
