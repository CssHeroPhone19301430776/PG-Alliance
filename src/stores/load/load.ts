import { postFileAvatar } from '@/service/module/load/load'
import { defineStore } from 'pinia'

export const useLoadStore = defineStore('loadStore', () => {
  const postFileAvatarData = async (params: any) => {
    const res = await postFileAvatar(params)
    return res
  }
  return {
    postFileAvatarData
  }
})
