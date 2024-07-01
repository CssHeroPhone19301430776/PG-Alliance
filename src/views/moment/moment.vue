<template>
  <nav-bar :select-keys="[]"></nav-bar>
  <div class="moment-wrapper">
    <div class="moment" :class="{ readMoment: isRead }">
      <div class="content">
        <div class="top-wrapper">
          <h1 class="contentTitle">{{ currentMomentInfo?.title }}</h1>
          <div class="authorInfo">
            <div class="avatar">
              <avatar-image
                :size="34"
                :avatar="currentMomentInfo?.authorInfo.avatarUrl"
              ></avatar-image>
            </div>

            <div class="name item">
              {{ currentMomentInfo?.authorInfo.name }}
            </div>
            <div class="item">
              {{ currentMomentInfo?.authorInfo.jobInfo }}
            </div>
            <div class="createAt item">
              {{ formatDate(currentMomentInfo?.updateAt) }}
            </div>

            <div class="views item">
              <icon-eye /> {{ currentMomentInfo?.views }}
            </div>
          </div>
          <v-md-preview-html
            :html="currentMomentInfo?.content"
            preview-class="github-markdown-body"
          ></v-md-preview-html>
          <div class="labels">
            <div class="labelsInfo">
              标签：
              <template
                v-for="item in currentMomentInfo?.labels"
                :key="item.id"
              >
                <a-tag class="label">{{ item.name }}</a-tag>
              </template>
            </div>
          </div>
        </div>

        <div class="comment">
          <div class="title">评论 {{ commentNum?.length }}</div>
          <div class="createComment">
            <div class="img">
              <avatar-image
                :size="40"
                :avatar="currentMomentInfo?.authorInfo.avatarUrl"
              ></avatar-image>
            </div>
            <div class="createContent">
              <a-textarea
                v-model="commentContent"
                placeholder="平等表达，友善交流"
                :max-length="1000"
                allow-clear
                show-word-limit
                :auto-size="{
                  minRows: 4,
                  maxRows: 10
                }"
              />
              <div class="btn-wrapper">
                <a-button type="primary" @click="createComment">提交</a-button>
              </div>
            </div>
          </div>
          <div class="commentContentWrapper">
            <div class="commentListTitle">最新评论</div>
            <div v-show="commentListInfo[0]?.id">
              <template v-for="item in commentListInfo" :key="item.id">
                <div class="commentList">
                  <comment-list :currentList="item"></comment-list>
                </div>
              </template>
            </div>
            <div class="NotData" v-show="!commentListInfo[0]?.id">
              <a-empty />
            </div>
          </div>
        </div>
      </div>
      <div class="info-wrapper" v-if="!isRead">
        <div class="info">
          <div class="userInfo">
            <div class="avatarImage">
              <avatar-image
                :avatar="currentMomentInfo?.authorInfo.avatarUrl"
                :size="48"
              ></avatar-image>
            </div>
            <div class="introduction">
              <div class="name">{{ currentMomentInfo?.authorInfo.name }}</div>
              <div class="job">{{ currentMomentInfo?.authorInfo.jobInfo }}</div>
            </div>
            <div class="concern" v-if="currentUserInfo?.id != showUserInfo?.id">
              <a-button type="primary" @click="concernClick"
                >{{ isConcern ? '已' : '' }}关注</a-button
              >
            </div>
          </div>
          <div class="userMomentInfo">
            <div class="item">
              <div class="num">{{ showUserInfo?.myMoment.length || 0 }}</div>
              <div class="txt">文章</div>
            </div>
            <div class="item">
              <div class="num">{{ allViews }}</div>
              <div class="txt">阅读</div>
            </div>
            <div class="item">
              <div class="num">
                {{ concernList?.selectedUsers.length || 0 }}
              </div>
              <div class="txt">关注</div>
            </div>
          </div>
          <a-divider />
          <div class="assess-wrapper">
            <div
              class="thumbs item"
              :class="{
                thumbsActive: thumbsMoment.includes(id * 1)
              }"
              @click="thumbClick"
            >
              <icon-heart
                :class="{
                  thumbsActive: thumbsMoment.includes(id * 1)
                }"
              />
              <span>{{ currentMomentInfo?.thumbs }}</span>
            </div>
            <div
              class="collection item"
              :class="{ collectionActive: isCollection }"
              @click="collectionClick"
            >
              <icon-star :class="{ collectionActive: isCollection }" />
              <span>{{ currentMomentInfo?.collections }}</span>
            </div>
            <div class="read item" @click="showReadClick">
              <icon-eye-invisible />沉浸模式
            </div>
          </div>
        </div>
        <div class="otherMoment">
          <div class="title">相关推荐</div>
          <a-divider />
          <div class="momentList">待渲染的文章列表</div>
        </div>
      </div>
      <div v-if="isRead" class="showRead" @click="showReadClick">
        <div><icon-eye-invisible /> {{ isRead ? '退出' : '' }}沉浸模式</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMomentStore } from '@/stores/moment/moment'
