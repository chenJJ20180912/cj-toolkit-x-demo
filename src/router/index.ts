import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/table-cell-merger',
    name: 'table-cell-merger',
    component: () => import('@/views/table-cell-merger')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
