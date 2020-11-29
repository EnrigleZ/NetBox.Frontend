import React from 'react'
import { Modal } from 'antd'

import LoginModalContent from './login-modal-content'

export function openLoginModal() {
    Modal.confirm({
        title: "Login",
        content: (<LoginModalContent />),
        icon: null,
        cancelText: "Cancel"
    })
}
