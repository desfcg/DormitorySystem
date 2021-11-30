import React, { Component, Fragment } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
  Select,
} from "antd";
import "./pages.css";
import {Adm} from "./Search";
const {Option}=Select

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      admin:'',
      addAdmin:{
        id:'',
        name:'',
        userId:'',
        password:'',
        type:'',
      },
      model: {
        visible: false,
        confirmLoading: false,
      },
      isfrom:''
    };
  }

  showModal = (val) => {
    let data = Object.assign({}, this.state.model, { visible: true });
    this.setState({
      model: data,
      isfrom:val
    });
  };

  handleOk = () => {
  let isfrom=this.state.isfrom
  if(isfrom==="add"){
    this.adminAdd()
  }else{
    this.adminUpdate()
  }
    let data = Object.assign({}, this.state.model, { confirmLoading: true });
    let addfrom = Object.assign({}, this.state.addAdmin, {
      id: "",
      name: "",
      userId: "",
      password: "",
      type: "",
    });
    this.setState({
      model: data,
    });

    setTimeout(() => {
      let data = Object.assign({}, this.state.model, {
        visible: false,
        confirmLoading: false,
      });
      this.setState({
        model: data,
        addAdmin:addfrom,
        isfrom:''
      });
    }, 1000);
  };

  handleCancel = () => {
    let addfrom = Object.assign({}, this.state.addAdmin, {
      id: "",
      name: "",
      userId: "",
      password: "",
      type: "",
    });
    let data = Object.assign({}, this.state.model, { visible: false });

    this.setState({
      model: data,
      addAdmin:addfrom,
      isfrom:''
    });
  };
  componentDidMount(){
    this.admin()
}

getValue = (e) => {
  let data = Object.assign({}, this.state.addAdmin, { type: e });
  this.setState({
    addAdmin: data,
  });
};
admin=()=>{
    let url=`/api/admin/getadmin`
    fetch(url,{
        method:'GET'
    }).then(res=>res.json())
    .then((res)=>{
      let data=res.data.map((item,i)=>{
        item.key=item.id
        item.type=item.type===1?'超级管理员':item.type===2?'高级管理员':'普通管理员'
        return item
      })
        this.setState({
          admin:data
        })
    }).catch(err=>{
        console.log(err)
    })
}

Search=(val)=>{
 let data=val
  let url=`/api/admin/getsingleadmin?name=${data}`
  fetch(url,{
      method:'GET'
  }).then(res=>res.json())
  .then((res)=>{
    let data=res.data.map((item,i)=>{
      item.key=item.id
      item.type=item.type===1?'超级管理员':'普通管理员'
      return item
    })
      this.setState({
        admin:data
      })
  }).catch(err=>{
      console.log(err)
  })
}

handleInputChange=(event)=>{
  let name=event.target.name
  let value=event.target.value
  let data = Object.assign({}, this.state.addAdmin, { [name]: value });
  this.setState({
    addAdmin:data
  })
}
adminAdd=()=>{       
          let type
          if(this.state.addAdmin.type==='高级管理员'){
            type=2
          }else if(this.state.addAdmin.type==='普通管理员'){
            type=3
          }
          let data={
            name:this.state.addAdmin.name,
            userId:this.state.addAdmin.userId,
            password:this.state.addAdmin.password,
            type,
            }
        let url=`/api/admin/addadmin`
        fetch(url,{
            method:'POST',
            body:JSON.stringify(data),  //转为数组字符串
            headers:{
                'Content-Type': 'application/json' //设置相应头
            }
        }).then(res=>res.json())
        .then((res)=>{
          message.success(res.msg);
        }).catch(err=>{
            console.log(err)
        })
        setTimeout(()=>{
          this.admin()
        },500)
}

