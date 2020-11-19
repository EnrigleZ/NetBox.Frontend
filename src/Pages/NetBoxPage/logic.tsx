import React from 'react'
import { Progress } from 'antd'
import { AxiosRequestConfig } from 'axios'
import { PostBoxFileAPI, PostDownloadBoxFileAPI } from './api'
import { BoxFileType, BoxFileLoadingType } from './types'

export function file2BoxFile(file: File) {
  const boxFile: BoxFileLoadingType = {
    id: '',
    size: file.size,
    name: file.name,
    loaded_size: 0,
    load_type: 'upload',
    file_upload: file
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
        boxFile.loaded_size = boxFile.size
        boxFile.id = data.id
        setExtraBoxFiles([...boxFiles])
        resolve(data)
      })
    })
  }))
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
        // const url = window.URL.createObjectURL(new Blob([res.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', record.name); //or any other extension
        // document.body.appendChild(link);
        // link.click();
      })
    }} download>{record.name}</a>)
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Size',
    key: 'size',
    render: (record: BoxFileLoadingType) => {
      let { size, load_type, loaded_size } = record
      if (load_type === undefined) return size

      const progress = size === 0 ? 0 : loaded_size / size
      console.log(progress)
      return (<Progress percent={progress * 100} size="small"/>)
    },
    width: '30%'
  },
  {
    title: 'Upload Time',
    dataIndex: 'created_at'
  }
]