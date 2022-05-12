//在前端解决跨域问题
// const {createProxyMiddleware}=require('http-proxy-middleware')

// module.exports= function (app){
//     app.use(createProxyMiddleware('/api',{
//      target:'http://localhost:3001/',  
//      changeOrigin:true,
//      pathRewrite:{
//          '^/api':''
//      }           
//     }))
   
// }

const  {createProxyMiddleware}  = require('http-proxy-middleware')
module.exports = function (app) {
app.use( createProxyMiddleware( '/api' ,{
target: ' http://localhost:3005/',
// target: ' http://myweb.server.jfpw.xyz/',
changeorigin:true,
pathRewrite:{
'^/api' : ''
}
}))
}
