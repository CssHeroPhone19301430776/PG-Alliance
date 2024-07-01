import {
  getMomentInfo,
  postCollection,
  postCreateComment,
  postReplyComment,
  removeCollection
} from '@/service/module/moment/moment'
import type {
  createCommentParamType,
  momentInfoDataType,
  replyCommentParamType
} from '@/types/service/moment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMomentStore = defineStore('momentStore', () => {
  const currentMomentInfo = ref<momentInfoDataType>()
  // --------------请求函数--------------
  // 获取当前文章的详情信息
  async function getMomentInfoData(id: string) {
    const res = await getMomentInfo(id)
    currentMomentInfo.value = res.data
    return res
  }

  // 创建评论
  async function postCreateCommentData(data: createCommentParamType) {
    const res = await postCreateComment(data)
    return res
  }

  // 回复评论
  async function postReplayCommentData(data: replyCommentParamType) {
    const res = await postReplyComment(data)

    return res
  }

  // 添加收藏
  async function postCollectionData(momentId: number) {
    const res = await postCollection(momentId)
    return res
  }

  // 移除收藏
  async function removeCollectionData(momentId: number) {
    const res = await removeCollection(momentId)
    return res
  }

  return {
    currentMomentInfo,
    getMomentInfoData,
    postCreateCommentData,
    postReplayCommentData,
    postCollectionData,
    removeCollectionData
  }
})
