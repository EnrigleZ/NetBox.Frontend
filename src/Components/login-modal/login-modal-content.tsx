import React from 'react'
import { Form, Input } from 'antd'

const LoginModalContent: React.FunctionComponent<any> = () => {
    const usernameRef = React.useRef<Input>(null)
    const passwordRef = React.useRef<Input>(null)

    return (
        <Form>
            <Form.Item label="Username">
                <Input ref={usernameRef} />
            </Form.Item>
            <Form.Item label="Password">
                <Input ref={passwordRef} />
            </Form.Item>
        </Form>
    )
}

export default LoginModalContent
