import dcRequest from '@/service'
import type { concernListType } from '@/types/service/main'
import type {
  createCommentParamType,
  createMomentParamType,
  momentInfoType,
  replyCommentParamType
} from '@/types/service/moment'

// 请求文章的详情数据
export function getMomentInfo(id: string) {
  return dcRequest.get<momentInfoType>({
    url: `/moment/info/${id}`
  })
}

// 创建文章
export function postMoment(data: createMomentParamType) {
  return dcRequest.post<any>({
    url: 'moment',
    data,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 创建评论
export async function postCreateComment(data: createCommentParamType) {
  return dcRequest.post({
    url: '/comment',
    data,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 回复评论
export async function postReplyComment(data: replyCommentParamType) {
  return dcRequest.post({
    url: '/comment/reply',
    data,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 添加收藏
export async function postCollection(momentId: number) {
  return dcRequest.post<any>({
    url: '/collection/create',
    data: {
      momentId
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 移除收藏
export async function removeCollection(momentId: number) {
  return dcRequest.delete({
    url: `/collection/remove/${momentId}`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 获取关注列表
export function getConcernList(selectedId: number) {
  return dcRequest.get<concernListType>({
    url: `/concern/list/${selectedId}`
  })
}

// 添加关注
export function postConcernCreate(selectId: number) {
  return dcRequest.post<any>({
    url: '/concern/create',
    data: {
      selectId
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 移除关注
export function deleteConcern(selectId: number) {
  return dcRequest.delete({
    url: '/concern/remove',
    data: {
      selectId
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}
