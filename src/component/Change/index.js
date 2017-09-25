import React from 'react';
import Fetch from '../../utils/fetch';
import {message,Select} from 'antd';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
const Option = Select.Option;

@observer
export default class Change extends React.Component{
  
  @observable resArr = [];
  @action changeReaArr = (newArr) => {
    this.resArr = newArr
  }
  @observable select = [];
  @action changeSel = (newSel) => {
    this.select = newSel
  }

  componentDidMount(){
    Fetch.get('/allArtical').then(res => {
      this.changeReaArr(res.data)
    }).catch(err => {
      message.error(err);
    })
  }

  selectArtical = (value) => {
    console.log(value)
  }

  render(){
    let options = [];
    this.resArr.forEach(item => {
      options.push(<Option key={item.articalId} value={item.articalId}>{item.title}</Option>)
    });
    return (
      <div>
        <Select style={{width: '70%'}} placeholder='选择需要修改的文章' onSelect={this.selectArtical}>
          {options}
        </Select>
        
      </div>
    )
  }
}