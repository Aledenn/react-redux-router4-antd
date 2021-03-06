import io from "socket.io-client";
import Axios from "axios";
const socket = io("ws://localhost:9093");

// 获取聊天列表
const MSG_LIST = "MSG_LIST";
// 读取信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

const CLAER_CHAT = "CLAER_CHAT";
const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case CLAER_CHAT:
      return {
        chatmsg: [],
        users: {},
        unread: 0
      };
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userId
        ).length
      };
    case MSG_RECV:
      const n = action.payload.to === action.userId ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread + n
      };

    case MSG_READ:
      const { from, num } = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: v.from == from ? true : v.read
        })),
        unread: state.unread - num
      };
    default:
      return state;
  }
}

function msgList(msgs, users, userId) {
  return { type: MSG_LIST, payload: { msgs, users, userId } };
}

function msgRecv(msg, userId) {
  return { userId, type: MSG_RECV, payload: msg };
}

function magRead({ from, userId, num }) {
  return { type: MSG_READ, payload: { from, userId, num } };
}

function msgClear() {
  return { type: CLAER_CHAT };
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on("recvmsg", data => {
      const userId = getState().user._id;
      dispatch(msgRecv(data, userId));
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit("sendmsg", { from, to, msg });
  };
}

// getState
export function getMsgList() {
  return (dispatch, getState) => {
    Axios.get("/user/getmsglist").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userId));
      }
    });
  };
}

// 修改已阅读
export function readMsg(from) {
  return (dispatch, getState) => {
    Axios.post("/user/readmsg", { from }).then(res => {
      const userId = getState().user._id;
      if (res.status == 200 && res.data.code == 0) {
        dispatch(magRead({ userId, from, num: res.data.num }));
      }
    });
  };
}

// 清除state
export function clearChat() {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(msgClear());
  };
}
