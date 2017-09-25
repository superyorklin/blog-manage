import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import './login.css';
import Fetch from '../../utils/fetch';
const FormItem = Form.Item;

export default class Login extends React.Component{
  _login = () => {
    this.props.history.push('/home');
  }
  render(){
    return(
      <div className='login-box'>
        <WrappedNormalLoginForm jump={this._login} />
      </div>
    )
  }
}

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Fetch.post('/login',values).then(res =>{
          if(res.login){
            this.props.jump();
          }else{
            message.error('登录失败!');
          }
        }).catch(err => {
          message.error(err);
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>         
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);