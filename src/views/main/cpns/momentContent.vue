<template>
  <a-list hoverable>
    <a-list-item
      class="list-demo-item"
      action-layout="vertical"
      v-for="item in momentList"
      :key="item.id"
      @click="momentItemClick(item)"
    >
      <template #actions>
        <div class="momentInfo">
          <span>{{ item.authorInfo.name }}</span>
          <a-divider direction="vertical" />
          <span class="iconItem">
            <icon-eye size="16" /> {{ item.views }}
          </span>
          <span
            :class="{ active: thumbsMoment.includes(item.id) }"
            class="iconItem iconThumb"
          >
            <icon-heart
              :class="{ active: thumbsMoment.includes(item.id) }"
              size="16"
              @click.stop="thumbClick(item)"
            />
            {{ item.thumbs }}
          </span>
          <span class="iconItem">
            <icon-message size="16" /> {{ item.commentCount }}
          </span>
        </div>
        <div class="labels">
          <span v-for="iten in item.labels" :key="iten.id">
            <a-tag>{{ iten.name }}</a-tag>
          </span>
        </div>
      </template>
      <a-list-item-meta :title="item.title" :description="item.introduction">
        <template #avatar>
          <a-avatar shape="square">
            <a-image
              @click.stop="() => {}"
              :src="
                item.authorInfo.avatarUrl
                  ? item.authorInfo.avatarUrl
                  : 'some-error.png'
              "
            />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login/login'
import useMainStore from '@/stores/main/main'
import type { momentListDataType } from '@/types/service/main'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// 获取路由,进行路由跳转
const router = useRouter()
// 获取store
const mainStore = useMainStore()
const loginStore = useLoginStore()
const { currentUserInfo } = storeToRefs(loginStore)
const { momentList, thumbsListByUser } = storeToRefs(mainStore)

const emits = defineEmits(['visibleLogin'])

// 请求用户点赞文章的数据
const getThumbsData = async () => {
  if (currentUserInfo.value?.id) {
    await mainStore.getThumbByUserIdData(currentUserInfo.value.id)
  }
}
getThumbsData()

// 当前用户点赞的id列表
const thumbsMoment = computed(() => {
  const selectedArr = []
  for (const item of thumbsListByUser.value) {
    selectedArr.push(item.id)
  }
  return selectedArr
})

// 当点击文章时，进行页面跳转，并创建新的页面
const momentItemClick = async (item: momentListDataType) => {
  // 修改浏览次数
  let views = item.views
  const data = {
    views: views + 1,
    momentId: item.id
  }
  const res = await mainStore.patchMomentViewsData(data)
  console.log(res)

  const url = router.resolve({
    path: `/moment/${item.id}`
  })

  // 刷新页面,显示新的数据
  setTimeout(() => {
    location.reload()
  }, 0)

  // 打开新窗口
  window.open(url.href)
}

// 点赞按钮被点击
const thumbClick = async (item: momentListDataType) => {
  // 判断用户是否登录，如果未登录则弹出登录框
  if (currentUserInfo.value?.id) {
    // 增加点赞
    const res = await mainStore.postThumbCreateData(item.id)
    // 当已经点击该文章，则取消点赞
    if (res.code == -3003) {
      await mainStore.deleteThumbRemoveData(item.id)
      // 取消点赞后，点赞数量减一
      item.thumbs--
    } else {
      // 点赞成功后，点赞数量加一
      item.thumbs++
    }
    getThumbsData()
  } else {
    emits('visibleLogin')
  }
}
</script>

<style lang="less" scoped>
.active {
  color: #1171ee;
  fill: #1171ee;
}
.iconThumb:hover {
  color: #1171ee;
}
.momentInfo {
  display: flex;

  .iconItem {
    display: flex;
    justify-content: center;
    align-items: center;
    .arco-icon {
      margin-right: 3px;
    }
  }
}
:deep(.arco-list-item-meta-title) {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #252933;
}
:deep(.arco-list-item-meta-description) {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  line-height: 22px;
  color: #8a919f;
}
:deep(.arco-list-item-action) {
  justify-content: space-between;
}
:deep(.arco-list-item-action li) {
  font-size: 13px;
  color: #8a919f;
}
:deep(.arco-list-item-action li:nth-child(1) span) {
  margin-right: 10px;
}
:deep(.arco-list-item-action li:nth-child(1) span:nth-child(1)) {
  margin-right: 0px;
}
:deep(.arco-list-item) {
  cursor: pointer;
}

.labels {
  display: flex;
  justify-content: end;
}
.labels span {
  padding: 0 5px;

  :deep(.arco-tag) {
    color: #8a919f;
  }
}
:deep(.arco-image-img) {
  width: 200px;
  height: 200px;
}
</style>
