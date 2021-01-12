import React from 'react'
import { Form, Input } from 'antd'

type LoginModalContentProps = {
    usernameRef: React.RefObject<Input>,
    passwordRef: React.RefObject<Input>,
}

const LoginModalContent: React.FunctionComponent<LoginModalContentProps> = ({
    usernameRef,
    passwordRef
}) => {
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