import navBar from '@/components/navBar.vue'
import avatarImage from '@/components/avatarImage.vue'
import commentList from './cpns/commentList.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import formatDate from '@/utils/formatTime'
import { computed, ref } from 'vue'
import type { CommentType } from '@/types/service/moment'
import useMainStore from '@/stores/main/main'
import { useLoginStore } from '@/stores/login/login'

const route = useRoute()
const momentStore = useMomentStore()
const mainStore = useMainStore()
const loginStore = useLoginStore()
const { currentUserInfo, showUserInfo } = storeToRefs(loginStore)
const { currentMomentInfo } = storeToRefs(momentStore)
const { thumbsListByUser, concernList, currentConcernList } =
  storeToRefs(mainStore)

// 是否为沉浸模式
const isRead = ref(false)

// 获取当前文章的id
const id: any = route.params.id
// 获取当前登录者的id
const userId = currentUserInfo.value?.id

// 渲染当前登录的用户信息
async function getCurrentUserInfoFn() {
  if (userId) {
    await loginStore.getCurrentUserInfoData(userId)
  }
}
// 渲染当前文章作者的信息
async function getShowUserInfo() {
  // 获取当前文章作者的id
  const showId = currentMomentInfo.value?.authorInfo.id
  if (showId) {
    await loginStore.getUserInfoData(showId)
  }
}
// 请求关注列表数据
async function getConcernListInfo() {
  const showId = currentMomentInfo.value?.authorInfo.id
  if (showId) {
    await mainStore.getConcernListData(showId)
  }
}
// 获取当前关注列表信息
async function getCurrentConcernList() {
  if (userId) {
    await mainStore.getCurrentListData(userId)
  }
}
// 请求用户点赞文章的数据
const getThumbsData = async () => {
  if (userId) {
    await mainStore.getThumbByUserIdData(userId)
  }
}
// 获取当前文章的数据
async function getCurrentMomentData() {
  // 获取当前文章的数据
  await momentStore.getMomentInfoData(id)
  // 当请求文章数据成功时，获取文章作者信息和关注列表信息
  getShowUserInfo()
  getConcernListInfo()
}
// 统一请求需要渲染的数据
getCurrentMomentData()
getThumbsData()
getCurrentUserInfoFn()
getCurrentConcernList()

// 当前作者的阅读总量
const allViews = computed(() => {
  const allMoment = showUserInfo.value?.myMoment

  if (allMoment) {
    const num = allMoment.reduce((pre: any, cur: any) => {
      return pre + cur.views
    }, 0)
    return num
  }
  return 0
})

// 评论输入框的内容
const commentContent = ref()
// 点击提交后，创建评论
const createComment = async () => {
  await momentStore.postCreateCommentData({
    content: commentContent.value,
    moment_id: currentMomentInfo.value!.id
  })
  getCurrentMomentData()
}

// 获取当前评论的数量
const commentNum = computed(() => {
  // 如果第一个值是null，则直接返回0
  if (!currentMomentInfo.value?.comments[0].id) {
    return []
  }
  return currentMomentInfo.value.comments
})

// 获取需要渲染的评论列表
const commentListInfo = computed(() => {
  let list = currentMomentInfo.value?.comments
  let newArr: CommentType[] = []

  const indexArr: number[] = []
  if (list) {
    list.forEach((item, index) => {
      item['list'] = []
      // 当是给评论进行评论，则调用函数
      if (item.commentId) {
        selectComment(item, index)
      }
    })
  }

  function selectComment(currentItem: any, index: number) {
    if (list) {
      list.forEach((item) => {
        if (currentItem.commentId == item.id) {
          item.list.push(currentItem)
          indexArr.push(index)
        }
      })
    }
  }

  if (list) {
    newArr = list.filter((item) => !item.commentId)
  }

  return newArr.reverse()
})

// 判断当前用户是否已经关注
const isConcern = computed(() => {
  const selectedUsers = currentConcernList.value?.selectedUsers
  console.log(selectedUsers)

  const showUserId = showUserInfo.value?.id
  if (selectedUsers) {
    const res = selectedUsers.filter((item) => {
      return item.id == showUserId
    })

    return !!res.length
  }
  return false
})
// 点击关注
const concernClick = async () => {
  const showId = showUserInfo.value?.id
  if (showId) {
    const res = await mainStore.postConcernCreateData(showId)
    if (res.code == -3005) {
      await mainStore.removeConcernData(showId)
    }
    getCurrentConcernList()
  }
}

// 当前用户点赞的id列表
const thumbsMoment = computed(() => {
  const selectedArr: any[] = []
  thumbsListByUser.value.map((item) => {
    selectedArr.push(item.id)
  })
  return selectedArr
})

