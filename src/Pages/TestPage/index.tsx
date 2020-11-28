import React, { FunctionComponent } from 'react'
import { Button, Card, Modal, Form, Input, message } from 'antd'

import { JWTAuth } from '../../Request'
import { PostRegisterUserAPI, GetTestAuthAPI } from './api'

const TestPage: FunctionComponent<any> = () => {
  const usernameRefLogin = React.useRef<Input>(null)
  const passwordRefLogin = React.useRef<Input>(null)
  const loginCallback = () => {
    Modal.confirm({
      title: "Login",
      content: (<Form>
        <Form.Item label="username">
          <Input ref={usernameRefLogin} />
        </Form.Item>
        <Form.Item label="password">
          <Input ref={passwordRefLogin} />
        </Form.Item>
      </Form>),
      onOk: () => {
        const username = usernameRefLogin.current?.state.value ?? ''
        const password = passwordRefLogin.current?.state.value ?? ''
        JWTAuth.GetInstance()
          .login({ username, password }, false)
          .then(() => message.success('Authenticated!'))
          .catch(() => message.error('Failed'))
      }
    })
  }
  const authTestCallback = () => {
    GetTestAuthAPI().then(res => {
      console.log(res)
    })
  }
  const usernameRef = React.useRef<Input>(null)
  const passwordRef = React.useRef<Input>(null)
  const registerCallback = () => {
    Modal.confirm({
      title: "Create an user",
      content: (<Form>
        <Form.Item label="username">
          <Input ref={usernameRef} />
        </Form.Item>
        <Form.Item label="password">
          <Input ref={passwordRef} />
        </Form.Item>
      </Form>),
      onOk: () => {
        const username = usernameRef.current?.state.value ?? ''
        const password = passwordRef.current?.state.value ?? ''
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        console.log(username, password)
        PostRegisterUserAPI(formData).then(res => {})
      }
    })
  }
  return (
    <div className="test-page">
      <Card>
        <Button onClick={registerCallback}>Register</Button>
        <Button onClick={loginCallback}>Login</Button>
        <Button onClick={authTestCallback}>Test Auth</Button>
      </Card>
    </div>
  )
}

export default TestPage