<script setup lang="ts">
    import { ref } from "vue";

    const year = ref<number>(new Date().getFullYear());
</script>

<template>
    <footer class="border-t border-gray-200 bg-gray-100 dark:border-slate-700 dark:bg-slate-900">
        <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-10 py-10">
            <span class="text-gray-900 dark:text-gray-100">
                AM<span class="text-red-800 dark:text-red-400">:</span>PM. All rights reserved.
            </span>
            <nav class="flex items-center gap-7">
                <router-link to="/barista" class="text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Barista</router-link>
                <router-link to="/sommelier" class="text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Sommelier</router-link>
                <router-link to="/recipes" class="text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Recipes</router-link>
                <router-link to="/about" class="text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">About</router-link>
            </nav>
            <span class="text-xs text-gray-500 flex gap-2 items-center">© {{ year }} <img class="copy" src="@/assets/img/bug_logo.png" alt=""> badbug entertainment</span>
        </div>
    </footer>
</template>

<style scoped lang="scss">
    .copy {
        width: 1.5rem;
        height: 1.5rem;
    }
</style>
