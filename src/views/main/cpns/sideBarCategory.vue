<template>
  <div class="menu-demo">
    <a-menu
      :default-selected-keys="['综合']"
      :style="{ width: '180px' }"
      breakpoint="xl"
      @menu-item-click="selectedKeys"
    >
      <a-menu-item v-for="item in categoryList" :key="item.name">
        <template #icon>
          <component :is="item.icon" />
        </template>
        <div class="item">
          <span class="item-name">{{ item.name }}</span>
        </div>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['changeCategory'])

const mainStore = useMainStore()

// 获取文章分类的数据列表，并发送网络请求
const { category, categoryList } = storeToRefs(mainStore)
mainStore.getCategoryListData()

// 切换分类数据时，修改store的category值
const selectedKeys = (key: string) => {
  category.value = key
  // 发出自定义事件，重新渲染值
  emit('changeCategory', key)
}
</script>

<style lang="less" scoped>
.menu-demo {
  :deep(.arco-menu-inner) {
    padding: 8px;
  }
  :deep(.arco-menu-selected) {
    background-color: #eaf2ff;
  }
  :deep(.arco-menu-item) {
    margin-top: 7px;
    padding: 0 15px;

    .item-name {
      font-size: 16px;
    }
  }
}
:deep(.arco-menu-icon) {
  font-size: 16px;
}
</style>
