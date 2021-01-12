import React, { FunctionComponent } from 'react'
import { Button, Card, Modal, Form, Input, message } from 'antd'

import { openLoginModal } from '../../Components/login-modal'
import { PostRegisterUserAPI, GetTestAuthAPI } from './api'

const TestPage: FunctionComponent<any> = () => {
  const loginCallback = () => {
    openLoginModal()
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