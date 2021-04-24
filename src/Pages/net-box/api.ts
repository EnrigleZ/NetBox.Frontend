import qs, { ParsedUrlQueryInput } from 'querystring'
import HttpRequest from '@/Request';
import { IRequestConfig } from '@/Request/interface';

const request = HttpRequest.GetInstance()

export const GetBoxFilesAPI = async () => {
    const ret = request.get('/api/box/box-files')
    return ret
}

export const PostBoxFileAPI = async (data: FormData) => {
    const ret = request.post('/api/box/box-file', data)
    return ret
}

export const PostBoxFileContentAPI = async (data: FormData, config?: IRequestConfig) => {
    const ret = request.post('/api/box/box-file-content', data, config)
    return ret
}

export const DeleteBoxFilesAPI = async () => {
    const ret = request.delete('/api/box/box-files')
    return ret
}

export const DeleteBoxFileAPI = async (data: ParsedUrlQueryInput) => {
    const ret = request.delete(`/api/box/box-file?${qs.stringify(data)}`, )
    return ret
}

export const PostDownloadBoxFileAPI = async (data: FormData, config?: IRequestConfig) => {
    const ret = request.post('/api/box/download', data, config)
    return ret
}
