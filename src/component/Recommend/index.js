import React from 'react';
import {Form,Input,Button,message} from 'antd';
import Fetch from '../../utils/fetch';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class Recommend extends React.Component{
  render(){
    return(
      <div>
        <h2>推荐文章添加</h2>
        <WRecommendForm />
      </div>
    )
  }
}
class RecommendForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Fetch.post('/recommend',values).then(res => {
          if(res.Success){
            message.info('添加成功');
            this.props.form.resetFields();
          }else{
            message.error('添加失败');
          }
        })
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem label='文章标题'>
          {getFieldDecorator('articalTitle',{
            rules: [{required: true,message: '请输入文章标题'}]
          })(
            <Input placeholder='文章标题' />
          )}
        </FormItem>
        <FormItem label='文章作者'>
          {getFieldDecorator('articalAuthor',{
            rules: [{required: true,message: '请输入文章作者'}]
          })(
            <Input placeholder='文章作者' />
          )}
        </FormItem>
        <FormItem label='文章链接'>
          {getFieldDecorator('articalUrl',{
            rules: [{required: true,message: '请输入文章链接'}]
          })(
            <Input placeholder='文章链接' />
          )}
        </FormItem>
        <FormItem label='文章分类'>
          {getFieldDecorator('articalType',{
            rules: [{required: true,message: '请输入文章类别'}]
          })(
            <Input placeholder='文章分类' />
          )}
        </FormItem>
        <FormItem label='文章描述'>
          {getFieldDecorator('articalDesc',{
            rules: [{required: true,message: '请输入文章描述'}]
          })(
            <TextArea placeholder='文章描述' rows={4}/>
          )}
        </FormItem>
        
        <FormItem>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const WRecommendForm = Form.create()(RecommendForm);