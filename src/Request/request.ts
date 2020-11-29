import { message } from 'antd'
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { JWTAuth } from './auth'

type RequestConfig = AxiosRequestConfig & {
  needAuth?: boolean,
  loginOnAuthorized?: boolean
}

class HttpRequest {

  static instance: (HttpRequest | null) = null

  constructor() {
    console.log("Initialize a HttpRequest instance")
  }

  static GetInstance() {
    if (!this.instance) {
      this.instance = new HttpRequest()
    }
    return this.instance
  }

  _getHeaders(options: RequestConfig) {
    const authContext = JWTAuth.GetInstance()
    return authContext._getHeader(options.headers, options.needAuth)
  }

  _checkResponse(res: AxiosResponse, options: RequestConfig) {
    return res
  }

  _checkErrorResponse(res: AxiosResponse, options: RequestConfig) {
    if (res.status === 401) {
      const authContext = JWTAuth.GetInstance()

      // TODO: may need a better condition to judge it
      if (options.needAuth !== false && authContext.refreshToken) {
        // If this 401 was due to a EXPIRED token,
        // then auto refresh token and retry the original request.
        return authContext.refresh().then(() => {
          const option = {...res.config}
          return this.request(option)
        }).catch(() => {
          // If refresh token failed, user needs to login again.
          this._openLoginModal()
          return res
        })
      } else {
        // this 401 was simply non-login.
        this._openLoginModal()
      }
    } else {
      // Other error status, 404, 500... leave them to callback.
    }
    return res
  }

  _openLoginModal() {
    message.warn("Show login modal")
  }

  processResponse(promise: Promise<AxiosResponse>, options: RequestConfig): Promise<AxiosResponse> {
    return promise
      .then(res => this._checkResponse(res, options))
      .catch(error => this._checkErrorResponse(error.response, options))
  }

  async get(url: string, options: RequestConfig = {}) {
    options.headers = this._getHeaders(options)
    const ret = Axios.get(url, options)
    return this.processResponse(ret, options)
  }

  async post(url: string, data?: FormData, options: RequestConfig = {}) {
    options.headers = this._getHeaders(options)
    const ret = Axios.post(url, data, options)
    return this.processResponse(ret, options)
  }

  async delete(url: string, options: RequestConfig = {}) {
    options.headers = this._getHeaders(options)
    const ret = Axios.delete(url, options)
    return this.processResponse(ret, options)
  }

  async request(options: RequestConfig = {}) {
    if (options && options.headers) delete options.headers
    options.headers = this._getHeaders(options)
    const ret = Axios.request(options)
    return this.processResponse(ret, options)
  }
}

export default HttpRequest
