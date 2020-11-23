import { CancelToken, CancelTokenSource } from "axios"

export type NetBoxProps = {
  title?: String
}

export type ResponseFileType = {
  id: string,
  name: string,
  description: string,
  author: string,
  created_at: number,
  updated_at: number,
  size: number
}

export class BoxFileClass {
  id: string
  name?: string
  description?: string
  author?: string
  createdAt?: number
  updatedAt?: number
  size: number
  loadingStatus?: BoxFileLoadingStatusClass

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    author: string = '',
    createdAt: (number | undefined) = undefined,
    updatedAt: (number | undefined) = undefined,
    size: number = 0
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.author = author
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.size = size
    this.loadingStatus = undefined
  }

  static FromResponseData(item: ResponseFileType) {
    const { id, name, description, author, created_at, updated_at, size } = item
    const boxFile = new BoxFileClass(id, name, description, author, created_at, updated_at, size)
    return boxFile
  }

  isReady() {
    const ret = !!this.id && !(this.loadingStatus && this.loadingStatus.status === "loading")// && !this.loadingStatus
    // console.log(this.name, ret)
    return ret
  }

  setLoadingStatus(status?: BoxFileLoadingStatusClass) {
    const previousStatus = this.loadingStatus
    const { LoadingStatusMap } = BoxFileLoadingStatusClass
    if (previousStatus === status) return

    this.loadingStatus = status
    if (status) {
      status.boxFile = this
      LoadingStatusMap[this.id] = status
    } else {
      delete LoadingStatusMap[this.id]
    }
    // if (previousStatus) {
    //   const { LoadingStatusMap } = BoxFileLoadingStatusClass
    //   const index = LoadingList.indexOf(previousStatus)
    //   console.log('previous', previousStatus, LoadingList)
    //   if (index >= 0) {
    //     LoadingList.splice(index, 1)
    //   }
    // }
  }

  // TODO: is stopping axios download progress needed
  prepareDownload() {
    const downloadStatus = new BoxFileLoadingStatusClass(
      'download', undefined, "pending", this.name
    )
    this.setLoadingStatus(downloadStatus)
    return downloadStatus
  }

  getDownloadFormData() {
    if (!this.isReady()) return null
    const form = new FormData()
    form.append('id', this.id)
    return form
  }
}

export type BoxFileLoadingStatusEnum = ('pending' | 'loading' | 'finished' | 'canceled' | undefined)

export class BoxFileLoadingStatusClass {
  static LoadingStatusMap: Record<string, BoxFileLoadingStatusClass> = {};

  loadType: ('upload' | 'download')
  loadedSize: number
  fileUpload?: File
  status?: BoxFileLoadingStatusEnum
  boxFile?: BoxFileClass
  name: string
  bindId?: string
  cancelTokenSource?: CancelTokenSource

  constructor(
    loadType: ('upload' | 'download'),
    fileUpload: (File | undefined) = undefined,
    status: BoxFileLoadingStatusEnum = undefined,
    name: string = ''
  ) {
    this.loadType = loadType
    this.loadedSize = 0
    this.fileUpload = fileUpload
    this.status = status
    if (fileUpload) name = fileUpload.name
    this.name = name
    this.bindId = undefined
    // BoxFileLoadingStatusClass.LoadingList.push(this)
  }

  finish() {
    this.status = "finished"
  }

  getUploadFormData (description: string = '') {
    const formData = new FormData()
    const { name } = this
    formData.append('name', name)
    formData.append('description', description)
    return formData
  }

  getUploadContentFormData () {
    const formData = new FormData()
    const { fileUpload, bindId } = this
    formData.append('id', bindId || '')
    formData.append('file_content', fileUpload || '')
    return formData
  }

  getProgress () {
    const { boxFile, loadedSize } = this
    if (!boxFile) return '0'
    const { size } = boxFile
    return size ? (Math.min(100, loadedSize * 100 / size)).toFixed(2) : '0'
  }

  cancel () {
    const { cancelTokenSource } = this
    if (cancelTokenSource) {
      cancelTokenSource.cancel()
      this.status = "canceled"
      this.boxFile?.setLoadingStatus(undefined)
    }
  }
}

export type NetBoxFunctionAreaProps = {
  boxFiles: BoxFileClass[],
  refreshBoxFiles: Function,
  confirmUpload: Function,
  setLoading: Function,
  loading: boolean,
  // extraFiles: Array<BoxFileLoadingType>
}

export type TooltipWrapperProps = {
  display: boolean
}