import HttpRequest from '../../Request'

const request = HttpRequest.GetInstance()

export const PostImage = async (data: FormData) => {
    const ret = request.post('/api/image/create', data);
}

export const PostRegisterUserAPI = async (data: FormData) => {
  const ret = request.post('/api/auth/register', data, { needAuth: false })
  return ret
}

export const GetTestAuthAPI = async () => {
  const ret = request.get('/api/auth/test')
  return ret
}
