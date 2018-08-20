import Axios from "axios";
import { getRedirectPath } from "../util";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: "",
  type: ""
};
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
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
// 注册成功
function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

// export function userinfo() {
//   return dispatch => {
//     Axios.get("/user/info").then(res => {
//       if (res.status === 200) {
//         if (res.data.code === 0) {

//         } else {
//           // this.props.loadData(res.data.data)
//           this.props.history.push("/login");
//         }
//       }
//     });
//   };
// }

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
        dispatch(loginSuccess(res.data.data));
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
        dispatch(registerSuccess({ user, pwd, repeatPWD }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
