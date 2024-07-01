<template>
  <template v-for="item in concernListData.selectedUsers" :key="item.id">
    <div class="concernWrapper">
      <div class="img">
        <avatar-image :avatar="item.avatarUrl" :size="45"></avatar-image>
      </div>
      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="jobInfo">{{ item.jobInfo }}</div>
      </div>
      <a-button :size="'large'" type="primary" status="success"
        >已关注</a-button
      >
    </div>
  </template>
</template>

<script setup lang="ts">
import type { concernListDataType } from '@/types/service/main'
import avatarImage from '@/components/avatarImage.vue'

const props = defineProps<{
  concernListData: concernListDataType
}>()
</script>

<style lang="less" scoped>
:global(.arco-tabs-content) {
  padding-top: 0;
}
.concernWrapper {
  padding: 6px 28.8px;
  height: 84px;
  display: flex;
  align-items: center;
  .img {
    margin-right: 20px;
  }
  .info {
    width: 483px;
    .name {
      font-size: 16px;
      font-weight: 600;
      color: #2e3135;
    }
    .jobInfo {
      margin-top: 0.6rem;
      font-size: 12px;
      font-weight: 500;
      color: #b9c0c8;
    }
  }
  .arco-btn {
    width: 90px;
    margin-left: 12px;
  }
}
</style>
