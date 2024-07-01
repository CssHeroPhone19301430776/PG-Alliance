import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// arco的使用
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
import { Message } from '@arco-design/web-vue'

// 导入css样式
import 'normalize.css'
import './assets/css/index.css'
// 导入markdown样式
// import 'github-markdown-css'

// 导入markdown解析
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html'
import '@kangc/v-md-editor/lib/style/preview-html.css'
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs 核心代码
import hljs from 'highlight.js'
// 按需引入语言包
// import json from 'highlight.js/lib/languages/json'

// hljs.registerLanguage('json', json)

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs
})

// app的挂载
const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)

Message._context = app._context

// 使用route和pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueMarkdownEditor)
app.use(VMdPreviewHtml)

app.mount('#app')