// 点击点赞按钮
const thumbClick = async () => {
  const res = await mainStore.postThumbCreateData(id)
  // 当已经点击该文章，则取消点赞
  if (res.code == -3003) {
    await mainStore.deleteThumbRemoveData(id)
    // 取消点赞后，点赞数量减一
  }
  getThumbsData()
  getCurrentMomentData()
}

// 当前文章是否已经收藏
const isCollection = computed(() => {
  // 获取当前用户的收藏列表
  const collectionsList = currentUserInfo.value?.collections
  // 如果收藏列表没有当前文章则返回false，反之为true
  if (collectionsList) {
    const res = collectionsList.filter((item) => {
      return item.id == id
    })

    return !!res.length
  }

  return false
})

// 点击收藏按钮
const collectionClick = async () => {
  // 添加收藏
  const res = await momentStore.postCollectionData(id)
  // 已收藏该文章，再次点击则移除
  if (res.code == -3001) {
    await momentStore.removeCollectionData(id)
  }
  getCurrentMomentData()
  getCurrentUserInfoFn()
}

// 点击沉浸模式
const showReadClick = () => {
  isRead.value = !isRead.value
}
</script>

<style lang="less" scoped>
.moment-wrapper {
  display: flex;
  justify-content: center;

  .moment {
    width: 1140px;
    margin-top: 21px;
    display: flex;
    justify-content: space-between;

    .showRead {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      margin-left: 8px;
      color: #1e80ff;
      cursor: pointer;
    }
    .content {
      width: 820px;
      box-sizing: border-box;
      .top-wrapper {
        background-color: #fff;
        padding: 32px;
        :deep(.github-markdown-body) {
          padding: 0;
        }
        .contentTitle {
          margin-top: 0;
          margin-bottom: 16px;
          font-size: 32px;
          font-weight: 600;
          line-height: 1.31;
          color: #252933;
        }
        .authorInfo {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .avatar {
            margin-right: 8px;
          }
          .item {
            margin-top: 5px;
            margin-right: 16px;
            height: 24px;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            color: #8a919f;
          }
          .name {
            color: #515767;
          }
        }

        .markdown-body {
          padding-top: 20px;
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
        }

        .labels {
          .labelsInfo {
            padding-top: 30px;
            padding-bottom: 10px;
            .label {
              padding: 0 12px;
              margin-right: 8px;
              color: #515767;
            }
          }
        }
      }

      .comment {
        width: 756px;
        padding: 32px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        .title {
          color: #252933;
          font-size: 18px;
          font-weight: 600;
          line-height: 30px;
        }
        .createComment {
          display: flex;
          margin-top: 20px;
          .img {
            margin-right: 16px;
          }

          .createContent {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 100%;
          }
          .arco-btn {
            margin-top: 20px;
            background-color: #1e80ff;
          }
        }
        .commentContentWrapper {
          width: 100%;

          .NotData {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 256px;
          }

          .commentListTitle {
            color: #1e80ff;
            font-size: 15px;
            line-height: 30px;
            margin-bottom: 8px;
          }
          .commentList {
            padding: 8px 0;
            :deep(.arco-comment-inner-comment) {
              margin: 0;
              .arco-comment {
                margin-top: 4px;
                padding: 8px 0;
              }
            }
          }
        }
      }
    }

    .info {
      width: 300px;
      padding: 20px;
      margin-bottom: 18px;
      background-color: #fff;
      box-sizing: border-box;
      .userInfo {
        display: flex;
        align-items: center;
        padding-bottom: 8px;
        .avatarImage {
          .arco-avatar {
            margin-right: 8px;
            height: 60px !important;
          }
        }
        .introduction {
          width: 130px;
          .name {
            color: #252933;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.8rem;
          }
          .job {
            color: #8a919f;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            line-height: 22px;
          }
        }
        .concern {
          .arco-btn {
            background-color: var(--primary-color);
          }
        }
      }
      .userMomentInfo {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 54px;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .num {
            color: #252933;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
          }
          .txt {
            color: #8a919f;
            font-size: 13px;
            font-weight: 400;
            line-height: 22px;
          }
        }
      }
      .assess-wrapper {
        display: flex;
        color: #8a919f;
        justify-content: space-around;
        cursor: pointer;
        .thumbsActive,
        .collectionActive {
          color: #1e80ff;
        }
        .item {
          display: flex;
          justify-content: center;
          width: 70px;
          .thumbsActive,
          .collectionActive {
            fill: #1e80ff;
          }
        }
        .item:hover {
          color: #1e80ff;
        }
      }
    }
    .otherMoment {
      width: 260px;
      padding: 16px 20px;
      background-color: #fff;
    }
  }
  .readMoment {
    justify-content: center;
  }
}
</style>
