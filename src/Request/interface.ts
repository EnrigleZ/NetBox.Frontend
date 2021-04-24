import { AxiosRequestConfig } from 'axios'

export interface IRequestConfig {
    needAuth?: boolean;
    axiosRequestConfig?: AxiosRequestConfig;
}
