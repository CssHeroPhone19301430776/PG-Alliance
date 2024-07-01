/*
   分类列表类型
*/
// 1.分类列表的返回值类型
export interface categoryListType {
  code: number
  data: categoryListData[]
}
// 2.分类列表的数据类型
export interface categoryListDataType {
  id: number
  name: string
  createAt: string
  updateAt: string
  icon: string
}

/*
  文章列表类型
*/
// 1.文章列表的函数参数类型
export interface momentListParamsType {
  offset: number
  size: number
  category: string
}

// 2.文章列表返回值的数据类型
interface momentAuthorInfoType {
  id: number
  name: string
  createAt: string
  avatarUrl?: any
}

interface momentLabelType {
  id: number
  name: string
}

export interface momentListDataType {
  id: number
  title: string
  content: string
  introduction: string
  views: number
  category: string
  commentCount: number
  thumbs: number
  authorInfo: momentAuthorInfoType
  createAt: string
  updateAt: string
  labels: momentLabelType[]
}

export interface momentListType {
  code: number
  message: string
  data: momentListDataType[]
}

/*
  标签列表类型
*/
interface labelListDataType {
  id: number
  name: string
  createAt: string
  updateAt: string
}

interface labelListType {
  code: number
  message: string
  data: Array<labelListDataType>
}

/*
  关注列表类型
*/
export interface concernListType {
  code: number
  message: Array<concernListDataType>
}
export interface concernListDataType {
  curUserId: number
  name: string
  avatarUrl: string
  selectedUsers: Array<{
    id: number
    name: string
    jobInfo: null
    avatarUrl: string
    introduction: null
    jobDirection: null
  }>
}
