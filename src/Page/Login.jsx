import React, { Component,Fragment } from 'react'
import { Input, Space, Button,Radio ,message} from 'antd';
import './login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { MyCtx } from '../store/MyContext';
import { setSessionStorage } from '../Session/Session';
import ParticlesBg from 'particles-bg';

export default class Login extends Component {
  constructor(){
    super()
    this.state={
      userInfo:'',
      account:'',
      password:'',
      identity:'学生',
    }
  }
  handleInputChange=(event)=>{
    let name=event.target.name
    let value=event.target.value
    this.setState({
      [name]:value
    })
  }
  login=()=>{
    if(this.state.account===''){
        message.warning('帐号不能为空！')
        return
    }else if(this.state.password===''){
      message.warning('密码不能为空！')
      return
  }

this.userLogin()
    //设置session
    setTimeout(()=>{
      let userInfo=this.state.userInfo      
      setSessionStorage('userInfo',userInfo)
      //将登录信息存入mobx
      this.context.setUserInfo(userInfo)
      //登陆成功跳转到主页
      this.props.history.push('/main')
    },1000)
  }

  userLogin=()=>{
    let username=this.state.account
    let password=this.state.password
    let type=this.state.identity
    let url=`/api/login/getuser?username=${username}&&password=${password}&&type=${type}`
    fetch(url,{
      method:'GET',
    }).then(res=>res.json()).then(
      (res)=>{
        if(res.data.length===0){
          message.error('帐号或密码错误！')
          return 'error'
        }
        this.setState({
          userInfo:res.data[0]
      })
      message.success('登录成功！')        
      }
    ).catch(err=>{
      console.log(err)
    })
}
    render() {
//npm install --save particles-bg 动态粒子背景
        return (
            <Fragment >
              <ParticlesBg type="cobweb" bg={true} />
              {/* <div className="background-img"> */}
                <div className="login">
                  <h2 className="title">宿舍管理系统</h2>
                <Input prefix={<UserOutlined />} name="account" className="put-txt"  placeholder="帐号" onChange={this.handleInputChange}/>
                <Space direction="vertical">
                    <Input.Password prefix={<LockOutlined />} name="password" className="put-pwd"  placeholder="密码" onChange={this.handleInputChange}/>
                </Space>
                <Radio.Group  name="identity" onChange={this.handleInputChange} value={this.state.identity}>
                <Radio className="radios" value="学生">学生</Radio>
                <Radio className="radios" value="管理员">管理员</Radio>
                </Radio.Group>
                <div className="btn">
                 <Button className="btn-log" type="primary" onClick={this.login}>登录</Button>                   
                </div>                
             {/* </div> */}

{/* <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '帐号不能为空!',
          },
        ]}
      >
        <Input  prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="帐号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '密码不能为空!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> *

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.login}>
          登录
        </Button>
      </Form.Item>
    </Form> */}       
                </div>
            </Fragment>
        )
    }
}

Login.contextType=MyCtx 