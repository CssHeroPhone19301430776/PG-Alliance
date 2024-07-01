import dcRequest from '@/service'
import type {
  getUserInfoType,
  patchUserInfoParamType,
  postCreateType,
  postLoginType
} from '@/types/service/login'

// 登录操作
export function postLogin(name: string, password: string) {
  return dcRequest.post<postLoginType>({
    url: '/login',
    data: {
      name,
      password
    }
  })
}

// 注册操作
export function postCreate(name: string, password: string) {
  return dcRequest.post<postCreateType>({
    url: '/user/create',
    data: {
      name,
      password
    }
  })
}

// 查询用户信息
export function getUserInfo(id: number) {
  return dcRequest.get<getUserInfoType>({
    url: `/user/${id}`
  })
}

// 更新用户数据
export function updataUserInfo(patchUserInfoParam: patchUserInfoParamType) {
  return dcRequest.patch<any>({
    url: '/user/updata',
    data: patchUserInfoParam,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')?.token
    }
  })
}
