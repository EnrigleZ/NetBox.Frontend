import { PostBoxFileAPI } from './api'

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
    dataIndex: 'name'
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