import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore,applyMiddleware, compose} from 'redux';
import { counter} from './index.redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Link,
        Redirect,Switch
} from 'react-router-dom'

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
)
)

function Erying() {
    return <h2>二营</h2>
}

function Qibinglian() {
    return <h2>骑兵连</h2>
}

class Test extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props);
        // 可实现页面跳转
        // this.props.history.push('/')
        return <h2>测试组件{this.props.location.pathname}</h2>
    }
}

// provider组件在应用最外层。传入store即可。只用一次

ReactDom.render(
    // Provider包裹最外层
<Provider store={store}>
    <BrowserRouter>
    <Switch>

        
    </Switch>
    <div>
    <ul>
        <li>
            <Link to="/">一营</Link>
        </li>
        <li>
            <Link to="/erying">二营</Link>
        </li>
        <li>
            <Link to="/qibinglian">骑兵连</Link>
        </li>
    </ul>
    {/* <Redirect to='/qibinglian'></Redirect> */}
    {/* Switch只命中第一个抓取得 */}
    <Switch>
        {/* exact完全匹配 否则App会和别的内容一起出现*/}
        <Route path='/' exact component={App}></Route>
        <Route path='/erying' component={Erying}></Route>
        {/* <Route path='/:location' component={Test}></Route> */}
        <Route path='/qibinglian' component={Qibinglian}></Route>
        <Route patch='/:location' component={Test}></Route>

    </Switch>

    </div>
 
</BrowserRouter>
</Provider>    
,
    document.getElementById('root'))


