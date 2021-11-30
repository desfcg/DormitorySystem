import {makeAutoObservable} from 'mobx'
import {getSessionStorage} from '../Session/Session'

class MobxStore{
    constructor(){
        makeAutoObservable(this)
    }
 userInfo=getSessionStorage('userInfo') || {}

setUserInfo(value){
    this.userInfo=value
}

}

let myStore=new MobxStore()
export default myStore