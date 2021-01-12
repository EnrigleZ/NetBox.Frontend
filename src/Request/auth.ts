import { message } from 'antd'
import { GetLoginAuth, RefreshAuthToken } from './api'

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

  login(params: any, showMessage: Boolean = false) {
    let ret = GetLoginAuth(params).then(res => {
      if (res.status === 401) return res
      const { access, refresh, username } = res.data
      this.updateToken(access, refresh, username)
      return res
    })

    if (showMessage) {
      ret = ret.then(res => {
        message.success("Login successfully")
        return res
      }).catch(res => {
        message.error("Login failed")
        throw res
      })
    }

    return ret
  }

  refresh () {
    if (!this.refreshToken) return Promise.reject()

    const ret = RefreshAuthToken(this.refreshToken)
      .then(({ data }) => {
        const { refresh, access } = data
        this.updateToken(access, refresh)
      })

    return ret
  }

  updateToken(token: (string | null), refreshToken: (string | null), username: (string | null) = null) {
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

  _getHeader(headers: any = {}, needAuth: boolean = true) {
    if (!needAuth || !this.token) {
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
