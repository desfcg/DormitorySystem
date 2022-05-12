//设置session
function setSessionStorage(userInfo,value){
    let val=JSON.stringify(value)
  return  sessionStorage.setItem(userInfo,val)
}
//获取session
function getSessionStorage(userInfo){
  return JSON.parse(sessionStorage.getItem(userInfo)) 
}
//删除session
function clearSessionStorage(userInfo){
  return  sessionStorage.removeItem(userInfo)
}

export {setSessionStorage,getSessionStorage,clearSessionStorage}