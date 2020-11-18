import React, { FunctionComponent } from 'react'
import { Modal } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import { DraggingArea, BoxFileType } from './dragging-area'
import { asyncUploadFiles, fileList2Array, readFilesFromDragging } from './logic'
import { GetBoxFilesAPI } from './api'


type NetBoxProps = {
  title?: String
}

const NetBoxPage: FunctionComponent<NetBoxProps> = () => {
  const [boxFiles, setBoxFiles] = React.useState<Array<BoxFileType>>([])

  const getBoxFiles = React.useCallback(() => {
    GetBoxFilesAPI().then(({ data }) => {
      console.log('GetBoxFilesAPI:', data)
      setBoxFiles(data)
    })
  }, [setBoxFiles])

  React.useEffect(getBoxFiles, [setBoxFiles])

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
        asyncUploadFiles(files).then(results => {
          console.log(results)
        })
      },
      onCancel: () => {},
      icon: <HeartOutlined />
    })
  }

  return (
    <div className="net-box-page">
      <DraggingArea
        handleDrop={handleFileDrop}
        boxFiles={boxFiles}
      />
    </div>
  )
}

export default NetBoxPage
