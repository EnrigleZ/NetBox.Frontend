import Axios from 'axios'

import HttpRequest from '../../Request'

const request = HttpRequest.GetInstance()

export const PostRegisterUserAPI = async (data: FormData) => {
  const ret = Axios.post('/api/auth/register', data)
  return ret
}

export const GetTestAuthAPI = async () => {
  const ret = request.get('/api/auth/test')
  return ret
}
