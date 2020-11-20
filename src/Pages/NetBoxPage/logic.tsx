import React from 'react'
import { Button } from 'antd'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { fileSizeToString, timestampToString } from '../../utils/stringify'

import {
  PostBoxFileAPI,
  PostBoxFileContentAPI,
  PostDownloadBoxFileAPI
} from './api'
import { BoxFileClass, BoxFileLoadingStatusClass, ResponseFileType } from './types'
import { DescriptionComp } from './comps'

export const sharedUpdateListRef = {
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
    const config: AxiosRequestConfig = {
      onUploadProgress: progress => {
        status.loadedSize = progress.loaded
        status.status = 'loading'
        updateList()
      }
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
        return id
      }).then(() => {
        // second step: upload full file content
        const formData = status.getUploadContentFormData()
        PostBoxFileContentAPI(formData, config).then(({ data }) => {
          status.finish()
          updateList()
          resolve(data)
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

function downloadFromBoxFile(boxFile: BoxFileClass) {
  const status = boxFile.prepareDownload()
  const formData = boxFile.getDownloadFormData()
  if (!formData || !status) return

  updateList()
  const config: AxiosRequestConfig = {
    onDownloadProgress: progress => {
      status.loadedSize = progress.loaded
      status.status = "loading"
      updateList()
    },
    responseType: 'blob'
  }
  PostDownloadBoxFileAPI(formData, config).then(res => {
    downloadFromResult(res, status.name)
    status.finish()
    updateList()
  })
}

export const boxFileTableColumns = [
  {
    title: 'File',
    key: 'name',
    render: (record: BoxFileClass) => (<a onClick={downloadFromBoxFile.bind(null, record)} download>
      <Button type="link" disabled={!record.id}>{record.name}</Button>
    </a>)
  },
  {
    title: 'Description',
    key: 'description',
    width: '30%',
    render: (record: BoxFileClass) => {
      return <DescriptionComp boxFile={record} />
    }
  },
  {
    title: 'Size',
    dataIndex: 'size',
    render: (size: number) => fileSizeToString(size),
  },
  {
    title: 'Upload Time',
    dataIndex: 'created_at',
    render: (timestamp: number) => timestampToString(timestamp)
  }
]