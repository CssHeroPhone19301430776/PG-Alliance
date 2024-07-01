// 登录的返回值类型
export interface postLoginDataType {
  id: number
  name: string
  token: string
}
export interface postLoginType {
  code: number
  data: postLoginDataType
  message: null | string
}

// 注册的返回值类型
export interface postCreateType {
  code: number
  message: string
}

// 用户信息的返回值类型
export type getUserInfoDataType = {
  id: number
  name: string
  avatarUrl: string
  createAt: string
  introduction: string
  job_info: string
  job_direction: string
  collections: Array<{
    id: number
    title: string
    views: number
    thumbs: number
    content: string
    createAt: string
    updateAt: string
    commentCount: number
    introduction: string
    collectionCount: number
  }>
  myMoment: Array<{
    id: number
    title: string
    views: number
    thumbs: number
    content: string
    createAt: string
    updateAt: string
    commentCount: number
    introduction: string
    collectionCount: number
    labels: Array<{
      id: number
      name: string
    }>
    authorInfo: {
      id: number
      name: string
      avatarUrl: string
    }
  }>
}
export type getUserInfoType = {
  code: number
  data: getUserInfoDataType
}

// 更新用户的参数类型
export type patchUserInfoParamType = {
  job_direction: string
  introduction?: string
  job_info?: string
}
