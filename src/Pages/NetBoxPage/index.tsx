import React, { FunctionComponent } from 'react'
import { Modal } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import { DraggingArea } from './dragging-area'
import { asyncUploadFiles, fileList2Array } from './logic'
import { GetBoxFilesAPI } from './api'
import { NetBoxProps, BoxFileType, BoxFileLoadingType } from './types'

const NetBoxPage: FunctionComponent<NetBoxProps> = () => {
  const [boxFiles, setBoxFiles] = React.useState<Array<BoxFileType>>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [extraBoxFiles, setExtraBoxFiles] = React.useState<Array<BoxFileLoadingType>>([])

  const getBoxFiles = React.useCallback(() => {
    setLoading(true)
    GetBoxFilesAPI().then(({ data }) => {
      console.log('GetBoxFilesAPI:', data)
      setBoxFiles(data)
      setLoading(false)
    })
  }, [setBoxFiles])

  React.useEffect(getBoxFiles, [setBoxFiles, getBoxFiles])

  console.log('extraBoxFiles', extraBoxFiles)

  const handleFileDrop = (fileList: FileList) => {
    const n = fileList.length
    if (!n) return

    const boxFiles = fileList2Array(fileList)

    Modal.confirm({
      title: `Confirm to upload ${n} file${n === 1 ? '' : 's'}`,
      content: (
        <div>
          {
            boxFiles.map(boxFile => (
              <div key={boxFile.name}>{boxFile.name}</div>
            ))
          }
        </div>
      ),
      onOk: () => {
        asyncUploadFiles(boxFiles, setExtraBoxFiles).then(results => {
          // console.log(results)
          // getBoxFiles()
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
        extraFiles={extraBoxFiles}
        refreshBoxFiles={getBoxFiles}
        confirmUpload={handleFileDrop}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  )
}

export default NetBoxPage
