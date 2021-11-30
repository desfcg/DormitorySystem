import React, { Component } from 'react'
import { NavLink,withRouter } from 'react-router-dom';
import { Layout, Menu,Avatar,Dropdown ,notification } from 'antd';
import menus from '../router/Menus.js';
import {clearSessionStorage} from '../Session/Session'
import { MyCtx } from '../store/MyContext';
import {
  MehOutlined,
  MacCommandOutlined,
  CopyOutlined,
  UserOutlined,
  NotificationOutlined,
  DownOutlined   
  } from '@ant-design/icons';
import './Main.css'
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const icon={
  MehOutlined:(<MehOutlined/>),
  MacCommandOutlined:(<MacCommandOutlined/>),
  CopyOutlined:(<CopyOutlined/>),
  UserOutlined:(<UserOutlined/>),
  NotificationOutlined:(<NotificationOutlined/>),
}
let tag=[]
 class Main extends Component {
   constructor(){
     super()
     this.state={
        Tag:{
          noticeTag:false,
          dormitoryTag:false,
          studentTag:false,
          announcementTag:false,
          adminTag:false
        }
     }
   }
   componentDidMount(){
    if(this.context.userInfo.stuDormId){
      if(this.context.userInfo.dormType===2){
        // openNotificationWithIcon('warning')
        notification['warning']({
          message: '缴费提醒',
          description:
            '您的寝室水电费余额不足，请尽快缴费!',
            duration: 5,
            placement:'bottomRight',
            bottom:'50px'
        });
      }
      }
     this.setState({
        Tag:tag 
     })
   }

   loginout=()=>{
     //退出登录，清除session
      clearSessionStorage('userInfo')
      //返回登录页
       this.props.history.push('/login')
   }
    render() {
        const users = (
            <Menu>
              <Menu.Item key="1">
                <a  rel="noopener noreferrer" href="#">
                  个人
                </a>
              </Menu.Item>
              {/* <Menu.Item key="2" icon={<DownOutlined />} disabled>
                <a rel="noopener noreferrer" href="#">
                  2nd menu item (disabled)
                </a>
              </Menu.Item>
              <Menu.Item key="3" disabled>
                <a rel="noopener noreferrer" href="#">
                  3rd menu item (disabled)
                </a>
              </Menu.Item> */}
              <Menu.Item key="4" danger onClick={this.loginout}>退出</Menu.Item>
            </Menu>
          )
          
          let type=this.context.userInfo.type
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
          let menuArr=menus[menuType]
          let newArr=menuArr.map((item,i)=>{         
              tag.push(item.tag)
            return <Menu.Item key={i+1} icon={icon[item.icon]}>
            <NavLink to={item.path}>{item.name}</NavLink>
            </Menu.Item>
          })
        return (
<>
  <Layout>
    <Header className="header">
      <div className="logo" >
        <span>宿舍管理系统</span>
      </div>
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu> */}
      <Dropdown overlay={users}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    {this.context.userInfo.name || this.context.userInfo.stuName} <DownOutlined />
    </a>
  </Dropdown>
  <Avatar src="https://joeschmoe.io/api/v1/random" />
    </Header>
    <Layout>
      <Sider width={200}  className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}>
            {/* <Menu.Item key="1" icon={<NotificationOutlined />}>
            <NavLink to="/main/notice">公告主页</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<MacCommandOutlined />}>
            <NavLink to="/main/dormitory">宿舍管理</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<MehOutlined />}>
            <NavLink to="/main/student">学生管理</NavLink> 
            </Menu.Item>
            <Menu.Item key="4" icon={<CopyOutlined />}>
            <NavLink to="/main/announcement">公告管理</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
            <NavLink to="/main/admin">管理员管理</NavLink>
            </Menu.Item> */}
            {newArr}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px',height:'91vh' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="underline">
        </div>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
              {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
</>
        )
    }
}

export default withRouter(Main)
Main.contextType=MyCtx
