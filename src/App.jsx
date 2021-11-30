
import React, { Component } from 'react'
import 'antd/dist/antd.css'
// import {BrowserRouter,Switch,Route} from 'react-router-dom'
// import Login from './Page/Login'
// import Main from './Page/Main'
import { MyCtx } from './store/MyContext'
import myStore from './store/MobxStore'
import ShowRouter from './ShowRouter/index'

export default class App extends Component {
  render() {
    return (
      <MyCtx.Provider value={myStore}>
      <>
        {/* <BrowserRouter> */}
            {/* <Switch>
                
                <Route path="/login" component={Login}></Route>
                <Route path="/main" render={()=>
                  (
                    <Main>
                    <Route path="/main/notice" component={Notice}></Route>
                    <Route path="/main/dormitory" component={Dormitory}></Route>
                    <Route path="/main/student" component={Student}></Route>
                    <Route path="/main/announcement" component={Announcement}></Route>
                    <Route path="/main/admin" component={Admin}></Route>
                    </Main>
                  )
                }></Route>
                <Route path="/" component={Login}></Route>
            </Switch> */}
        {/* </BrowserRouter> */}
        <ShowRouter/> 
      </>
      </MyCtx.Provider>
    )
  }
}
