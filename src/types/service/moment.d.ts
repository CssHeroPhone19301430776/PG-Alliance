// 获取文章的详情数据
interface AuthorInfoType {
  id: number
  name: string
  jobInfo?: any
  createAt: string
  avatarUrl?: any
  introduction?: any
  jobDirection?: any
}

interface UserType {
  id?: any
  name?: any
  avatarUrl: string
  jobInfo: string
}

interface CommentType {
  id?: any
  user: UserType
  content?: any
  commentId?: any
  list?: any
}

export interface LabelType {
  id: number
  name: string
}

export interface momentInfoDataType {
  id: number
  title: string
  content: string
  introduction: string
  views: number
  thumbs: number
  collections: number
  authorInfo: AuthorInfoType
  comments: CommentType[]
  createAt: string
  updateAt: string
  labels: LabelType[]
}

export interface momentInfoType {
  code: number
  data: momentInfoDataType
}

// -------------------------------------------------------------------
// 修改文章浏览次数
export interface patchMomentViewsParamType {
  views: number
  momentId: number
}

// 当前用户点赞哪些文章
export interface getThumbByUserIdType {
  code: number
  message: string
  data: Array<getThumbByUserIdDataType> | never[]
}

export interface getThumbByUserIdDataType {
  id: number
  title: string
  content: string
  views: number
  introduction: string
  commentCount: number
  thumbs: number
  authorInfo: {
    id: number
    name: string
    createAt: string
    avatarUrl: string
  }
  createAt: string
  updateAt: string
}

// 创建文章
interface createMomentParamType {
  content: string
  title: string
  labels: Array<string>
  introduction: string
  categoryId: number | undefined
}

// 创建评论
// 参数类型
interface createCommentParamType {
  content: string
  moment_id: number
}

// 回复评论参数类型
interface replyCommentParamType {
  content: string
  moment_id: number
  comment_id: number
}
