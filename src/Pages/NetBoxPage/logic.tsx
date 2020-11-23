import React from 'react'
import { Button, Divider, message, Modal } from 'antd'
import { DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { fileSizeToString, timestampToString } from '../../utils/stringify'

import {
  DeleteBoxFileAPI,
  PostBoxFileAPI,
  PostBoxFileContentAPI,
  PostDownloadBoxFileAPI
} from './api'
import { BoxFileClass, BoxFileLoadingStatusClass, ResponseFileType } from './types'
import { DescriptionComp } from './comps/description-comp'

export const sharedUpdateListRef = {
  current: () => {}
}
export const refreshListRef = {
  current: () => {}
}

export const updateList = () => {
  // @ts-ignore
  sharedUpdateListRef.current(c => [...c])
}

export function fileListToUploadStatuses(fileList: FileList) {
  const ret: BoxFileLoadingStatusClass[] = [],
    n = fileList.length

  for (let i = 0; i < n; i += 1) {
    ret.push(new BoxFileLoadingStatusClass(
      "upload", fileList[i], "pending"
    ))
  }

  return ret
}

export function asyncUploadFiles(statusList: BoxFileLoadingStatusClass[]) {
  const promises = statusList.map(status => {
    const formData = status.getUploadFormData()
    const cancelTokenSource = Axios.CancelToken.source()
    status.cancelTokenSource = cancelTokenSource
    const config: AxiosRequestConfig = {
      onUploadProgress: progress => {
        status.loadedSize = progress.loaded
        status.status = 'loading'
        updateList()
      },
      cancelToken: cancelTokenSource.token
    }
    return new Promise(resolve => {
      // Only send filename, description to get a bind-id
      updateList()
      PostBoxFileAPI(formData, {}).then(({ data }) => {
        const { id }: ResponseFileType = data
        status.bindId = id
        const dummyBoxFile = BoxFileClass.FromResponseData(data)
        dummyBoxFile.setLoadingStatus(status)
        if (status.fileUpload) {
          dummyBoxFile.size = status.fileUpload.size
        }
        // @ts-ignore
        sharedUpdateListRef.current(c => [dummyBoxFile, ...c])
        return dummyBoxFile
      }).then((dummyBoxFile) => {
        // second step: upload full file content
        const formData = status.getUploadContentFormData()
        PostBoxFileContentAPI(formData, config).then(({ data }) => {
          status.finish()
          updateList()
          message.success((<><b>{data.name}</b> uploaded successfully</>))

          resolve(data)
        }).catch(() => {
          deleteBoxFile_(dummyBoxFile, true)
          message.error(`Failed to upload file ${status.name}`)
        })
      })
    })
  })
  return promises
}


function downloadFromResult(res: AxiosResponse, filename?: string) {
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename || 'downloaded') //or any other extension
  document.body.appendChild(link)
  link.click()
}

export function downloadFromBoxFile(boxFile: BoxFileClass) {
  const status = boxFile.prepareDownload()
  const formData = boxFile.getDownloadFormData()
  if (!formData || !status) return
  updateList()

  const cancelTokenSource = Axios.CancelToken.source()
  status.cancelTokenSource = cancelTokenSource
  const config: AxiosRequestConfig = {
    onDownloadProgress: progress => {
      status.loadedSize = progress.loaded
      status.status = "loading"
      updateList()
    },
    responseType: 'blob',
    cancelToken: cancelTokenSource.token
  }
  PostDownloadBoxFileAPI(formData, config).then(res => {
    downloadFromResult(res, status.name)
    status.finish()
    updateList()
  }).catch(() => {
    message.error(`Download ${boxFile.name} failed`)
  })
}

export function deleteBoxFile_(boxFile: BoxFileClass, force: boolean = false) {
  const params = { id: boxFile.id }
  DeleteBoxFileAPI(params).then(() => {
    refreshListRef.current()
    if (!force) message.success((<>Delete <b>{boxFile.name}</b> successfully.</>))
  })
}

export function deleteBoxFile(boxFile: BoxFileClass) {
  const { loadingStatus } = boxFile
  if (!boxFile.isReady() || loadingStatus && loadingStatus.loadType === 'upload' && loadingStatus.status !== 'finished') {
    return
  }

  Modal.confirm({
    title: `Confirm to delete ${boxFile.name}?`,
    onOk: () => {
      deleteBoxFile_(boxFile)
    },
    okText: 'Delete',
    cancelText: 'Cancel'
  })

}