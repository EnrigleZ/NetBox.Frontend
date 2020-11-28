import { message } from 'antd'
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { JWTAuth } from './auth'

Axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error.response)
})

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
    console.log(res)
    return res
  }

  _checkErrorResponse(res: AxiosResponse, options: RequestConfig) {
    console.log(res)
    if (res.status === 401 && options.loginOnAuthorized !== false) {
      message.warn("Show login modal")
    }
    return res
  }

  processResponse(promise: Promise<AxiosResponse>, options: RequestConfig) {
    return promise
      .then(res => this._checkResponse(res, options))
      .catch(res => this._checkErrorResponse(res, options))
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
}

export default HttpRequest
