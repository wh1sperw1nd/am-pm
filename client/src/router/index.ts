import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/sommelier',
        name: 'SommelierView.vue'
    },
    {
        path: '/barista',
        name: 'BaristaView',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
