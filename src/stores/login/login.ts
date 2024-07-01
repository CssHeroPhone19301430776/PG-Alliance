import {
  getUserInfo,
  postCreate,
  postLogin,
  updataUserInfo
} from '@/service/module/login/login'
import type {
  getUserInfoDataType,
  patchUserInfoParamType
} from '@/types/service/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore(
  'loginStore',
  () => {
    const token = ref<string>()
    const userName = ref<string>()
    const currentUserInfo = ref<getUserInfoDataType>()
    const showUserInfo = ref<getUserInfoDataType>()

    // 获取需要展示的用户信息
    const getUserInfoData = async (id: number) => {
      const res = await getUserInfo(id)

      showUserInfo.value = res.data
      return res
    }

    // 获取当前登录的用户数据
    const getCurrentUserInfoData = async (id: any) => {
      const userInfoRes = await getUserInfo(id)
      currentUserInfo.value = userInfoRes.data
      return userInfoRes
    }

    // 登录操作
    const postLoginData = async (name: string, password: string) => {
      const res = await postLogin(name, password)
      if (res.data) {
        userName.value = name
        token.value = res.data.token
      }
      // 获取当前登录的用户数据
      await getCurrentUserInfoData(res.data.id)
      return res
    }

    // 注册操作
    const postCreateData = async (name: string, password: string) => {
      const res = await postCreate(name, password)
      return res
    }

    // 更新用户信息操作
    const patchUserInfoData = async (param: patchUserInfoParamType) => {
      const res = await updataUserInfo(param)
      // 重新获取当前登录的用户数据
      if (currentUserInfo.value?.id) {
        await getCurrentUserInfoData(res.data.id)
        console.log(res)
      }
      return res
    }

    return {
      token,
      userName,
      currentUserInfo,
      showUserInfo,
      postLoginData,
      postCreateData,
      getUserInfoData,
      patchUserInfoData,
      getCurrentUserInfoData
    }
  },
  {
    persist: {
      key: 'userInfo',
      paths: ['userName', 'token', 'currentUserInfo']
    }
  }
)
