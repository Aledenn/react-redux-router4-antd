const arrayThunk = ({ dispatch, getState }) => next => action => {
  if (Array.isArray(action)) {
    return action.forEach(v => dispatch(v));
  }
  //   如果不符合我们的要求，直接调用下一个中间件，使用next
  // 符合我们的要求，直接重新dispatch,调用dispatch即可
  // 默认什么都没干
  return next(action);
};
export default arrayThunk;

// 支持数组的中间件
