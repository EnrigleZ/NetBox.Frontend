import Axios, { AxiosRequestConfig } from 'axios'
import qs, { ParsedUrlQueryInput } from 'querystring'

export const GetBoxFilesAPI = async () => {
    const ret = Axios.get('/box/box-files')
    return ret
}

export const PostBoxFileAPI = async (data: FormData, config?: AxiosRequestConfig | undefined) => {
    const ret = Axios.post('/box/box-file', data, config)
    return ret
}

export const PostBoxFileContentAPI = async (data: FormData, config?: AxiosRequestConfig | undefined) => {
    const ret = Axios.post('/box/box-file-content', data, config)
    return ret
}

export const DeleteBoxFilesAPI = async () => {
    const ret = Axios.delete('/box/box-files')
    return ret
}

export const DeleteBoxFileAPI = async (data: ParsedUrlQueryInput) => {
    const ret = Axios.delete(`/box/box-file?${qs.stringify(data)}`, )
    return ret
}

export const PostDownloadBoxFileAPI = async (data: FormData, config: AxiosRequestConfig | undefined) => {
    const ret = Axios.post('/box/download', data, config)
    return ret
}
