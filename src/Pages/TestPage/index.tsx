import React, { FunctionComponent } from 'react'
import { Button, Card } from 'antd'
import Axios from 'axios'

const TestPage: FunctionComponent<any> = () => {
  const getAllCallback = () => {
    Axios.get('/test/test-structs/?param1=123').then(res => {
      console.log(res.data)
    })
  }
  const getOneCallback = () => {
    Axios.get('/test/test-struct/?id=2bd4a72c-67e9-4d76-9d70-c3b5c3330893').then(res => {
      console.log(res.data)
    })
  }
  const createOneCallback = () => {
    const body = {
      title: 'sample_title',
      content: 'sample_content with more than seven words.'
    }
    Axios.post('/test/test-struct/', body).then(res => {
      console.log(res.data)
    })
  }
  return (
    <div className="test-page">
      <Card>
        <Button onClick={createOneCallback}>Add one</Button>
        <Button onClick={getOneCallback}>Get one</Button>
        <Button onClick={getAllCallback}>Get all</Button>
      </Card>
    </div>
  )
}

export default TestPage