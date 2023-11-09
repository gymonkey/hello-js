import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home/index.vue'),
      name: 'Home'
    },
    {
      path: '/category',
      component: () => import('@/pages/Category/index.vue'),
      name: 'Category'
    }
  ]
})

export default router
