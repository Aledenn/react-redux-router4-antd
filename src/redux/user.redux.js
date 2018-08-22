import Axios from "axios";
import { getRedirectPath } from "../util";

// const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";

const initState = {
  redirectTo: "",
  // isAuth: false,
  msg: "",
  user: "",
  type: ""
};
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    default:
      return state;
  }
}

function authSuccess(data) {
  const { pwd, ...wpData } = data;
  return { type: AUTH_SUCCESS, payload: wpData };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function update(data) {
  return dispatch => {
    Axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg("用户密码错误");
  }
  return dispatch => {
    Axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function register({ user, pwd, repeatPWD, type }) {
  if (!user || !pwd || !type) {
    return errorMsg("用户密码必须输入");
  }
  if (pwd !== repeatPWD) {
    if (pwd !== repeatPWD) {
      return errorMsg("密码和确认密码不同");
    }
  }
  return dispatch => {
    Axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
