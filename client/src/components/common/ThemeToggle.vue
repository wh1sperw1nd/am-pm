<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/theme';

const store = useThemeStore();
const { theme } = storeToRefs(store);
</script>

<template>
    <button
            type="button"
            role="switch"
            :aria-checked="theme === 'dark'"
            aria-label="Toggle color theme"
            class="relative h-6.5 w-14 shrink-0 cursor-pointer rounded-full border transition-colors duration-300"
            :class="theme === 'dark' ? 'border-red-900 bg-red-950' : 'border-amber-500 bg-amber-100'"
            @click="store.toggle"
    >
        <span
                class="absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full shadow-md transition-transform duration-300"
                :class="theme === 'dark' ? 'translate-x-7.5 bg-red-800' : 'translate-x-0 bg-white'"
        >
            <svg v-if="theme === 'light'" viewBox="0 0 24 24" class="h-4 w-4 text-amber-700" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
                <path d="M3 8h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z"/>
                <path d="M16 9h2a2.5 2.5 0 0 1 0 5h-2"/>
                <path d="M6 2c0 1-1 1-1 2s1 1 1 2"/>
                <path d="M10 2c0 1-1 1-1 2s1 1 1 2"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-4 w-4 text-white" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
                <path d="M6 3h12c0 5-2.5 9-6 9s-6-4-6-9Z"/>
                <path d="M12 12v7"/>
                <path d="M8 21h8"/>
            </svg>
        </span>
    </button>
</template>
