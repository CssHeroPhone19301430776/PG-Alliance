<template>
  <a-comment
    :author="props.currentList.user.name"
    :avatar="props.currentList.user.avatarUrl"
    :datetime="currentList.user.jobInfo"
  >
    <template #content>
      <div class="replay-wrapper">
        <div class="content">{{ props.currentList.content }}</div>

        <div class="reply" :class="{ active: isReply }" @click="replyClick">
          <icon-message />{{ isReply ? '取消' : '' }}回复
        </div>
        <div v-show="isReply" class="createContent">
          <a-textarea
            v-model="commentContent"
            ref="textareaRef"
            placeholder="平等表达，友善交流"
            :max-length="1000"
            allow-clear
            show-word-limit
            :auto-size="{
              minRows: 2,
              maxRows: 10
            }"
          />
          <div class="btn-wrapper">
            <a-button type="primary" @click="createComment">提交</a-button>
          </div>
        </div>
      </div>
    </template>
    <div class="wrapper" v-if="props.currentList.list.length">
      <template v-for="item in props.currentList.list" :key="item.id">
        <commentList :current-list="item"></commentList>
      </template>
    </div>
  </a-comment>
</template>

<script setup lang="ts">
import { useMomentStore } from '@/stores/moment/moment'
import type { CommentType } from '@/types/service/moment'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const momentStore = useMomentStore()
const { currentMomentInfo } = storeToRefs(momentStore)

//当前需要渲染的值
const props = defineProps<{
  currentList: CommentType
}>()

// 是否渲染回复框
const isReply = ref(false)

// 绑定文本域
const textareaRef = ref()

// 点击回复框
const replyClick = () => {
  isReply.value = !isReply.value
  // 设置定时器是因为找不到textareaRef
  setTimeout(() => {
    textareaRef.value.focus()
  }, 0)
}

async function getCurrentMomentData() {
  // 获取当前文章的id
  const id = route.params.id

  if (typeof id === 'string') {
    // 获取当前文章的数据
    await momentStore.getMomentInfoData(id)
  }
}

// 评论框的内容
const commentContent = ref()
// 点击提交后，创建评论
const createComment = async () => {
  await momentStore.postReplayCommentData({
    content: commentContent.value,
    moment_id: currentMomentInfo.value!.id,
    comment_id: props.currentList.id
  })

  getCurrentMomentData()
  isReply.value = false
}
</script>

<style lang="less" scoped>
.replay-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  // width: 300px;
  .reply {
    cursor: pointer;
    .arco-icon {
      margin-right: 4px;
    }
  }
  .active {
    color: #1e80ff;
  }
  .createContent {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    margin-top: 5px;
  }
  .arco-btn {
    margin-top: 20px;
    background-color: #1e80ff;
  }
}
</style>
