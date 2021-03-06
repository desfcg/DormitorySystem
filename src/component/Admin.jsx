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
        item.type=item.type===1?'???????????????':item.type===2?'???????????????':'???????????????'
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
      item.type=item.type===1?'???????????????':'???????????????'
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
          if(this.state.addAdmin.type==='???????????????'){
            type=2
          }else if(this.state.addAdmin.type==='???????????????'){
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
            body:JSON.stringify(data),  //?????????????????????
            headers:{
                'Content-Type': 'application/json' //???????????????
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
  if(this.state.addAdmin.type==='???????????????'){
    type=2
  }else if(this.state.addAdmin.type==='???????????????'){
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
    body:JSON.stringify(data),  //?????????????????????
    headers:{
        'Content-Type': 'application/json' //???????????????
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
      body:JSON.stringify(data),  //?????????????????????
      headers:{
          'Content-Type': 'application/json' //???????????????
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
        title: "??????",
        dataIndex: "id",
        align: 'center'
      },
      {
        title: "??????",
        dataIndex: "name",
        align: 'center'
      },
      {
        title: "??????",
        dataIndex: "userId",
        align: 'center'
      },
      {
        title: "??????",
        dataIndex: "type",
        align: 'center'
      },
      {
        title: "??????",
        dataIndex: "caozuo",
        align: 'center',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" size="middle" onClick={()=>{
                if(record.type==='???????????????'){
                  message.warning('??????????????????????????????');
                  return
                }
                  this.updateAdm(record,"update")                
              }}>
                ??????
              </Button>
              <Popconfirm
                disabled={record.type==='???????????????'?true:false}
                title="????????????????"
                okText="??????"
                cancelText="??????"
                onConfirm={() => {
                  if(record.type==='???????????????'){
                    message.warning('??????????????????????????????');
                    return
                  }
                  this.delAdmin(record)
                }}
              >
                <Button type="primary" danger size="middle" onClick={()=>{
                      if(record.type==='???????????????'){
                        message.warning('??????????????????????????????');
                        return
                      }
                }}>
                  ??????
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
          <Table pagination={{defaultPageSize:5}} columns={columns} dataSource={this.state.admin} size="middle" />
        </div>
        <Modal
          width="500px"
          title={this.state.isfrom==='add'?'???????????????':'?????????????????????'}
          okText="??????"
          cancelText="??????"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
          
        >
          <div>
           <span className="bel" style={{display:this.state.isfrom==='update'?'block':'none'}}>??????</span><Input style={{display:this.state.isfrom==='update'?'block':'none'}} disabled name="id" className="addFrom" value={this.state.addAdmin.id} placeholder="??????" onChange={this.handleInputChange}/>
          </div> 
          <div>
           <span className="bel" >??????</span><Input name="name" className="addFrom" value={this.state.addAdmin.name} placeholder="??????" onChange={this.handleInputChange}/>
             </div> 
           <div>
           <span className="bel" >??????</span><Input disabled={this.state.isfrom==='update'?true:false} name="userId" className="addFrom" value={this.state.addAdmin.userId} placeholder="??????" onChange={this.handleInputChange}/>
             </div>          
                 <div>
           <span className="bel" >??????</span><Input name="password" className="addFrom" value={this.state.addAdmin.password} placeholder="??????" onChange={this.handleInputChange}/>
             </div> 
             <div>
           <span className="bel" >??????</span>
           <Select
            // defaultValue={this.state.addStu.stuDormId}
              className="addFrom"
              placeholder="????????????????????????"
              onChange={(val) => {
                this.getValue(val);
              }}
              allowClear
            >
                  <Option key='1' value='???????????????'>
                    ???????????????
                  </Option>
                  <Option key='2' value='???????????????'>
                    ???????????????
                  </Option>
            </Select>
             </div> 

        </Modal>

      </Fragment>
    );
  }
}
