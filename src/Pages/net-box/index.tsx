import React, { FunctionComponent } from 'react'
import { message, Modal } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import render from '../../utils/render';
import { DraggingArea } from './dragging-area'
import { asyncUploadFiles, fileListToUploadStatuses, refreshListRef, sharedUpdateListRef } from './logic'
import { GetBoxFilesAPI } from './api'
import { NetBoxProps, BoxFileClass, BoxFileLoadingStatusClass, ResponseFileType } from './types'

const NetBoxPage: FunctionComponent<NetBoxProps> = () => {
  const [boxFiles, setBoxFiles] = React.useState<BoxFileClass[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  // @ts-ignore
  sharedUpdateListRef.current = setBoxFiles

  const getBoxFiles = React.useCallback((showLoading: boolean = true) => {
    if (showLoading) setLoading(true)
    const { LoadingStatusMap } = BoxFileLoadingStatusClass
    // console.log('LoadingStatusMap:', BoxFileLoadingStatusClass.LoadingStatusMap)
    GetBoxFilesAPI().then(({ data }) => {
      const boxFiles = data.map((item: ResponseFileType) => {
        const boxFile = BoxFileClass.FromResponseData(item)
        boxFile.setLoadingStatus(LoadingStatusMap[item.id])
        return boxFile
      })
      console.log('Generated boxFiles:', boxFiles)
      setBoxFiles(boxFiles)
      setLoading(false)
    })
  }, [setBoxFiles])

  // @ts-ignore
  refreshListRef.current = getBoxFiles

  React.useEffect(getBoxFiles, [setBoxFiles, getBoxFiles])

  const handleFileDrop = (fileList: FileList) => {
    const n = fileList.length
    if (!n) return

    const uploadingStatusList = fileListToUploadStatuses(fileList)

    Modal.confirm({
      title: `Confirm to upload ${n} file${n === 1 ? '' : 's'}`,
      content: (
        <div>
          {
            uploadingStatusList.map((status, i) => (
              <div key={`${status.name}${i}`}>{status.name}</div>
            ))
          }
        </div>
      ),
      onOk: () => {
        message.info("Prepare to upload...")
        asyncUploadFiles(uploadingStatusList)
        // asyncUploadFiles(boxFiles, setExtraBoxFiles).then(results => {
        //   message.success(`Uploaded ${results.length} file${results.length === 1 ? '' : 's'} successfully.`)
        // })
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
        // extraFiles={extraBoxFiles}
        refreshBoxFiles={getBoxFiles}
        confirmUpload={handleFileDrop}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  )
}

render(<NetBoxPage />);
