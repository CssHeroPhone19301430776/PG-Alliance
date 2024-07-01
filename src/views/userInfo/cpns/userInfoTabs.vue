<template>
  <a-tabs default-active-key="文章">
    <a-tab-pane key="文章" title="文章">
      <div class="notData" v-if="!showUserInfo?.myMoment[0].id">
        <a-empty />
      </div>
      <moment-list
        :info="showUserInfo?.myMoment"
        v-if="showUserInfo?.myMoment[0].id"
      ></moment-list>
    </a-tab-pane>
    <a-tab-pane key="点赞" title="点赞">
      <div class="notData" v-if="!thumbsListByUser">
        <a-empty />
      </div>
      <moment-list
        :info="thumbsListByUser"
        v-if="thumbsListByUser"
      ></moment-list>
    </a-tab-pane>

    <a-tab-pane key="收藏" title="收藏">
      <div class="notData" v-if="!showUserInfo?.collections[0].id">
        <a-empty />
      </div>
      <moment-list
        :info="showUserInfo?.collections"
        v-if="showUserInfo?.collections[0].id"
      ></moment-list>
    </a-tab-pane>
    <a-tab-pane key="关注" title="关注">
      <div class="notData" v-if="!concernList">
        <a-empty />
      </div>
      <concern-list-vue :concern-list-data="concernList" v-if="concernList">
      </concern-list-vue>
    </a-tab-pane>
    <a-tab-pane>
      <template #title>
        <a-input-search
          :style="{ width: '320px' }"
          placeholder="搜索 发布/点赞/收藏的文章"
        />
      </template>
      <div class="notData" v-if="true">
        <a-empty />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import momentList from './momentList.vue'
import concernListVue from './concernListVue.vue'
import { useLoginStore } from '@/stores/login/login'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const loginStore = useLoginStore()
const mainStore = useMainStore()
const { showUserInfo } = storeToRefs(loginStore)
const { concernList, thumbsListByUser } = storeToRefs(mainStore)

watch(showUserInfo, async (newValue) => {
  if (newValue) {
    await mainStore.getConcernListData(newValue.id)
    const res = await mainStore.getThumbByUserIdData(newValue.id)
    console.log(thumbsListByUser.value)
  }
})
</script>

<style lang="less" scoped>
:deep(.arco-tabs-tab) {
  font-size: 16px;
  padding: 14px 0;
  color: #909090;
}
:deep(.arco-tabs-tab:hover) {
  color: #46a2ff;
}
:deep(.arco-tabs-tab-active) {
  color: #252933 !important;
}
:deep(.arco-tabs-tab:nth-child(5)) {
  margin-left: 110px;
}
.notData {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 340px;
}
</style>
