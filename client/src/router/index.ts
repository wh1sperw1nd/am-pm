import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import SommelierView from '@/views/SommelierView.vue';
import BaristaView from '@/views/BaristaView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'sommelier',
        component: SommelierView
    },
    {
        path: '/barista',
        name: 'barista',
        component: BaristaView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