updateAdm=(key,val)=>{
  let {id,name,userId,password,type}=key
  let updatefrom = Object.assign({}, this.state.addAdmin, { id:id,password:password,type:type,name:name,userId:userId});   
  this.showModal(val)
  this.setState({
    addAdmin:updatefrom
  })

}
adminUpdate=()=>{
  let type
  if(this.state.addAdmin.type==='高级管理员'){
    type=2
  }else if(this.state.addAdmin.type==='普通管理员'){
    type=3
  }
  let data={
    id:this.state.addAdmin.id,
    name:this.state.addAdmin.name,
    password:this.state.addAdmin.password,
    type,
    }
let url=`/api/admin/updateadmin`
fetch(url,{
    method:'POST',
    body:JSON.stringify(data),  //转为数组字符串
    headers:{
        'Content-Type': 'application/json' //设置相应头
    }
}).then(res=>res.json())
.then((res)=>{
  message.success(res.msg);
}).catch(err=>{
    console.log(err)
})
setTimeout(()=>{
this.admin()
},500)

}
delAdmin=(key)=>{
  let data={id:key.id}  
  let url=`/api/admin/deladmin`
  fetch(url,{
      method:'POST',
      body:JSON.stringify(data),  //转为数组字符串
      headers:{
          'Content-Type': 'application/json' //设置相应头
      }
  }).then(res=>res.json())
  .then((res)=>{
    message.success(res.msg);
  }).catch(err=>{
      console.log(err)
  })
  setTimeout(()=>{
    this.admin()
    },500)
}

  render() {
    const columns = [
      {
        title: "编号",
        dataIndex: "id",
        align: 'center'
      },
      {
        title: "姓名",
        dataIndex: "name",
        align: 'center'
      },
      {
        title: "帐号",
        dataIndex: "userId",
        align: 'center'
      },
      {
        title: "类型",
        dataIndex: "type",
        align: 'center'
      },
      {
        title: "操作",
        dataIndex: "caozuo",
        align: 'center',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" size="middle" onClick={()=>{
                if(record.type==='超级管理员'){
                  message.warning('你无权限修改此管理员');
                  return
                }
                  this.updateAdm(record,"update")                
              }}>
                修改
              </Button>
              <Popconfirm
                disabled={record.type==='超级管理员'?true:false}
                title="确定删除吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  if(record.type==='超级管理员'){
                    message.warning('你无权限删除此管理员');
                    return
                  }
                  this.delAdmin(record)
                }}
              >
                <Button type="primary" danger size="middle" onClick={()=>{
                      if(record.type==='超级管理员'){
                        message.warning('你无权限删除此管理员');
                        return
                      }
                }}>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
    return (
      <Fragment>
        <Adm showModal={this.showModal} Search={this.Search} admin={this.admin} ></Adm>
        <div>
          <Table columns={columns} dataSource={this.state.admin} size="middle" />
        </div>
        <Modal
          width="500px"
          title={this.state.isfrom==='add'?'添加管理员':'修改管理员信息'}
          okText="确定"
          cancelText="取消"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
          
        >
          <div>
           <span className="bel" style={{display:this.state.isfrom==='update'?'block':'none'}}>编号</span><Input style={{display:this.state.isfrom==='update'?'block':'none'}} disabled name="id" className="addFrom" value={this.state.addAdmin.id} placeholder="编号" onChange={this.handleInputChange}/>
          </div> 
          <div>
           <span className="bel" >名称</span><Input name="name" className="addFrom" value={this.state.addAdmin.name} placeholder="名称" onChange={this.handleInputChange}/>
             </div> 
           <div>
           <span className="bel" >帐号</span><Input disabled={this.state.isfrom==='update'?true:false} name="userId" className="addFrom" value={this.state.addAdmin.userId} placeholder="帐号" onChange={this.handleInputChange}/>
             </div>          
                 <div>
           <span className="bel" >密码</span><Input name="password" className="addFrom" value={this.state.addAdmin.password} placeholder="密码" onChange={this.handleInputChange}/>
             </div> 
             <div>
           <span className="bel" >类型</span>
           <Select
            // defaultValue={this.state.addStu.stuDormId}
              className="addFrom"
              placeholder="请选择管理员类型"
              onChange={(val) => {
                this.getValue(val);
              }}
              allowClear
            >
                  <Option key='1' value='普通管理员'>
                    普通管理员
                  </Option>
                  <Option key='2' value='高级管理员'>
                    高级管理员
                  </Option>
            </Select>
             </div> 

        </Modal>

      </Fragment>
    );
  }
}
