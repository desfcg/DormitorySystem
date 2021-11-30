import React, { Component, Fragment } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
} from "antd";
import "./pages.css";
import {Dorm} from "./Search";

export default class Dormitory extends Component {
  constructor() {
    super();
    this.state = {
      dormitory:'',
      addDorm:{
        id:'',
        dormId:'',
        dormName:'',
        balance:''
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
    this.dormAdd()
  }else{
    this.dormUpdate()
  }
    let data = Object.assign({}, this.state.model, { confirmLoading: true });
    let addfrom = Object.assign({}, this.state.addDorm, {id:'', dormId: '',dormName:'',balance:'' });   
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
        addDorm:addfrom
      });
    }, 1000);
  };

  handleCancel = () => {
    let addfrom = Object.assign({}, this.state.addDorm, {id:'', dormId: '',dormName:'',balance:'' });   
    let data = Object.assign({}, this.state.model, { visible: false });
    this.setState({
      model: data,
      addDorm:addfrom
    });
  };
  componentDidMount(){
    this.dormitory()
}
  dormitory=()=>{
    let url=`/api/dorm/getdorm`
    fetch(url,{
        method:'GET'
    }).then(res=>res.json())
    .then((res)=>{
      let data=res.data.map((item,i)=>{
        item.key=item.id
        if(item.type===1){
            item.type="正常"
        }else{
          item.type="催款中"
        }
        return item
      })
        this.setState({
          dormitory:data
        })
    }).catch(err=>{
        console.log(err)
    })
}

Search=(val)=>{
 let data=val
  let url=`/api/dorm/getsingledorm?dormName=${data}`
  fetch(url,{
      method:'GET'
  }).then(res=>res.json())
  .then((res)=>{
    let data=res.data.map((item,i)=>{
      item.key=item.id
      return item
    })
      this.setState({
        dormitory:data
      })
  }).catch(err=>{
      console.log(err)
  })
}

handleInputChange=(event)=>{
  let name=event.target.name
  let value=event.target.value
  let data = Object.assign({}, this.state.addDorm, { [name]: value });
  this.setState({
    addDorm:data
  })
}
dormAdd=()=>{
          let data={dormId:this.state.addDorm.dormId,
            dormName:this.state.addDorm.dormName,
            balance:this.state.addDorm.balance
            }
        let url=`/api/dorm/adddorm`
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
         this.dormitory()         
        },500)
}

updateDorm=(key,val)=>{
  let {dormId,dormName,balance,id}=key
  let updatefrom = Object.assign({}, this.state.addDorm, { dormId: dormId,dormName:dormName,balance:balance ,id:id});   
  this.showModal(val)
  this.setState({
    addDorm:updatefrom
  })

}
dormUpdate=()=>{
  let data={
    id:this.state.addDorm.id,
    dormId:this.state.addDorm.dormId,
    dormName:this.state.addDorm.dormName,
    balance:this.state.addDorm.balance
    }
let url=`/api/dorm/updatedorm`
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
this.dormitory()
},500)
}
deldorm=(key)=>{
  let data={id:key.id}  
  let url=`/api/dorm/deldorm`
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
    this.dormitory()
    },500)
}

deptdorm=(key)=>{
  let type
  if(key.type==="催款中"){
    type=1
  }else{
    type=2
  }
  let data={
    id:key.id,
    type:type
  }  
  let url=`/api/dorm/deptdorm`
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
    this.dormitory()
    },500)
}
  render() {
    const columns = [
      {
        key:'id',
        title: "宿舍编号",
        dataIndex: "dormId",
        align: 'center'
      },
      {
        title: "宿舍名称",
        dataIndex: "dormName",
        align: 'center'
      },
      {
        title: "宿舍水电费余额",
        dataIndex: "balance",
        align: 'center'
      },
      {
        title: "宿舍状态",
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
              <Button type="primary" size="middle" onClick={()=>{this.updateDorm(record,"update")}}>
                修改
              </Button>
              <Popconfirm
                title="确定修改宿舍状态吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  // let data = [...this.state.data];
                  // data.splice(0, 1);
                  // this.setState({
                  //   data: data,
                  // });
                  this.deptdorm(record)
                }}
              >
                <Button type="primary" size="middle" onClick={() => {}}>
                {record.type==="正常"?"发起催款申请":"修改为正常状态"}
                </Button>
              </Popconfirm>
              <Popconfirm
                title="确定删除吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  this.deldorm(record)
                }}
              >
                <Button type="primary" danger size="middle" onClick={() => {}}>
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
        <Dorm showModal={this.showModal} Search={this.Search} dormitory={this.dormitory}></Dorm>
        <div>
          <Table columns={columns} dataSource={this.state.dormitory} size="middle" />
        </div>
        <Modal
          width="500px"
          title={this.state.isfrom==='add'?'添加宿舍':'修改宿舍信息'}
          okText="确定"
          cancelText="取消"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
          
        >
          <div>
          <span className="bel" >宿舍编号</span><Input type="number" name="dormId" className="addFrom" value={this.state.addDorm.dormId}  placeholder="仅支持数值类型" onChange={this.handleInputChange}/>
          </div>
           <div>
           <span className="bel" >宿舍名称</span><Input name="dormName" className="addFrom" value={this.state.addDorm.dormName} placeholder="宿舍名称" onChange={this.handleInputChange}/>
             </div>         
               <div>
               <span className="bel" >水电费余额</span><Input type="number" name="balance" className="addFrom" value={this.state.addDorm.balance} placeholder="仅支持数值类型" onChange={this.handleInputChange}/>                 
                 </div>     

        </Modal>

      </Fragment>
    );
  }
}
