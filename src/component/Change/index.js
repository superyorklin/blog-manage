import React from 'react';
import Fetch from '../../utils/fetch';
import {message,Table,Button,Popconfirm} from 'antd';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import ChechCommentModal from './model';

@observer
export default class Change extends React.Component{
  
  @observable resArr = [];
  @action changeReaArr = (newArr) => {
    this.resArr = newArr
  }

  componentDidMount(){
    this._getData();
  }

  _getData = () => {
    Fetch.get('/allArtical').then(res => {
      this.changeReaArr(res.data)
    }).catch(err => {
      message.error(err);
    })
  }

  deleteArtical = (id) => {
    Fetch.post('/deleteArtical',{articalId: id}).then(res => {
      if(res.Success){
        this._getData();
        message.success('删除成功');
      }
    }).catch(err => {
      message.error(err);
    })
  }

  checkComment = (id) => {
    Fetch.get('/comment',{articalId: id}).then(res => {
      this.refs.model.showModal(res);
    }).catch(err => {
      message.error(err);
    })
  }

  render(){
    const columns = [{
      title: '文章标题',
      dataIndex: 'title',
      key: 'title'
    },{
      title: '上传时间',
      dataIndex: 'time',
      key: 'time'
    },{
      title: '文章访问数',
      dataIndex: 'visit',
      key: 'visit'
    },{
      title: '评论数',
      dataIndex: 'comment',
      key: 'comment'
    },{
      title: '标签',
      dataIndex: 'tag',
      key: 'tag',
      render: (tags) => {
        let i = '';
        tags.forEach((tag) => {
          i += `${tag};`
        })
        return i;
      }
    },{
      title: '操作',
      key: 'operate',
      render: (data) => {
        return (
          <div>
            <Popconfirm title='是否删除这篇文章?' onConfirm={() => this.deleteArtical(data.articalId)}>
              <Button type='danger'>删除文章</Button>
            </Popconfirm>
            <Button>修改文章</Button>
            <Button onClick={()=>this.checkComment(data.articalId)}>查看评论</Button>
          </div>
        )
      }
    }];
    return (
      <div>
        <Table columns={columns} dataSource={this.resArr}/>
        <ChechCommentModal ref='model' />
      </div>
    )
  }
}