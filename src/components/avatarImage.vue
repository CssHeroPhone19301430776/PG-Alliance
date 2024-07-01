<template>
  <a-avatar :size="props.size || 30" shape="square">
    <a-image :src="props.avatar || 'some-error.png'" />
  </a-avatar>
</template>

<script setup lang="ts">
let props = defineProps<{
  avatar: string | undefined
  size?: number
}>()
</script>

<style lang="less" scoped>
.arco-avatar {
  background-color: #fff;
  :deep(.arco-image-img) {
    background-color: #fff;
    overflow: hidden;
    border-radius: 50%;
  }
}
</style>
