import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { JWTAuth } from './auth'
import { IRequestConfig } from './interface';
import { openLoginModal } from '../Components/login-modal'


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

  _getHeaders(options: IRequestConfig) {
    const authContext = JWTAuth.GetInstance()
    return authContext._getHeader(
      options?.axiosRequestConfig?.headers,
      options.needAuth,
    )
  }

  _checkResponse(res: AxiosResponse, options: IRequestConfig) {
    return res
  }

  _checkErrorResponse(res: AxiosResponse, options: IRequestConfig) {
    if (res.status === 401) {
      const authContext = JWTAuth.GetInstance()

      // TODO: may need a better condition to judge it
      if (options.needAuth !== false && authContext.refreshToken) {
        // If this 401 was due to a EXPIRED token,
        // then auto refresh token and retry the original request.
        return authContext.refresh().then(() => {
          const opt = {...options, axiosRequestConfig: res.config}
          return this.request(opt)
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
      if (res.status === 500) {
        console.log('error status 500 detected')
        return Promise.reject(res)
      }
      // Other error status, 404, 500... leave them to callback.
    }
    return res
  }

  _openLoginModal() {
    openLoginModal()
  }

  processResponse(promise: Promise<AxiosResponse>, options: IRequestConfig): Promise<AxiosResponse> {
    return promise
      .then(res => this._checkResponse(res, options))
      .catch(error => this._checkErrorResponse(error.response, options))
  }

  setHeader(options: IRequestConfig = {}) {
    options.axiosRequestConfig = options.axiosRequestConfig || {};
    options.axiosRequestConfig.headers = this._getHeaders(options);
  }

  async get(url: string, options: IRequestConfig = {}) {
    this.setHeader(options);
    const ret = Axios.get(url, options.axiosRequestConfig)
    return this.processResponse(ret, options)
  }

  async post(url: string, data?: FormData, options: IRequestConfig = {}) {
    this.setHeader(options);
    const ret = Axios.post(url, data, options.axiosRequestConfig)
    return this.processResponse(ret, options)
  }

  async delete(url: string, options: IRequestConfig = {}) {
    this.setHeader(options);
    const ret = Axios.delete(url, options.axiosRequestConfig)
    return this.processResponse(ret, options)
  }

  async request(options: IRequestConfig = {}) {
    if (options.axiosRequestConfig?.headers) {
      delete options.axiosRequestConfig?.headers
    }
    this.setHeader(options);
    const ret = Axios.request(options.axiosRequestConfig || {})
    return this.processResponse(ret, options)
  }
}

export default HttpRequest
