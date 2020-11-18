import React from 'react'
import { PostBoxFileAPI, PostDownloadBoxFileAPI } from './api'

export function fileList2Array(fileList: FileList) {
  const ret = []
  const n = fileList.length
  for (let i = 0; i < n; ++ i) ret.push(fileList[i])
  return ret
}

export function asyncUploadFiles(files: Array<File>) {
  return Promise.all(files.map(file => {
    return new Promise((resolve) => {
      const { name } = file
      const formData = new FormData()
      formData.append('file_content', file)
      formData.append('name', name)
      formData.append('description', 'sample-description with more than eight words.')
      PostBoxFileAPI(formData).then(res => {
        resolve(res.data)
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
      PostDownloadBoxFileAPI(data).then(res => {
        // const url = window.URL.createObjectURL(new Blob([res.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', record.name); //or any other extension
        // document.body.appendChild(link);
        // link.click();
      })
    }}>{record.name}</a>)
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Size',
    dataIndex: 'size'
  },
  {
    title: 'Upload Time',
    dataIndex: 'created_at'
  }
]