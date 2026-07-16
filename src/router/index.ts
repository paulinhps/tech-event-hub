import { createRouter, createWebHistory } from 'vue-router'
import { publicRouters } from './public.router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public-area',
      component: () => import('@/layouts/PublicLayout.vue'),
      redirect: '/events',
      children: [...publicRouters]
    }

  ],
})

export default router
