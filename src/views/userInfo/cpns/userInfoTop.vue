<template>
  <div class="picture">
    <a-avatar
      class="image"
      :imageUrl="showUserInfo?.avatarUrl"
      :style="{
        verticalAlign: 'middle',
        backgroundColor: '#14a9f8'
      }"
    >
      {{ showUserInfo?.name.slice(0, 1) }}
    </a-avatar>
  </div>
  <div class="user-direction">
    <div class="userName">
      <div class="left"><icon-bytedance-color /> {{ showUserInfo?.name }}</div>

      <div class="right">
        <icon-code-sandbox />
      </div>
    </div>
    <div class="direction">
      <div class="left">
        <div class="job-info">
          <span v-if="showUserInfo?.job_info" :style="{ color: '#72777b' }">
            <icon-file-pdf /> {{ showUserInfo?.job_info }}
          </span>
          <span
            v-else
            :style="{ color: '#4a68ad', cursor: 'pointer' }"
            @click="jumpSetUser"
          >
            {{ '+ 你从事什么职业？' }}
          </span>
        </div>

        <div class="introduction">
          <span
            class="introduction-text"
            v-if="showUserInfo?.introduction"
            :style="{ color: '#72777b' }"
          >
            <icon-idcard /> {{ showUserInfo?.introduction }}
          </span>
          <span
            v-else
            :style="{ color: '#4a68ad', cursor: 'pointer' }"
            @click="jumpSetUser"
          >
            {{ '+ 你的人生格言是什么？' }}
          </span>
        </div>
      </div>
      <div class="right">
        <a-button type="outline" @click="jumpSetUser">设置</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login/login'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()
const router = useRouter()
const { showUserInfo } = storeToRefs(loginStore)

const jumpSetUser = () => {
  router.push('/setting/user')
}
</script>

<style lang="less" scoped>
.image {
  margin-top: 8px;
  width: 90px;
  height: 90px;
}
.user-direction {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  .userName {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    color: #000;
    margin-top: 4px;
    .right {
      margin-right: 5px;
      cursor: pointer;
      color: #999;
    }
  }
  .direction {
    width: 530px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 48px;
      font-size: 15px;
      .introduction {
        width: 430px;
        align-items: center;
        margin-top: 8px;
        .introduction-text {
          line-height: 1.5;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .right {
      .arco-btn-outline {
        border: 1px solid #007fff;
        color: #007fff;
      }
    }
  }
}
</style>
