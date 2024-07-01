<template>
  <div class="markdown-wrapper">
    <div class="title">
      <div class="content">
        <div class="left">
          <a-input
            v-model="form.title"
            class="title-input"
            :style="{ width: '996px', height: '62px' }"
            placeholder="输入文章标题..."
            :max-length="30"
            allow-clear
            show-word-limit
          />
        </div>
        <div class="right">
          <a-popover position="br" trigger="click">
            <a-button type="primary">发布</a-button>
            <template #content>
              <a-form
                ref="formRef"
                :rules="rules"
                :model="form"
                :style="{ width: '558px' }"
              >
                <a-form-item
                  field="categoryId"
                  label="分类"
                  validate-trigger="blur"
                >
                  <a-radio-group v-model:model-value="form.categoryId">
                    <template v-for="item in categoryList" :key="item.id">
                      <a-radio :value="item.id">
                        <template #radio="{ checked }">
                          <a-space
                            align="start"
                            class="custom-radio-card"
                            :class="{ 'custom-radio-card-checked': checked }"
                          >
                            <div>
                              <a-typography-text type="secondary">
                                {{ item.name }}
                              </a-typography-text>
                            </div>
                          </a-space>
                        </template>
                      </a-radio>
                    </template>
                  </a-radio-group>
                </a-form-item>
                <a-form-item
                  field="labels"
                  label="添加标签"
                  validate-trigger="blur"
                >
                  <a-select
                    v-model="form.labels"
                    :style="{ width: '380px' }"
                    placeholder="请添加标签 最多选择三个"
                    :limit="3"
                    @exceed-limit="exceedLimit"
                    multiple
                  >
                    <a-option v-for="item in labelList" :key="item.id">
                      {{ item.name }}
                    </a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="introduction"
                  label="编辑摘要"
                  validate-trigger="blur"
                >
                  <a-textarea
                    v-model="form.introduction"
                    :style="{ width: '380px' }"
                    :max-length="100"
                    allow-clear
                    show-word-limit
                  />
                </a-form-item>
                <a-form-item>
                  <div class="createMomentWrapper">
                    <a-button
                      class="createMoment"
                      type="primary"
                      html-type="submit"
                      @click="createMoment"
                    >
                      确定并发布
                    </a-button>
                  </div>
                </a-form-item>
              </a-form>
            </template>
          </a-popover>
          <a-avatar :size="32">
            <img alt="avatar" :src="currentUserInfo?.avatarUrl" />
          </a-avatar>
        </div>
      </div>
    </div>
    <!-- markdown文本解释器 -->
    <v-md-editor
      :include-level="[1, 2, 3, 4, 5]"
      v-model="text"
      height="calc(100vh - 63px)"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'
import { useLoginStore } from '@/stores/login/login'
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/main/main'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()
const mainStore = useMainStore()
// 获取当前用户，用于渲染头像
const { currentUserInfo } = storeToRefs(loginStore)
// 获取文章分类数据
const { categoryList, labelList } = storeToRefs(mainStore)
mainStore.getLabelListData()
// markdown输入的内容
const text = ref('')

const formRef = ref()
const router = useRouter()

// 定义表单和对应的规则
const form = reactive({
  title: '',
  content: '',
  categoryId: undefined,
  labels: [],
  introduction: ''
})
const rules = {
  categoryId: [
    {
      required: true,
      message: '请选择分类'
    }
  ],
  labels: [
    {
      required: true,
      message: '请选择标签'
    }
  ],
  introduction: [
    {
      required: true,
      message: '请输入摘要'
    },
    { minLength: 45, message: '摘要不能少于45字' }
  ]
}

// 多选超出限制时，触发
const exceedLimit = () => {
  Message.error('最多选择三个标签')
}

// 点击确认发布按钮, 创建文章
const createMoment = async () => {
  const res = await formRef.value.validate()
  // 当没有错误时，提交表单
  if (!res) {
    // 获取转化后的html文件
    const html = xss.process(
      VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(text.value)
    )
    form.content = html

    // 如果标题或正文为空则报错
    if (form.title == '' || form.content == '') {
      Message.error('标题或内容不能为空')
    } else {
      await mainStore.postMomentData(form)
      formRef.value.resetFields()
      form.title = ''
      text.value = ''

      router.push('/main')
    }
  }
}
</script>
<style lang="less" scoped>
.markdown-wrapper {
  height: 100vh;

  .title {
    height: 62px;
    padding: 0 27px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        // 修改标题的input
        :deep(.arco-input-wrapper) {
          border: none;
          background-color: #fff;
        }
        :deep(.arco-input-wrapper:hover) {
          background-color: #fff;
        }
        :deep(.arco-input-focus) {
          border: none;
        }
        :deep(.arco-input) {
          font-size: 24px;
        }
      }
      .right {
        height: 32px;
      }
    }
  }
}
:global(.createMomentWrapper) {
  width: 558px;
  display: flex;
  justify-content: flex-end;
}
.arco-btn-primary {
  background-color: #1d7dfa;
  margin-right: 15px;
  border: none;
}
.arco-btn-primary:hover {
  background-color: #388eff;
}

.arco-radio {
  margin: 0;
  padding: 0;
}

.custom-radio-card {
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  padding: 0 9px;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 90px;
  height: 28px;
  box-sizing: border-box;
  background-color: #f4f5f5;
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
  .arco-space-item {
    .arco-typography {
      color: #1d7dfa;
    }
  }
}
</style>
