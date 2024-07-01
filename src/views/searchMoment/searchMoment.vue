<template>
  <div class="wrapper-main">
    <nav-bar @login="loginBtn" :select-keys="selectKey"></nav-bar>
    <login
      @close-down="
        (value) => {
          visible = value
        }
      "
      v-if="visible"
    />
    <div class="content-wrapper">
      <div class="content">
        <div class="main" ref="container">
          <searchMomentList></searchMomentList>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import navBar from '@/components/navBar.vue'
import searchMomentList from './cpns/searchMomentList.vue'
import login from '../login/login.vue'
import { ref } from 'vue'

// 定义navbar中被选中的值
const selectKey = ref(['main'])

// 获取mainStore

const visible = ref(false)

// 点击登录按钮时，进行登录或注册操作
const loginBtn = () => {
  visible.value = true
}
</script>

<style lang="less" scoped>
.content-wrapper {
  display: flex;
  justify-content: center;
  .content {
    width: 1200px;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .main {
      width: 720px;
      background-color: #fff;
    }
  }
}
</style>
