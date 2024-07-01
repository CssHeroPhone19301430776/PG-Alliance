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
        <div class="sideBar">
          <side-bar-category @change-category="changeMomentList" />
        </div>
        <div class="main" ref="container">
          <moment-content @visible-login="loginBtn" />
        </div>
        <div class="sideBar">
          <side-bar-moment />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { momentListParamsType } from '@/types/service/main'
import navBar from '@/components/navBar.vue'
import momentContent from '@/views/main/cpns/momentContent.vue'
import login from '../login/login.vue'
import sideBarCategory from './cpns/sideBarCategory.vue'
import sideBarMoment from './cpns/sidBarMoment.vue'
import useMainStore from '@/stores/main/main'
import { ref } from 'vue'

// 定义navbar中被选中的值
const selectKey = ref(['main'])

// 获取mainStore
const mainStore = useMainStore()

const getMomentList = async (category: string) => {
  // 获取文章列表的请求参数
  const params: momentListParamsType = {
    category,
    offset: 0,
    size: 30
  }
  // 获取文章列表
  await mainStore.getMomentListData(params)
}
// 切换文章列表
const changeMomentList = (key: any) => {
  getMomentList(key)
}
getMomentList('综合')

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
    .sideBar {
      height: 10px;
      position: sticky;
      top: 10px;
    }
    .main {
      width: 720px;
      background-color: #fff;
    }
  }
}
</style>
