<template>
  <div class="userLabel">
    <div class="concernInfo">
      <div class="concernUser">
        <span>关注</span>
        <span class="count">{{ concernList?.selectedUsers.length }}</span>
      </div>
      <a-divider direction="vertical" />
      <div class="concernUser">
        <span>文章</span>
        <span class="count">{{ showUserInfo?.myMoment.length }}</span>
      </div>
    </div>
    <div class="achievements">
      <div class="title">个人成就</div>
      <a-divider />
      <div class="item-wrapper">
        <div class="item">
          <div class="icon-wrapper">
            <icon-thumb-up />
          </div>
          <div class="contentInfo">文章被点赞 {{ thumbsNum }}</div>
        </div>
        <div class="item">
          <div class="icon-wrapper">
            <icon-eye />
          </div>
          <div class="contentInfo">文章被阅读 {{ viewsNum }}</div>
        </div>
        <div class="item">
          <div class="icon-wrapper">
            <icon-star />
          </div>
          <div class="contentInfo">文章被收藏 {{ collectionNum }}</div>
        </div>
      </div>
    </div>
    <div class="otherInfo">
      <a-divider />
      <div class="item">
        <div class="left">收藏夹</div>
        <div class="right">{{ collectionNum }}</div>
      </div>
      <a-divider />
      <div class="item">
        <div class="left">加入于</div>
        <div class="right">{{ formatDate(showUserInfo?.createAt) }}</div>
      </div>
      <a-divider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login/login'
import useMainStore from '@/stores/main/main'
import formatDate from '@/utils/formatTime'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const loginStore = useLoginStore()
const mainStore = useMainStore()
const { showUserInfo } = storeToRefs(loginStore)
const { concernList } = storeToRefs(mainStore)
watch(showUserInfo, async (newValue) => {
  if (newValue) {
    await mainStore.getConcernListData(newValue.id)
    await mainStore.getThumbByUserIdData(newValue.id)
  }
})

// 浏览总数
const viewsNum = computed(() => {
  const momentList = showUserInfo.value?.myMoment
  if (momentList) {
    const num = momentList.reduce((pre: any, cur: any) => {
      return pre + cur.views
    }, 0)
    return num
  }
  return 0
})
const thumbsNum = computed(() => {
  const momentList = showUserInfo.value?.myMoment
  if (momentList) {
    const num = momentList.reduce((pre: any, cur: any) => {
      return pre + cur.thumbs
    }, 0)
    return num
  }
  return 0
})
const collectionNum = computed(() => {
  const momentList = showUserInfo.value?.myMoment
  if (momentList) {
    const num = momentList.reduce((pre: any, cur: any) => {
      return pre + cur.collectionCount
    }, 0)
    return num
  }
  return 0
})
</script>

<style lang="less" scoped>
.userLabel {
  width: 240px;
  height: 246px;
  position: sticky;
  top: 10px;
  .concernInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    background-color: #fff;
    margin-bottom: 12px;
    .arco-divider {
      height: 37px;
    }
    .concernUser {
      width: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 16px;
      color: #31445b;
      .count {
        font-weight: 700;
        margin-top: 6px;
      }
    }
  }
  .achievements {
    height: 179px;
    background-color: #fff;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #31445b;
      padding: 16px;
    }
    .arco-divider {
      margin: 0;
    }
    .item-wrapper {
      padding: 16px;
      .item {
        height: 26px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: #000;
        font-size: 13px;
        .icon-wrapper {
          width: 25px;
          height: 25px;
          background-color: rgb(225, 239, 255);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;

          .arco-icon {
            font-size: 16px;
            color: skyblue;
          }
        }
      }
    }
  }
  .otherInfo {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      font-size: 15px;
    }
  }
}
</style>
