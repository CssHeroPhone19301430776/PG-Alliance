<template>
  <div class="setUser-wrapper">
    <div class="nav-bar">
      <nav-bar :select-keys="[0]"></nav-bar>
    </div>
    <div class="content-wrapper">
      <div class="top">
        <div @click="jumpUserInfo"><icon-left /> 返回个人主页</div>
      </div>
      <div class="content">
        <div class="title">个人资料</div>
        <a-divider />
        <div class="setUserInfo">
          <a-form
            :label-col-props="{ span: 4, offset: 0 }"
            ref="formRef"
            size="medium"
            :model="form"
            :style="{ width: '600px' }"
          >
            <a-form-item
              field="name"
              label="用户名"
              :rules="[{ required: true, message: 'name is required' }]"
            >
              <a-input
                :style="{ width: '469px' }"
                v-model="form.name"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item
              field="job_direction"
              label="职业方向"
              :rules="[{ required: true, message: '职业方向不能为空' }]"
            >
              <a-select
                v-model="form.job_direction"
                :style="{ width: '469px' }"
                placeholder="请选择你的职业方向"
              >
                <a-option :value="'前端开发'">前端开发</a-option>
                <a-option :value="'后端开发'">后端开发</a-option>
                <a-option :value="'测试'">测试</a-option>
                <a-option :value="'人工智能'">人工智能</a-option>
                <a-option :value="'算法'">算法</a-option>
                <a-option :value="'硬件'">硬件</a-option>
                <a-option :value="'其他技术岗位'">其他技术岗位</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="job-info" label="职位">
              <a-input
                v-model="form.job_info"
                :style="{ width: '469px' }"
                placeholder="请输入你的职位"
                :max-length="10"
                allow-clear
                show-word-limit
              >
              </a-input>
            </a-form-item>
            <a-form-item field="introduction" label="个人介绍">
              <a-space direction="vertical" size="large" fill>
                <a-textarea
                  v-model="form.introduction"
                  placeholder="请填写职业技能、擅长的事情等。"
                  :style="{ width: '469px' }"
                  :max-length="50"
                  allow-clear
                  show-word-limit
                />
              </a-space>
            </a-form-item>
            <div class="button">
              <a-button html-type="submit" @click="updataUser">
                保存修改
              </a-button>
            </div>
          </a-form>
          <div class="img-wrapper">
            <div class="avatar">
              <a-upload
                action="/api/file/avatar"
                :show-file-list="false"
                @success="successImage"
                @before-upload="beforeUpload"
              >
                <template #upload-button>
                  <a-avatar trigger-type="mask" :size="90">
                    <img alt="avatar" :src="currentUserInfo?.avatarUrl" />
                    <template #trigger-icon>
                      <div class="wrapper">
                        <IconEdit />
                        <div class="info">点击修改头像</div>
                      </div>
                    </template>
                  </a-avatar>
                </template>
              </a-upload>
            </div>

            <div class="message">上传头像</div>
            <div class="require">
              <div class="first">格式：支持JPG、PNG、JPEG、WEBP</div>
              <div class="second">大小：5M以内</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import navBar from '@/components/navBar.vue'
import { useLoadStore } from '@/stores/load/load'
import { useLoginStore } from '@/stores/login/login'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 获取当前实例，用于全局弹出框
const instance = getCurrentInstance()

const loginStore = useLoginStore()
const loadStore = useLoadStore()
const router = useRouter()

// 获取当前用户信息
const { currentUserInfo } = storeToRefs(loginStore)

// 提交表单的数据定义
const form = reactive({
  name: currentUserInfo.value?.name,
  job_direction: currentUserInfo.value?.job_direction || '',
  job_info: currentUserInfo.value?.job_info,
  introduction: currentUserInfo.value?.introduction
})

// 修改用户信息
const updataUser = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...param } = form
  const res = await loginStore.patchUserInfoData(param)
  // 更新数据成功
  if (res.code === 0) {
    instance?.appContext.config.globalProperties.$message.success(
      '个人信息更新成功'
    )
  }
}

// 上传照片成功后，修改当前用户头像
const successImage = async (item: any) => {
  const params = new FormData()
  params.append('file', item.file)

  const res = await loadStore.postFileAvatarData(params)
  if (res.code == 0) {
    location.reload()
  }
}

// 上传之前判断是否符合条件
const beforeUpload = (file: File) => {
  const reg = /^image\/(jpg|png|jpeg|webp)$/i

  if (!(reg.test(file.type) && file.size <= 5242880)) {
    instance?.appContext.config.globalProperties.$message.error(
      '不支持此格式图片上传'
    )
  } else {
    instance?.appContext.config.globalProperties.$message.success(
      '头像更新成功'
    )
  }

  return reg.test(file.type) && file.size <= 5242880
}

// 跳转到个人主页
const jumpUserInfo = () => {
  router.push(`/userInfo/${currentUserInfo.value?.id}`)
}
</script>

<style lang="less" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .top {
    display: flex;
    align-items: center;
    width: 924px;
    height: 46px;
    padding-left: 22px;
    margin: 24px 0 16px 0;
    font-size: 14px;
    color: #1e80ff;
    background-color: #fff;
    cursor: pointer;
  }
  .content {
    width: 946px;
    background-color: #fff;
    .title {
      padding: 16px 20px;
    }
    .arco-divider {
      margin: 0;
      margin-bottom: 20px;
    }
    .setUserInfo {
      display: flex;
      padding: 0 10px 30px 10px;
      .button {
        width: 900px;
        display: flex;
        justify-content: flex-end;
      }
      .img-wrapper {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 12px;

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          .info {
            font-size: 12px;
          }
        }

        .message {
          margin-top: 12px;
        }
        .require {
          font-size: 13px;
          color: #8a919f;
          margin-top: 8px;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
