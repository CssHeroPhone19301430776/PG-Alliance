import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'

// 针对CreateAxiosDefaults配置进行扩展
// 使其可以添加对应的拦截器来使用
interface DCRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: {
    requestSuccessFn?: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: T) => T
    responseFailureFn?: (err: any) => any
  }
}

// 定义单一网络请求时的类型
interface newDCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: {
    requestSuccessFn?: (config: any) => any
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: T) => T
    responseFailureFn?: (err: any) => any
  }
}

class DCRequest {
  public instance: AxiosInstance

  // request实例 => axios实例
  constructor(config: DCRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    // 请求成功和失败的拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    // 响应成功和失败的拦截
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的request实例添加拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  // 封装网络请求方法
  request<T>(config: newDCRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      // 单次请求成功的拦截
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: newDCRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: newDCRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: newDCRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: newDCRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default DCRequest
