import Axios from "axios"

export function fileList2Array(fileList: FileList) {
  const ret = []
  const n = fileList.length
  for (let i = 0; i < n; ++ i) ret.push(fileList[i])
  return ret
}

export function readFilesFromDragging(files: Array<File>) {
  const n = files.length
  for (let i = 0; i < n; ++ i) {
    const reader = new FileReader()
    reader.onload = function (e) {
      const text = e.target?.result
      // console.log(text)
    }

    console.log(files[i])
    
    reader.readAsText(files[i])
  }
}

export function asyncUploadFiles(files: Array<File>) {
  return Promise.all(files.map(file => {
    return new Promise((resolve) => {
      const formData = new FormData()
      formData.append('file_content', file)
      formData.append('name', 'sample-name')
      formData.append('description', 'sample-description with more than eight words.')
      Axios.post('/box-file/',  formData).then(res => {
        resolve(res.data)
      })
    })
  }))
}
