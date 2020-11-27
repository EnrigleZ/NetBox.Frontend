import Axios, { AxiosRequestConfig } from 'axios'
import qs from 'querystring'

class UserInfo {
  username: string
  constructor(username: string) {
    this.username = username
  }
}

export class JWTAuth {
  token: (string | null) = null
  refreshToken: (string | null) = null
  userInfo: (UserInfo | null) = null

  static instance: (JWTAuth | null) = null

  static GetInstance() {
    if (!this.instance) {
      this.instance = new JWTAuth()
    }
    return this.instance
  }

  constructor () {
    this.token = null
    this.refreshToken = null
    this.userInfo = null
  }

  login(params: any) {
    const ret = GetAuthAPI(params).then(res => {
      if (res.status === 401) return
      const { access, refresh, username } = res.data
      this.updateToken(access, refresh, username)
    })
    return ret
  }

  updateToken(token: (string | null), refreshToken: (string | null), username: (string | null)) {
    this.token = token
    if (refreshToken) this.refreshToken = refreshToken
    if (username !== null) {
      this.userInfo = new UserInfo(username)
    } else {
      this.userInfo = null
    }
  }

  logout() {
    this.updateToken(null, null, null)
  }

  getUser() {
    return this.userInfo
  }

  _getToken() {
    return this.token
  }

  _getHeader(headers: any = {}) {
    if (headers.noAuth || !this.token) {
      return {...headers}
    } else {
      const token = this._getToken()
      return {
        Authorization: `Bearer ${token}`,
        ...headers
      }
    }
  }
}

const GetAuthAPI = async (params: any) => {
  const formData = new FormData()
  for (const key in params) formData.append(key, params[key])

  const ret = Axios.post('/api/auth/token', formData)
  return ret
}
