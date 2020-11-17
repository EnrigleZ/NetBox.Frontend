import React, { FunctionComponent } from 'react'
import { Modal } from 'antd'

import NetBoxFunctionArea from './dragging-area'
import { fileList2Array, readFilesFromDragging } from './logic'
import { HeartOutlined } from '@ant-design/icons'

type NetBoxProps = {
  title?: String
}

const NetBoxPage: FunctionComponent<NetBoxProps> = () => {
  const handleFileDrop = (fileList: FileList) => {
    const n = fileList.length
    if (!n) return

    const files = fileList2Array(fileList)

    Modal.warning({
      title: `Confirm to upload ${n} file${n === 1 ? '' : 's'}`,
      content: (
        <div>
          {
            files.map(file => (
              <div key={file.name}>{file.name}</div>
            ))
          }
        </div>
      ),
      onOk: () => {
        readFilesFromDragging(files)},
      onCancel: () => {},
      icon: <HeartOutlined />
    })
  }

  return (
    <div className="net-box-page">
      <NetBoxFunctionArea handleDrop={handleFileDrop} />
    </div>
  )
}

export default NetBoxPage
