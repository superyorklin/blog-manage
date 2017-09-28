import React from 'react';
import {Modal,Table,message} from 'antd';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import Fetch from '../../utils/fetch';

@observer
export default class CheckCommentModal extends React.Component{

  @observable visible = false;
  @observable data = [];
  @action changeVisible = (val) => {
    this.visible = val;
  }
  @action changeData = (val) => {
    this.data = val;
  }
  showModal = (data) => {
    this.changeVisible(true);
    this.changeData(data);
  }
  hideModal = () => {
    this.changeVisible(false);
    this.changeData([]);
  }

  deleteComment = (id) => {
    Fetch.post('/deleteComment',{commentId: id}).then(res => {
      if(res.Success){
        message.success('删除成功');
        this.hideModal();
      }
    }).catch(err => {
      message.error(err);
    })
  }

  render(){

    const columns = [{
      title: '内容',
      dataIndex: 'content',
      key: 'content'
    },{
      title: '评论者',
      dataIndex: 'author',
      key: 'author'
    },{
      title: '操作',
      key: 'operate',
      render: (data) => {
        return <a onClick={() => this.deleteComment(data.commentId)}>删除</a>
      }
    }]

    return (
      <Modal visible={this.visible} title='全部评论' footer={null} onCancel={this.hideModal}>
        <Table columns={columns} dataSource={this.data} /> 
      </Modal>
    )
  }
}