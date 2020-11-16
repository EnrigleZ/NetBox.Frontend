import React, { FunctionComponent } from 'react'
import { Button } from 'antd'

type NetBoxProps = {
  title?: String
}

const NetBoxPage: FunctionComponent<NetBoxProps> = ({ title }) => {
  return (
    <Button>Click</Button>
  )
}

export default NetBoxPage
