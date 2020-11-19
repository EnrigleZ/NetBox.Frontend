import React from 'react'
import { Button, Progress } from 'antd'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { fileSizeToString, timestampToString } from '../../utils/stringify'

import { PostBoxFileAPI, PostDownloadBoxFileAPI } from './api'
import { BoxFileType, BoxFileLoadingType } from './types'

export function file2BoxFile(file: File) {
  const boxFile: BoxFileLoadingType = {
    id: '',
    size: file.size,
    name: file.name,
    loaded_size: 0,
    load_type: 'upload',
    file_upload: file,
    status: 'pending'
  }
  return boxFile
}

export function fileList2Array(fileList: FileList) {
  const ret = []
  const n = fileList.length
  for (let i = 0; i < n; ++ i) ret.push(file2BoxFile(fileList[i]))
  return ret
}

function getUploadFileFormData(boxFile: BoxFileLoadingType) {
  const { name, file_upload } = boxFile
  const formData = new FormData()
  formData.append('file_content', file_upload || '')
  formData.append('name', name || '')
  formData.append('description', 'sample-description with more than eight words.')
  return formData
}

function markLoadFinished(boxFile: BoxFileLoadingType, id?: string) {
  const { size } = boxFile
  boxFile.loaded_size = size
  boxFile.status = "finished"
  if (id) {
    boxFile.id = id
  }
}

export function asyncUploadFiles(boxFiles: Array<BoxFileLoadingType>, setExtraBoxFiles: Function) {
  return Promise.all(boxFiles.map(boxFile => {
    const config: AxiosRequestConfig = {
      onUploadProgress: progress => {
        boxFile.loaded_size = progress.loaded
        setExtraBoxFiles([...boxFiles])
      }
    }
    return new Promise((resolve) => {
      const formData = getUploadFileFormData(boxFile)
      setExtraBoxFiles((files: Array<BoxFileLoadingType>) => {
        return files.concat(boxFile)
      })
      PostBoxFileAPI(formData, config).then(({ data }) => {
        markLoadFinished(boxFile, data.id)
        setExtraBoxFiles([...boxFiles])
        resolve(data)
      })
    })
  }))
}

const FileLoadingProgress = (record: BoxFileLoadingType) => {
  const { size, load_type, loaded_size, status } = record
  const finished = status === "finished"
  let progress = size === 0 ? 0 : loaded_size / size
  if (status !== 'finished') progress = Math.min(progress, 0.999)

  const color = finished
    ? '#52c41a'
    : load_type === 'upload'
    ? '#1890ff'
    : '#faad14'

  return (<Progress
    percent={progress * 100}
    size="small"
    strokeColor={color}
    status={finished ? 'success' : 'active'}
    format={() => ''}
  />)
}

function downloadFromResult(res: AxiosResponse) {
  // const url = window.URL.createObjectURL(new Blob([res.data]));
  // const link = document.createElement('a');
  // link.href = url;
  // link.setAttribute('download', record.name); //or any other extension
  // document.body.appendChild(link);
  // link.click();
}

export const boxFileTableColumns = [
  {
    title: 'File',
    key: 'name',
    render: (record: any) => (<a onClick={() => {
      const data = new FormData()
      data.append('id', record.id)
      const config = {
        onUploadProgress: (e: any) => {
          console.log(e)
        }
      }
      PostDownloadBoxFileAPI(data, config).then(res => {
        downloadFromResult(res)
      })
    }} download>
      <Button type="link" disabled={!record.id}>{record.name}</Button>
    </a>)
  },
  {
    title: 'Description',
    key: 'description',
    width: '30%',
    render: (record: BoxFileLoadingType) => {
      const { load_type, description } = record
      if (!load_type) return description ?? '-'
      return FileLoadingProgress(record)
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