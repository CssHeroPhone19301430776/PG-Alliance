<template>
  <a-list hoverable>
    <a-list-item
      class="list-demo-item"
      action-layout="vertical"
      v-for="item in props.info"
      :key="item.id"
      @click="momentItemClick(item)"
    >
      <template #actions>
        <div class="momentInfo">
          <span>{{ item.authorInfo.name }}</span>
          <a-divider direction="vertical" />
          <span><icon-eye size="16" /> {{ item.views }}</span>
          <span><icon-heart size="16" /> {{ item.thumbs }}</span>
          <span><icon-message size="16" /> {{ item.commentCount }}</span>
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
import { useRouter } from 'vue-router'

const props = defineProps(['info'])

// 获取路由,进行路由跳转
const router = useRouter()

// 当点击文章时，进行页面跳转，并创建新的页面
const momentItemClick = (item: any) => {
  const url = router.resolve({
    path: `/moment/${item.id}`
  })
  // 打开新窗口
  window.open(url.href)
}
</script>

<style lang="less" scoped>
:deep(.arco-list-item) {
  padding: 13px 20px !important;
  width: 708px;
}
:deep(.arco-list-item-meta-title) {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #252933;
}
:deep(.arco-list-item-meta-description) {
  overflow: hidden;
  width: 570px;
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
:deep(.arco-scrollbar-container) {
  border: none;
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
