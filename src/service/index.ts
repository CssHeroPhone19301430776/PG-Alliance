import DCRequest from './request'

const dcRequest = new DCRequest({
  baseURL: '/api',
  timeout: 10000,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})

export default dcRequest
