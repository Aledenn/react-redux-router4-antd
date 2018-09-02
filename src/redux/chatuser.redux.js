import Axios from "axios";

const USER_LIST = "USER_LIST";

const initState = {
  userlist: []
};

function userlist(data) {
  return { type: USER_LIST, payload: data };
}

export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userlist: action.payload };
    default:
      return state;
  }
}

export function getUserList(type) {
  return dispatch => {
    Axios.get("/user/list?type=" + type).then(res => {
      if (res.data.code === 0) {
        dispatch(userlist(res.data.data));
      }
    });
  };
}
