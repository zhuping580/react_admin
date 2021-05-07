import React, { Component } from 'react'
import { Form, Input, Button, } from 'antd' 
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png' 
import './login.less' 

const Item = Form.Item

export default class Login extends Component {

  login = (e) => {
    console.log('e是',e)
    // 阻止事件默认行为(不提交表单) 
    // e.preventDefault()

    // 进行表单所有控件的校验
    this.props.form.validataFields(async (err, values) => {
      if (!err){
        // 校验成功
        const {username, password} = values
        console.log('提交登录请求', username, password)
      } else {
        // 校验失败
        console.log(err)
      }
    })
  }

  // 自定义表单的校验规则
  validator = (rule, value, callback) => {
    console.log(rule, value)
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误 
      callback('必须输入密码') 
      } else if (length < 4) { 
        callback('密码必须大于 4 位') 
      } else if (length > 12) {
        callback('密码必须小于 12 位') 
      } else if (!pwdReg.test(value)) {
        callback('密码必须是英文、数组或下划线组成') 
      } else {
        callback() // 必须调用 callback
    }
  }

  render() {

    return (
      <div className='login'>
        <header className='login-header'>
        <img src={logo} alt='logo'/>
        <h1>后台管理系统</h1>
        </header>

        <section className='login-content'>
          <h3>用户登录</h3>
          <Form onSubmit={this.login}>
            <Item name="username" rules= {[
                   {require: true, whitespace:true, message: '必须输入用户名'},
                   {min: 4, message: '用户名必须大于 4 位'},
                   {max: 12, message: '用户名必须小于 12 位'}, 
                   {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线 组成'}
                 ]}  
                 validateFirst // 按rules顺序校验
                 >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名"/>
            </Item>
            <Item name="password" rules={[
                    // 自定义表单校验规则 
                    {validator: this.validator}
                  ]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码"/> 
            </Item>
            <Item> 
              <Button type="primary" htmlType="submit" block className="login-form-button">
               登录 
              </Button> 
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
