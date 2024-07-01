<template>
  <nav-bar :select-keys="[0]"></nav-bar>
  <div class="notFound">
    <img class="img" src="@/assets/image/404_picture.svg" alt="404_picture" />
    <a-button type="primary" size="large" @click="backMain">回到首页</a-button>
  </div>
</template>

<script setup lang="ts">
import navBar from '@/components/navBar.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

// 跳转到首页
function backMain() {
  router.push({
    path: '/main'
  })
}
</script>

<style scoped>
.notFound {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img {
  margin-top: -5%;
  width: 20%;
}

.arco-btn {
  margin-top: 20px;
  border: 1px solid var(--PG-btn-border-normal);
  border-radius: 5px;
  background-color: aliceblue;
  color: #1e80ff;
}
</style>
