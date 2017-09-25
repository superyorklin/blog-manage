import React from 'react';
import {Form,Input,Button,Upload,Icon,message} from 'antd';
import Fetch from '../../utils/fetch';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class Artical extends React.Component{
  render(){
    return(
      <div>
        <h2>博文添加</h2>
        <WArticalForm />
      </div>
    )
  }
}
class ArticalForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Fetch.post('/admin',values).then(res => {
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
        <FormItem label='选择文件'>
          {getFieldDecorator('articalFile',{
            getValueFromEvent: this.normFile,
            rules: [{required: true,message: '请选择文件'}]
          })(
            <Upload name="logo" action='/upload'>
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const WArticalForm = Form.create()(ArticalForm);