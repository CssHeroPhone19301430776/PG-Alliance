import {
  deleteThumbRemove,
  getCategoryList,
  getLabelList,
  getMomentList,
  getThumbByUserId,
  patchMomentViews,
  postThumbCreate,
  selectMomentList
} from '@/service/module/main/main'
import {
  deleteConcern,
  getConcernList,
  postConcernCreate,
  postMoment
} from '@/service/module/moment/moment'
import type {
  categoryListDataType,
  concernListDataType,
  labelListDataType,
  momentListDataType,
  momentListParamsType
} from '@/types/service/main'
import type {
  createMomentParamType,
  getThumbByUserIdType,
  patchMomentViewsParamType
} from '@/types/service/moment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMainStore = defineStore(
  'mainStore',
  () => {
    // 当前分类
    const category = ref<string>('综合')
    // 分类的列表数据
    const categoryList = ref<categoryListDataType[]>()
    const momentList = ref<momentListDataType[]>()
    const thumbsListByUser = ref<getThumbByUserIdType['data']>([])
    // 标签列表的数据
    const labelList = ref<labelListDataType[]>()
    // 关注列表的数据
    const concernList = ref<concernListDataType>()
    // 当前用户的关注信息
    const currentConcernList = ref<concernListDataType>()
    // 模糊查询的文章列表
    const searchMoment = ref<any[]>([])

    // ----------------------------------------请求函数----------------------------------------
    // 1.获取分类列表的数据，并赋值给category
    async function getCategoryListData() {
      const data = await getCategoryList()
      categoryList.value = data.data
    }

    // 2.获取根据不同的分类渲染不同的列表
    async function getMomentListData(params: momentListParamsType) {
      const data = await getMomentList(params)
      momentList.value = data.data
    }

    // 3.修改文章浏览次数
    async function patchMomentViewsData(data: patchMomentViewsParamType) {
      const res = await patchMomentViews(data)
      return res
    }

    // 4.根据用户的id,查看给哪些文章点赞
    async function getThumbByUserIdData(userId: number) {
      const data = await getThumbByUserId(userId)
      thumbsListByUser.value = data.data
      return data
    }

    // 5.添加点赞
    async function postThumbCreateData(momentId: number) {
      const res = await postThumbCreate(momentId)
      return res
    }

    // 6.移除点赞
    async function deleteThumbRemoveData(momentId: number) {
      const res = await deleteThumbRemove(momentId)
      return res
    }

    // 7.获取标签列表
    async function getLabelListData() {
      const res = await getLabelList()
      labelList.value = res.data
    }

    // 8.创建文章
    async function postMomentData(data: createMomentParamType) {
      const res = await postMoment(data)
      return res
    }

    // 9.获取关注列表
    async function getConcernListData(selectedId: number) {
      const res = await getConcernList(selectedId)
      concernList.value = res.message[0]
      return res
    }
    // 获取当前用户的关注列表
    async function getCurrentListData(selectedId: number) {
      const res = await getConcernList(selectedId)
      currentConcernList.value = res.message[0]
    }
    // 添加关注
    async function postConcernCreateData(selectId: number) {
      const res = await postConcernCreate(selectId)
      await getConcernListData(selectId)
      return res
    }
    // 移除关注
    async function removeConcernData(selectId: number) {
      const res = await deleteConcern(selectId)
      await getConcernListData(selectId)
      return res
    }
    // 模糊查询文章列表
    async function getSelectMomentListData(name: string) {
      const res = await selectMomentList(name)
      searchMoment.value = res.data
      return res
    }
    return {
      category,
      categoryList,
      momentList,
      thumbsListByUser,
      labelList,
      concernList,
      currentConcernList,
      searchMoment,
      getCategoryListData,
      getMomentListData,
      patchMomentViewsData,
      getThumbByUserIdData,
      postThumbCreateData,
      deleteThumbRemoveData,
      getLabelListData,
      postMomentData,
      getConcernListData,
      postConcernCreateData,
      removeConcernData,
      getCurrentListData,
      getSelectMomentListData
    }
  },
  {
    persist: {
      key: 'mainInfo',
      storage: sessionStorage,
      paths: ['categoryList', 'category']
    }
  }
)
export default useMainStore
