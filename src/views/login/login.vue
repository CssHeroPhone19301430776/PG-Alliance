<template>
  <a-modal
    :mask-closable="false"
    title-align="start"
    width="548px"
    :footer="false"
    :visible="true"
    @cancel="closeDown"
  >
    <template #title> 登录PG-Alliance享更多功能 </template>
    <a-space size="large">
      <a-form :rules="rules" :model="form" layout="vertical">
        <div class="password-login">欢迎加入PG-Alliance</div>
        <a-form-item :validate-trigger="['blur']" hide-label field="name">
          <a-input v-model="form.name" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item :validate-trigger="['blur']" hide-label field="password">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item hide-label>
          <div class="login-btn">
            <a-popconfirm
              :popupVisible="popVisible"
              content="确认需要创建当前用户吗"
              type="info"
              @ok="confirmCreate"
              @cancel="cancelCreate"
            >
              <a-button
                html-type="submit"
                type="outline"
                @click.stop="createBtn"
              >
                注册
              </a-button>
            </a-popconfirm>

            <a-button html-type="submit" type="primary" @click="loginBtn">
              登录
            </a-button>
          </div>
        </a-form-item>
      </a-form>
      <div class="divider-wrapper">
        <a-divider :margin="0" direction="vertical" type="solid" />
      </div>
      <div class="author-info">
        <div class="title">这片贫瘠的土地需要挖掘者！</div>

        <a-image
          class="image"
          width="152"
          src="http://8.138.2.97:8000/file/avatar/12"
        />
      </div>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login/login'
import { getCurrentInstance, reactive, ref } from 'vue'

const loginStore = useLoginStore()
const emits = defineEmits(['closeDown'])

// 错误提示框
const instance = getCurrentInstance()

// 确认是否注册提示框
const popVisible = ref(false)

// 登录和注册的表单
const form = reactive({
  name: '',
  password: ''
})

// form的检验规则
const rules = {
  name: [
    {
      required: true,
      message: '用户名不能为空'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空'
    }
  ]
}

// 当点击登录按钮时
const loginBtn = async () => {
  const { name, password } = form
  if (name !== '' && password !== '') {
    // 进行登录操作
    const res = await loginStore.postLoginData(name, password)

    if (res.data) {
      // 登录成功之后，隐藏modal
      emits('closeDown', false)
      location.reload()
    } else {
      instance?.appContext.config.globalProperties.$notification.error(
        '账号或密码错误'
      )
    }
  }
}
// 点击注册时
const createBtn = async () => {
  const { name, password } = form
  if (name !== '' && password !== '') {
    // 显示注册弹出框
    popVisible.value = true
  }
}
// 点击确认注册
const confirmCreate = async () => {
  // 隐藏弹出框
  popVisible.value = false

  // 获取所需的参数
  const { name, password } = form
  // 进行注册操作
  const res = await loginStore.postCreateData(name, password)

  if (res.code < 0) {
    // 显示错误信息
    instance?.appContext.config.globalProperties.$notification.error(
      res.message
    )
  } else {
    // 注册成功弹出框
    instance?.appContext.config.globalProperties.$notification.success(
      res.message
    )

    // 注册成功之后，进行登录
    loginBtn()
    // 隐藏modal
    emits('closeDown', false)
  }
}
// 取消注册
const cancelCreate = () => {
  popVisible.value = false
}

// 当点击关闭按钮, 隐藏modal
const closeDown = () => {
  emits('closeDown', false)
}
</script>

<style lang="less" scoped>
.login-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 3px;

  :deep(.arco-btn) {
    width: 120px;
    border-radius: 4px;
    height: 38px;
  }
  :deep(.arco-btn-outline) {
    background-color: #f4f9ff;
    border: 1px solid rgba(30, 128, 255, 0.3);
  }
}
.arco-modal {
  :deep(.arco-modal-body) {
    padding: 20px 28px;
  }
}
:deep(.arco-space-item .arco-divider-vertical) {
  height: 100px;
}
:deep(.arco-input-wrapper) {
  border-radius: 4px;
  height: 40px;
}
:deep(.arco-row-align-start:nth-child(4)) {
  margin-bottom: 8px;
}
.password-login {
  margin-bottom: 16px;
}
:deep(.arco-modal-header) {
  padding: 28px;
}
:deep(.arco-space-item:nth-child(1)) {
  width: 270px;
  margin-right: 30px !important;
}
:deep(.arco-space-item:nth-child(2)) {
  margin-right: 14px !important;
}

.author-info {
  display: flex;
  flex-direction: column;
  height: 190px;
  width: 188px;
  justify-content: space-around;
  align-items: center;
  .title {
    font-weight: bold;
    padding-left: 6px;
  }
}
:global(.arco-notification-right) {
  line-height: 24px;
}
</style>
