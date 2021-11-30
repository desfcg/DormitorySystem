import React, { Component } from 'react'
import { List} from 'antd';
import '../Page/Main.css'

export default class Notice extends Component {
    constructor(){
        super()
        this.state={
            notice:''
        }
    }
      componentDidMount(){
        this.notice()
  }
      notice=()=>{
        let url=`/api/notice/getnotice`
        fetch(url,{
            method:'GET'
        }).then(res=>res.json())
        .then((res)=>{
            this.setState({
                notice:res.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <>
            <div className="tit">
               <span>公告</span> 
                </div>
            <List
            itemLayout="horizontal"
            dataSource={this.state.notice}
            renderItem={item => (
              <List.Item>
                  
                <List.Item.Meta
                  title={<p>{item.title}</p>}
                  description={item.content}
                />
                <div>{item.mytime}</div>
              </List.Item>
            )}
          />
          </>
        )
    }
}
