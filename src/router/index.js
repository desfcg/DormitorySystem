import Login from "../Page/Login";
import Main from "../Page/Main";
import Notice from '../component/Notice'
import Dormitory from '../component/Dormitory'
import Student from '../component/Student'
import Announcement from '../component/Announcement'
import Admin from '../component/Admin'

export default[
    {
        path:'/login',
        name:'登录',
        component:Login,
        meta:{isLogin:false},
        role:['Sadmin','Cadmin','Badmin','Student']
    },
    {
        path:'/main',
        name:'主页',
        component:Main,
        redirect:"/main/notice",
        meta:{isLogin:true},
        role:['Sadmin','Cadmin','Badmin','Student'],
        children:[
            {
                path:'/main/notice',
                name:'公告主页',
                component:Notice,
                meta:{isLogin:true},
                role:['Sadmin','Cadmin','Badmin','Student']
            },
            {
                path:'/main/dormitory',
                name:'宿舍管理',
                component:Dormitory,
                meta:{isLogin:true},
                role:['Sadmin','Cadmin','Badmin','Student']
            },
            {
                path:'/main/student',
                name:'学生管理',
                component:Student,
                meta:{isLogin:true},
                role:['Sadmin','Cadmin','Badmin','Student']
            },
            {
                path:'/main/announcement',
                name:'登录',
                component:Announcement,
                meta:{isLogin:true},
                role:['Sadmin','Cadmin','Badmin']
            },
            {
                path:'/main/admin',
                name:'管理员管理',
                component:Admin,
                meta:{isLogin:true},
                role:['Sadmin','Cadmin']
            },
        ]
    },
    {
        path:'/',
        name:'登录2',
        redirect:'/login',
        meta:{
            isLogin:false
        },
        role:['Sadmin','Cadmin','Badmin','Student']
    }
]