import dcRequest from '@/service'
import type {
  categoryListType,
  labelListType,
  momentListParamsType,
  momentListType
} from '@/types/service/main'
import type {
  getThumbByUserIdType,
  patchMomentViewsParamType
} from '@/types/service/moment'

// 1.获取分类列表的数据
export function getCategoryList() {
  return dcRequest.get<categoryListType>({
    url: '/moment/category'
  })
}

// 2.获取文章列表数据
export function getMomentList(params: momentListParamsType) {
  return dcRequest.get<momentListType>({
    url: '/moment/list',
    params
  })
}

// 3.修改文章的浏览次数
export function patchMomentViews(data: patchMomentViewsParamType) {
  return dcRequest.patch({
    url: '/moment/updataViews',
    data
  })
}

// 4.查询当前用户给哪些文章点赞
export function getThumbByUserId(userId: number) {
  return dcRequest.get<getThumbByUserIdType>({
    url: `/thumb/moment/${userId}`
  })
}

// 5.添加点赞
export function postThumbCreate(momentId: number) {
  return dcRequest.post<any>({
    url: '/thumb/create',
    data: {
      momentId
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 6.取消点赞
export function deleteThumbRemove(momentId: number) {
  return dcRequest.delete({
    url: '/thumb/remove',
    data: {
      momentId
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}

// 7.获取标签列表
export function getLabelList() {
  return dcRequest.get<labelListType>({
    url: '/label/list',
    params: {
      offset: 0,
      size: 30
    }
  })
}

// 模糊查询文章列表
export function selectMomentList(name: string) {
  return dcRequest.get<any>({
    url: '/moment/selectMoment',
    params: {
      name
    }
  })
}
