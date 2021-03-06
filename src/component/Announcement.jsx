import React, { Component, Fragment } from "react";
import { MyCtx } from "../store/MyContext";
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
import {Notice} from "./Search";

export default class Announcement extends Component {
  constructor() {
    super();
    this.state = {
      notice:'',
      addNotice:{
        id:'',
        title:'',
        content:'',
        time:'',
        name:'',
        userId:''
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
    this.noticeAdd()
  }else{
    this.noticeUpdate()
  }
    let data = Object.assign({}, this.state.model, { confirmLoading: true });
    let addfrom = Object.assign({}, this.state.addNotice, {id:'', userId: '',title:'',content:'',time:'',name:'' });   
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
        addNotice:addfrom,
        isfrom:''
      });
    }, 1000);

  };

  handleCancel = () => {
    let addfrom = Object.assign({}, this.state.addNotice, {id:'', userId: '',title:'',content:'',time:'',name:'' });   
    let data = Object.assign({}, this.state.model, { visible: false });

    this.setState({
      model: data,
      addNotice:addfrom,
      isfrom:''
    });

  };
  componentDidMount(){
    this.notice()
}
notice=()=>{
    let url=`/api/notice/getnotice`
    fetch(url,{
        method:'GET'
    }).then(res=>res.json())
    .then((res)=>{
      let data=res.data.map((item,i)=>{
        item.key=item.id
        return item
      })
        this.setState({
          notice:data
        })
    }).catch(err=>{
        console.log(err)
    })
}

Search=(val)=>{
 let data=val
  let url=`/api/notice/getsinglenotice?title=${data}`
  fetch(url,{
      method:'GET'
  }).then(res=>res.json())
  .then((res)=>{
    let data=res.data.map((item,i)=>{
      item.key=item.id
      return item
    })
      this.setState({
        notice:data
      })
  }).catch(err=>{
      console.log(err)
  })
}

handleInputChange=(event)=>{
  let name=event.target.name
  let value=event.target.value
  let data = Object.assign({}, this.state.addNotice, { [name]: value });
  this.setState({
    addNotice:data
  })
  console.log(this.state.addNotice.content)
}
Nadd=()=>{
 let userId=this.context.userInfo.id
 let data = Object.assign({}, this.state.addNotice, { userId: userId });
 this.setState({
    addNotice:data
})
}
noticeAdd=()=>{       
          let data={title:this.state.addNotice.title,
            content:this.state.addNotice.content,
            userId:this.state.addNotice.userId
            }
        let url=`/api/notice/addnotice`
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
        this.notice()
        setTimeout(()=>{
          this.notice()
        },500)
}

updateNot=(key,val)=>{
  let {id,title,content,mytime,name,userId}=key
  let updatefrom = Object.assign({}, this.state.addNotice, { id:id,title:title,content:content,time:mytime,name:name,userId:userId});   
  this.showModal(val)
  this.setState({
    addNotice:updatefrom
  })
}
noticeUpdate=()=>{
  let data={
    id:this.state.addNotice.id,
    title:this.state.addNotice.title,
    content:this.state.addNotice.content,
    }
let url=`/api/notice/updatenotice`
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
  this.notice()
  },500)
}

delNot=(key)=>{
  let data={id:key.id}  
  let url=`/api/notice/delnotice`
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
    this.notice()
    },500)
  
}
  render() {
    const columns = [
      {
        title: "????????????",
        dataIndex: "id",
        align: 'center'
      },
      {
        title: "????????????",
        dataIndex: "title",
        align: 'center'
      },
      {
        title: "????????????",
        dataIndex: "content",
        align: 'center'
      },
      {
        title: "????????????",
        dataIndex: "mytime",
        align: 'center'
      },
      {
        title: "?????????",
        dataIndex: "name",
        align: 'center'
      },
      {
        title: "??????",
        dataIndex: "caozuo",
        align: 'center',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" size="middle" onClick={()=>{this.updateNot(record,"update")}}>
                ??????
              </Button>
              <Popconfirm
                title="????????????????"
                okText="??????"
                cancelText="??????"
                onConfirm={() => {
                  this.delNot(record)
                }}
              >
                <Button type="primary" danger size="middle">
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
        <Notice showModal={this.showModal} Search={this.Search} notice={this.notice} Nadd={this.Nadd}></Notice>

        <div>
          <Table pagination="bottomLeft" pagination={{defaultPageSize:5}} columns={columns} dataSource={this.state.notice} size="middle" />
        </div>
        <Modal
          width="500px"
          title={this.state.isfrom==='add'?'????????????':'??????????????????'}
          okText="??????"
          cancelText="??????"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
          
        >
          <div>
           <span className="bel" style={{display:this.state.isfrom==='update'?'block':'none'}}>????????????</span><Input style={{display:this.state.isfrom==='update'?'block':'none'}} disabled name="id" className="addFrom" value={this.state.addNotice.id}  onChange={this.handleInputChange}/>
             </div> 
           <div>
           <span className="bel" >????????????</span><Input name="title" className="addFrom" value={this.state.addNotice.title} placeholder="????????????" onChange={this.handleInputChange}/>
             </div>         
               <div>
               <span  className="bel" >????????????</span>
               <Input.TextArea  rows="5" name="content" className="addFrom" value={this.state.addNotice.content} placeholder="?????????????????????" onChange={this.handleInputChange}/>                 
                 </div>  
                 <div>
           <span className="bel" style={{display:this.state.isfrom==='update'?'block':'none'}}>????????????</span><Input style={{display:this.state.isfrom==='update'?'block':'none'}} disabled name="time" className="addFrom" value={this.state.addNotice.time}  onChange={this.handleInputChange}/>
             </div> 
             <div>
           <span className="bel" style={{display:this.state.isfrom==='update'?'block':'none'}}>?????????</span><Input style={{display:this.state.isfrom==='update'?'block':'none'}} disabled name="name" className="addFrom" value={this.state.addNotice.name}  onChange={this.handleInputChange}/>
             </div>    
        </Modal>

      </Fragment>
    );
  }
}

Announcement.contextType=MyCtx