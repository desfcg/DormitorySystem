import React, { Component,Fragment } from 'react'
import {
    Input,
    Button,
    Modal
  } from "antd";
  import "./pages.css";

export class Dorm extends Component {
  constructor(props){
    super(props)
    this.state={
      search:''
    }
  }

  handleInputChange=(event)=>{
    let name=event.target.name
    let value=event.target.value
    this.setState({
      [name]:value
    })
  }

  search=()=>{
    let data=this.state.search
    this.props.Search(data)
    this.setState({
      search:''
    })
  }

  reset=()=>{
    this.props.dormitory()
  }
    render() {
        return (
            <Fragment>
            <Input name="search" className="put" value={this.state.search} placeholder="宿舍名称" onChange={this.handleInputChange}/>
            <Button className="btn" type="primary" onClick={this.search}>
              搜索
            </Button>
            <Button className="btn" type="primary" htmlType="button" onClick={this.reset}> 
              重置
            </Button>
            <Button
              className="btn"
              type="primary"
              ghost
              onClick={()=>{this.props.showModal("add")}}
            >
              添加宿舍
            </Button>

            </Fragment>
        )
    }
}

export class Stu extends Component {
  constructor(props){
    super(props)
    this.state={
      student:'',
      model: {
        visible: false,
        confirmLoading: false,
      },
    }
  }

  handleInputChange=(event)=>{
    let name=event.target.name
    let value=event.target.value
    this.setState({
      [name]:value
    })
  }

  search=()=>{
    let data=this.state.student
    this.props.Search(data)
    this.setState({
      student:'',
    })
  }
addStun=()=>{
  this.props.dorm()
  this.props.showModal("add")
}
  reset=()=>{
    this.props.student()
  }
    render() {
        return (
            <Fragment>
            <Input name="student" className="put" value={this.state.student} placeholder="学生姓名" onChange={this.handleInputChange}/>
            <Button className="btn" type="primary" onClick={this.search}>
              搜索
            </Button>
            <Button className="btn" type="primary" htmlType="button" onClick={this.reset}> 
              重置
            </Button>
            <Button
              className="btn"
              type="primary"
              ghost
              onClick={()=>{this.addStun('add')}}
            >
              添加学生
            </Button>

            <Modal
          width="500px"
          title="添加宿舍"
          okText="确定"
          cancelText="取消"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
        >
        </Modal>
            </Fragment>
        )
    }
}

export class Notice extends Component {
  constructor(props){
    super(props)
    this.state={
      notice:'',
      model: {
        visible: false,
        confirmLoading: false,
      },
    }
  }

  handleInputChange=(event)=>{
    let name=event.target.name
    let value=event.target.value
    this.setState({
      [name]:value
    })
  }
  search=()=>{
    let data=this.state.notice
    this.props.Search(data)
    this.setState({
      notice:'',
    })
  }
  addNot=()=>{
  this.props.showModal("add")
  this.props.Nadd()
}
  reset=()=>{
    this.props.notice()
  }
    render() {
        return (
            <Fragment>
            <Input name="notice" className="put" value={this.state.notice} placeholder="请输入公告标题" onChange={this.handleInputChange}/>
            <Button className="btn" type="primary" onClick={this.search}>
              搜索
            </Button>
            <Button className="btn" type="primary" htmlType="button" onClick={this.reset}> 
              重置
            </Button>
            <Button
              className="btn"
              type="primary"
              ghost
              onClick={()=>{this.addNot()}}
            >
              发布公告
            </Button>
            <Modal
          width="500px"
          title="添加宿舍"
          okText="确定"
          cancelText="取消"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
        >
        </Modal>
            </Fragment>
        )
    }
}

export class Adm extends Component {
  constructor(props){
    super(props)
    this.state={
      admin:'',
      model: {
        visible: false,
        confirmLoading: false,
      },
    }
  }

  handleInputChange=(event)=>{
    let name=event.target.name
    let value=event.target.value
    this.setState({
      [name]:value
    })
  }
  search=()=>{
    let data=this.state.admin
    this.props.Search(data)
    this.setState({
      admin:'',
    })
  }
  addNot=()=>{
  this.props.showModal("add")
}
  reset=()=>{
    this.props.admin()
  }
    render() {
        return (
            <Fragment>
            <Input name="admin" className="put" value={this.state.admin} placeholder="请输入管理员名称" onChange={this.handleInputChange}/>
            <Button className="btn" type="primary" onClick={this.search}>
              搜索
            </Button>
            <Button className="btn" type="primary" htmlType="button" onClick={this.reset}> 
              重置
            </Button>
            <Button
              className="btn"
              type="primary"
              ghost
              onClick={()=>{this.addNot()}}
            >
              添加管理员
            </Button>
            <Modal
          width="500px"
          title="添加宿舍"
          okText="确定"
          cancelText="取消"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
        >
        </Modal>
            </Fragment>
        )
    }
}