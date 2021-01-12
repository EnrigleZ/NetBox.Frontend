import React from 'react'
import { Modal, Input, message } from 'antd'

import { JWTAuth } from '../../Request'
import LoginModalContent from './login-modal-content'

export function openLoginModal() {
    const usernameRef = React.createRef<Input>()
    const passwordRef = React.createRef<Input>()

    Modal.confirm({
        title: "Login",
        content: (<LoginModalContent
            usernameRef={usernameRef}
            passwordRef={passwordRef}
        />),
        // icon: null,
        cancelText: "Cancel",
        onOk: () => {
            const username = usernameRef.current?.state.value ?? ''
            const password = passwordRef.current?.state.value ?? ''
            JWTAuth.GetInstance()
              .login({ username, password }, false)
              .then(() => message.success('Login successful!'))
              .catch(() => message.error('Login Failed!'))
          }
    })
}
