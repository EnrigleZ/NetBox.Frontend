import Axios from 'axios'

export const GetLoginAuth = async (params: any) => {
    const formData = new FormData()
    for (const key in params) formData.append(key, params[key])

    const ret = Axios.post('/api/auth/token', formData)
    return ret
}

export const RefreshAuthToken = async (refresh: string) => {
    const formData = new FormData()
    formData.append('refresh', refresh)

    const ret = Axios.post('/api/auth/refresh', formData)
    return ret
}
