import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/moment/:id',
      component: () => import('@/views/moment/moment.vue')
    },
    {
      path: '/userInfo/:id',
      component: () => import('@/views/userInfo/userInfo.vue')
    },
    {
      path: '/setting/user',
      component: () => import('@/views/setUser/setUser.vue')
    },
    {
      path: '/editor/markdown',
      component: () => import('@/views/markdownEditor/markdownEditor.vue')
    },
    {
      path: '/search/momentList',
      component: () => import('@/views/searchMoment/searchMoment.vue')
    },
    {
      path: '/:pathMath(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

export default router
