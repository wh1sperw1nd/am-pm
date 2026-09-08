import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import SommelierView from '@/views/SommelierView.vue';
import BaristaView from '@/views/BaristaView.vue';
import HomeVue from "@/views/HomeVue.vue";
import AboutView from "@/views/AboutView.vue";
import RecipesView from "@/views/RecipesView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeVue
    },
    {
        path: '/sommelier',
        name: 'sommelier',
        component: SommelierView
    },
    {
        path: '/barista',
        name: 'barista',
        component: BaristaView
    },
    {
        path: '/about',
        name: 'Our story',
        component: AboutView
    },
    {
        path: '/recipes',
        name: 'recipes',
        component: RecipesView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
