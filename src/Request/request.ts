import Axios, { AxiosRequestConfig } from 'axios'
import { JWTAuth } from './auth'

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

  _getHeader(headers: any) {
    const authContext = JWTAuth.GetInstance()
    return authContext._getHeader(headers)
  }

  async get(url: string, options: AxiosRequestConfig = {}) {
    options.headers = this._getHeader(options.headers)
    return Axios.get(url, options)
  }

  async post(url: string, data?: FormData, options: AxiosRequestConfig = {}) {
    options.headers = this._getHeader(options.headers)
    console.log(options)
    return Axios.post(url, data, options)
  }

  async delete(url: string, options: AxiosRequestConfig = {}) {
    options.headers = this._getHeader(options.headers)
    return Axios.delete(url, options)
  }
}

export default HttpRequest
