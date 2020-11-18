import Axios from 'axios'

export const GetBoxFilesAPI = async () => {
    const ret = Axios.get('/box/box-files')
    return ret
}

export const PostBoxFileAPI = async (data: FormData) => {
    const ret = Axios.post('/box/box-file', data)
    return ret
}
