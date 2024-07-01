<template>
  <div class="wrapper">
    <div class="title">
      <div class="icon-wrapper"><icon-user-group /></div>
      作者榜
    </div>
    <a-divider />

    <div class="content-wrapper" v-for="i in 4" :key="i">
      <div class="img">
        <avatarImage
          avatar="http://8.138.2.97:8000/file/avatar/10"
        ></avatarImage>
      </div>
      <div class="content">
        <div class="item">
          <div class="name">CssHero</div>
          <div class="jobInfo">前端摸鱼大师</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarImage from '@/components/avatarImage.vue'
</script>

<style lang="less" scoped>
.wrapper {
  width: 180px;
  padding: 12px 8px;
  background-color: #fff;
  .arco-divider {
    margin-top: 8px;
    margin-bottom: 0;
  }
  .title {
    display: flex;
    font-weight: 500;
    padding: 0 8px;
    font-size: 16px;
    line-height: 24px;
    color: #252933;
    .icon-wrapper {
      display: flex;
      margin-right: 8px;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      background-color: #96c8ff;
      border-radius: 50%;
      .arco-icon {
        color: #fff;
      }
    }
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    padding: 8px;
    padding-bottom: 0;
    height: 42px;
    .img {
      margin-right: 8px;
    }
    .content {
      .item {
        .name {
          font-size: 14px;
          color: #252933;
        }
        .jobInfo {
          font-size: 12px;
          color: #515767;
        }
      }
    }
  }
}
</style>
