import type { RouteRecordRaw } from "vue-router";


export const publicRouters: RouteRecordRaw[] = [
    {
        path: 'events',
        name: 'public-events',
        component: () => import('@/events/PublicEventListView.vue'),
    },
    {
        path: 'events/:slug',
        name: 'event-details',
        component: () => import('@/events/PublicEventDetail.vue')
    }
]