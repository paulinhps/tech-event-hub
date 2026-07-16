import type { RouteRecordRaw } from "vue-router";


export const publicRouters : RouteRecordRaw[] = [
    {
        path: 'events',
        name: 'public-events',
        component: () => import('@/events/PublicEventListView.vue'),
    }
]