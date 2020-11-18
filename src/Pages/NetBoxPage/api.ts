import Axios from 'axios'

export const GetBoxFilesAPI = async () => {
    const ret = Axios.get('/box/box-files')
    return ret
}

export const PostBoxFileAPI = async (data: FormData) => {
    const ret = Axios.post('/box/box-file', data)
    return ret
}

export const DeleteBoxFilesAPI = async () => {
    const ret = Axios.delete('/box/box-files')
    return ret
}

export const PostDownloadBoxFileAPI = async (data: object) => {
    const ret = Axios.post('/box/download', data, {
        responseType: "blob"
    })
    return ret
}
