import Axios, { AxiosRequestConfig } from 'axios'

export const GetBoxFilesAPI = async () => {
    const ret = Axios.get('/box/box-files')
    return ret
}

export const PostBoxFileAPI = async (data: FormData, config?: AxiosRequestConfig | undefined) => {
    const ret = Axios.post('/box/box-file', data, config)
    return ret
}

export const DeleteBoxFilesAPI = async () => {
    const ret = Axios.delete('/box/box-files')
    return ret
}

export const PostDownloadBoxFileAPI = async (data: object, config: AxiosRequestConfig | undefined) => {
    const ret = Axios.post('/box/download', data, config)
    return ret
}
