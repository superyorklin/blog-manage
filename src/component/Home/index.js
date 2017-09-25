import React from 'react';
import { Layout, Menu, Icon ,message } from 'antd';
import getCookie from '../../utils/getCookie';
import { Link } from 'react-router';
const { Header, Sider, Content } = Layout;

export default class Home extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentWillMount(){
    if(!getCookie('lyz_blog')){
      message.error('用户尚未登录');
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div style={{height:100}} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to='/home/artical'>
                <Icon type="file-add" />
                <span>博文添加</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/home/recommend'>
                <Icon type="copy" />
                <span>推荐文章添加</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/home/change'>
                <Icon type="edit" />
                <span>博文修改</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              style={{marginLeft: 20}}
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <h1 style={{display: 'inline-block',marginLeft: '25%'}}>后台管理系统</h1>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}