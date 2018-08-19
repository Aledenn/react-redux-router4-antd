import Axios from "axios";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

const initState = {
  isAuth: false,
  msg: "",
  user: "",
  pwd: "",
  type: ""
};
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: "", isAuth: "true", ...action.payload };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    default:
      return state;
  }
}

function registerSuccess(data) {
  return { type: "REGISTER_SUCCESS", payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
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
