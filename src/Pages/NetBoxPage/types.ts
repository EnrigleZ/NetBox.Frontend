export type NetBoxProps = {
  title?: String
}

export type BoxFileType = {
  id: string,
  name?: string
  description?: string,
  author?: string,
  created_at?: number,
  updated_at?: number,
  size: number
}

export type BoxFileLoadingType = {
  load_type: ('upload' | 'download'),
  loaded_size: number,
  file_upload: File,
  status?: ('pending' | 'loading' | 'finished')
} & BoxFileType


export type NetBoxFunctionAreaProps = {
  boxFiles: Array<BoxFileType>,
  refreshBoxFiles: Function,
  confirmUpload: Function,
  setLoading: Function,
  loading: boolean,
  extraFiles: Array<BoxFileLoadingType>
}

export type TooltipWrapperProps = {
  display: boolean
}