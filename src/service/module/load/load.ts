import dcRequest from '@/service'

export function postFileAvatar(params: any) {
  return dcRequest.post<any>({
    url: '/file/avatar',
    data: params,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userInfo') || '{}')
        ?.token,
      'content-type': 'multipart/form-data'
    }
  })
}
