<template>
  <nav-bar :select-keys="[0]" />

  <div class="content-wrapper">
    <div class="content">
      <div class="userInfo">
        <div class="top">
          <user-info-top></user-info-top>
        </div>

        <div class="bottom">
          <user-info-tabs></user-info-tabs>
        </div>
      </div>
      <user-label></user-label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login/login'
import navBar from '@/components/navBar.vue'
import userLabel from './cpns/userLabel.vue'
import userInfoTabs from './cpns/userInfoTabs.vue'
import userInfoTop from './cpns/userInfoTop.vue'

// 获取当前需要展示的user的id
const route = useRoute()
const id: any = route.params.id
// 获取需要展示的用户数据
const loginStore = useLoginStore()

loginStore.getUserInfoData(id)
</script>

<style lang="less" scoped>
.content-wrapper {
  display: flex;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    width: 960px;
    margin-top: 21px;
    margin-bottom: 72px;
    .userInfo {
      .top {
        display: flex;
        justify-content: space-between;
        width: 648px;
        height: 115px;
        padding: 30px;
        padding-bottom: 20px;
        margin-bottom: 12px;
        background-color: #fff;
      }
      .bottom {
        width: 708px;
        overflow: hidden;
        background-color: #fff;
        margin-top: 12px;
      }
    }
  }
}
</style>
