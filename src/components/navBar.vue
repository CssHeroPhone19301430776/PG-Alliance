<template>
  <div class="menu">
    <a-menu mode="horizontal" :default-selected-keys="props.selectKeys">
      <div class="logo">
        <img class="img" src="/ico.svg" alt="ico_img" />
        <div class="info">PG-Alliance</div>
      </div>
      <a-menu-item key="main" @click="jumpMain">首页</a-menu-item>
      <a-menu-item key="hot">动态</a-menu-item>
      <a-input-search
        v-model="searchText"
        :style="{ width: '320px' }"
        placeholder="探索PG-Alliance"
        search-button
        @search="searchFn"
      />
    </a-menu>

    <div class="user">
      <div class="create-center">
        <a-button @click="markdownEditor" type="primary" size="large">
          创作者中心
          <icon-edit />
        </a-button>
      </div>

      <div class="user-login">
        <a-button v-show="!currentUserInfo" @click="loginBtn" size="large">
          <span>登录</span>
          <a-divider direction="vertical" />
          <span>注册</span>
        </a-button>

        <!-- 登录成功时显示用户头像信息 -->

        <!-- 展示信息接收铃铛 -->
        <a-badge v-show="currentUserInfo" :count="1" dot>
          <IconNotification
            :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
          />
        </a-badge>
        <!-- 用户详情信息 -->
        <a-popover
          position="bottom"
          content-class="currentUserInfo"
          trigger="click"
        >
          <a-avatar
            class="image"
            v-show="currentUserInfo"
            :imageUrl="currentUserInfo?.avatarUrl"
            :style="{
              verticalAlign: 'middle',
              backgroundColor: '#14a9f8'
            }"
          >
            {{ currentUserInfo?.name.slice(0, 1) }}
          </a-avatar>

          <!-- 用户信息的展示 -->
          <template #content>
            <div class="head">
              <a-avatar
                class="image"
                :imageUrl="currentUserInfo?.avatarUrl"
                :style="{
                  verticalAlign: 'middle',
                  backgroundColor: '#14a9f8'
                }"
              >
                {{ currentUserInfo?.name.slice(0, 1) }}
              </a-avatar>
              <div class="userName">
                <div class="name" @click="jumpUserInfo">
                  {{ currentUserInfo!.name }}
                </div>
                <div class="title">
                  职业：{{
                    currentUserInfo?.job_direction
                      ? currentUserInfo?.job_direction
                      : '未知'
                  }}
                </div>
              </div>
            </div>
            <div class="content">
              <div class="item">
                <div class="count">0</div>
                <div class="item-info">关注</div>
              </div>
              <div class="item">
                <div class="count">0</div>
                <div class="item-info">赞过</div>
              </div>
              <div class="item">
                <div class="count">0</div>
                <div class="item-info">收藏</div>
              </div>
            </div>
            <a-divider />
            <div class="footer">
              <div class="set" @click="jumpSetUser">我的设置</div>
              <a-popconfirm
                content="确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者！"
                position="lt"
                :popup-visible="closePopVisible"
                @ok="confirmCloseLogin"
                @cancel="closePopVisible = false"
                okText="确定"
                cancelText="取消"
              >
                <template #icon>
                  <icon-bytedance-color />
                </template>
                <div class="close_login" @click="closeBtn">退出登录</div>
              </a-popconfirm>
            </div>
          </template>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login/login'
import useMainStore from '@/stores/main/main'
import { Message } from '@arco-design/web-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 自定义事件
const emits = defineEmits(['login'])

const loginStore = useLoginStore()
const mainStore = useMainStore()
const { currentUserInfo } = storeToRefs(loginStore)
const props = defineProps<{
  selectKeys: any[]
}>()

// 搜索框的文本内容
const searchText = ref()
// 搜索对应的内容
const searchFn = async () => {
  const res = await mainStore.getSelectMomentListData(searchText.value)
  console.log(res)
  router.push('/search/momentList')
}

// 当点击登录或者注册时，发出自定义事件
const loginBtn = () => {
  emits('login')
}

// 创建文本内容
const markdownEditor = () => {
  if (currentUserInfo.value) {
    router.push('/editor/markdown')
  } else {
    Message.error('用户未登录')
  }
}

// 跳转到首页
const jumpMain = () => {
  router.push('/main')
}

// 跳转到个人资料设置
const jumpSetUser = () => {
  router.push('/setting/user')
}

// 跳转到个人信息页
const jumpUserInfo = () => {
  router.push(`/userInfo/${currentUserInfo.value?.id}`)
}

// 退出登录的消息弹出窗
const closePopVisible = ref(false)

// 退出登录
const closeBtn = () => {
  closePopVisible.value = true
}
// 确认退出
const confirmCloseLogin = () => {
  // 确认框隐藏
  closePopVisible.value = false

  // 退出登录的操作
  localStorage.removeItem('userInfo')

  router.push('/main')

  setTimeout(() => {
    location.reload()
  }, 50)
}
</script>

<style lang="less" scoped>
:deep(.arco-menu-overflow-wrap) {
  display: flex;
}
.menu {
  display: flex;
  padding: 0 7%;
  background-color: #fff;
  box-shadow: 0 2px 8px #f2f3f5;
}
.logo {
  display: flex;
  width: 150px;

  .img {
    width: 30px;
  }
  .info {
    font-size: 20px;
    margin-left: 5px;
    line-height: 36px;
    color: #000;
  }
}
.user {
  width: 50%;
  display: flex;
  line-height: 64px;
  justify-content: flex-end;
  padding-right: 20px;
  .create-center {
    margin-right: 30px;
  }
  .arco-btn-shape-square {
    padding: 0 15px;
    .arco-icon {
      padding-left: 6px;
    }
  }
  .arco-btn-secondary {
    background-color: #f4f9ff;
    border-color: #b3d5ff;
    color: #007fff;
  }
  .user-login {
    display: flex;
    align-items: center;
    .image {
      border-radius: 50%;
      cursor: pointer;
    }
    .arco-badge {
      margin-right: 20px;
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}

/*
  修改arco内置组件css
*/
.arco-input-outer {
  margin-left: 12px;
  padding: 0 12px;
  align-items: center;
}
.arco-icon-code {
  padding-left: 10px;
  font-size: 18px;
}
.arco-menu-item {
  line-height: 36px;
}
:deep(.arco-input-append) {
  height: 36px;
  width: 36px;
  background-color: var(--primary-color);
  .arco-btn {
    width: 100%;
    height: 100%;
  }
}
:deep(.arco-menu-selected-label) {
  display: none;
}
:deep(.arco-btn-primary) {
  background-color: var(--primary-color);
}
:deep(.arco-input-wrapper) {
  height: 36px;
}

/* 个人信息详情展示 */
.currentUserInfo {
  .head {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .userName {
      .name {
        font-size: 16px;
        line-height: 24px;
        color: #252933;
        cursor: pointer;
      }
      .name:hover {
        color: #515767;
      }
      .title {
        font-size: 12px;
        line-height: 18px;
        color: #252933;
      }
    }
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 74px;
      height: 40px;
      cursor: pointer;

      .item-info {
        color: #8a919f;
        font-size: 12px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #8a919f;
    .set {
      cursor: pointer;
    }
    .set:hover {
      color: #559fff;
    }
    .close_login {
      cursor: pointer;
    }
    .close_login:hover {
      color: #559fff;
    }
  }
}
</style>
