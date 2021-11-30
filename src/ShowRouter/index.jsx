import React,{Component} from "react";
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import router from "../router/index";
import { MyCtx } from "../store/MyContext";
import { Observer } from "mobx-react";

export default class ShowRouter extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    util=(val)=>{
        let routerList=val.map((item,i)=>{
            if(item.meta.isLogin){
                //验证是否需要登录
                if(this.context.userInfo.name || this.context.userInfo.stuName){
                    let type= this.context.userInfo.type
                    let menuType
                    if(type===1){
                      menuType='Sadmin'
                    }else if(type===2){
                        menuType='Cadmin'
                    }else if(type===3){
                        menuType='Badmin'
                    }else{
                      menuType='Student'
                    }
                    let role=item.role
                    if(role.includes(menuType)){
                    //    return (<Route path={item.path} component={item.component}/>) 
                        if(item.children){
                        return (
                            <Route key={item.name} path={item.path} render={()=>
                                <item.component>
                                    {this.util(item.children)}
                                    <Route key={item.name} path={item.path} exact component={()=><Redirect to={item.redirect}/>}></Route>
                                </item.component>
                            }></Route>
                        )
                        }else{
                            return (<Route key={item.name} path={item.path} exact component={item.component}/>)
                        }
                        

                    }else{
                        return (<Route key={item.name} path={item.path}  component={()=>(<Redirect to={'/login'}/>)}></Route>)
                    }
                }else{
                    return (<Redirect key={item.name} to={'/login'}></Redirect>)
                }
            }else{
                if(item.redirect){
                    return (<Route key={item.name} exact path={item.path} component={()=><Redirect to={item.redirect}/>}></Route>)
                }else{
                    return (<Route key={item.name} path={item.path} component={item.component}></Route>)
                }
            }
        })
        return routerList
    }
    render() {
        return (
            <Observer>
                {
                    ()=>(
                        <BrowserRouter>
                            <Switch>
                                {this.util(router)}
                            </Switch>
                        </BrowserRouter>
                    )
                }
            </Observer>
        )
    }
}
ShowRouter.contextType=MyCtx