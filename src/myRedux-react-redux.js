// react-redux
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "./myRedux";
// connect负责链接组件，把redux里的数据放到组件的属性里
// 1.负责接受一个组件，把state里的一些数据放进去，返回一个组件
// 2.数据变化的时候，能够通知组件
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => WrapComponent => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    };
    constructor(props, context) {
      super(props, context);
      this.state = {
        props: {}
      };
    }
    componentDidMount() {
      const { store } = this.context;
      store.subscribe(() => this.update());
      this.update();
    }
    update() {
      // 获取mapStateToProps和mapDispatchToProps放入this.props里
      const { store } = this.context;
      const stateProps = mapStateToProps(store.getState());
      //   方法直接使用addGun()没有意义，要store.dispatch(addGun()),才可以
      const dispatchProps = bindActionCreators(
        mapDispatchToProps,
        store.dispatch
      );
      console.log(stateProps);
      this.setState({
        props: { ...this.state.props, ...stateProps, ...dispatchProps }
      });
    }
    render() {
      return <WrapComponent {...this.state.props} />;
    }
  };
};

// function写connect 高阶组件写法 WrapComponent为一个组件
// export function connect(mapStateToProps,mapDispatchToProps){
//     return function (WrapComponent){
//         return class ConnectComponent extends React.Component{

//         }
//     }
// }

// Provider,把stroe放到context里，所有的子元素可以直接调用

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store: this.store };
  }
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  render() {
    return this.props.children;
  }
}
