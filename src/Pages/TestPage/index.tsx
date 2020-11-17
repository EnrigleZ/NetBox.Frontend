import React, { FunctionComponent } from 'react'
import { Button, Card } from 'antd'
import Axios from 'axios'

const TestPage: FunctionComponent<any> = () => {
  const getAllCallback = () => {
    Axios.get('/test/').then(res => {
      console.log(res.data)
    })
  }
  return (
    <div className="test-page">
      <Card>
        <Button>Add one</Button>
        <Button onClick={getAllCallback}>Get all</Button>
      </Card>
    </div>
  )
}

export default TestPage