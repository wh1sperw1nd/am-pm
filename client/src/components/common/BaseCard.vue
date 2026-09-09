<script setup lang="ts">
import { inject } from 'vue';
import { cardThemeKey, type CardTheme } from '@/types/theme';

export type CardVariant = 'primary' | 'secondary' | 'accent';

const { variant = 'primary' } = defineProps<{
    title: string;
    description?: string;
    variant?: CardVariant;
    contentClass?: string;
    className?: string;
}>();

const headerColors: Record<CardTheme, Record<CardVariant, string>> = {
    blue: {
        primary: 'bg-blue-600',
        secondary: 'bg-blue-400',
        accent: 'bg-purple-700',
    },
    wine: {
        primary: 'bg-rose-900',
        secondary: 'bg-rose-700',
        accent: 'bg-red-800',
    },
    coffee: {
        primary: 'bg-amber-900',
        secondary: 'bg-amber-700',
        accent: 'bg-orange-800',
    },
};

const theme = inject(cardThemeKey, 'blue');

</script>

<template>
    <div class="flex flex-col rounded-lg shadow-md overflow-hidden bg-gray-100">
        <slot name="header">
            <header class="text-white flex justify-between p-4 items-center" :class="headerColors[theme][variant]">
                <div class="font-bold text-lg">{{ title }}</div>
                <div v-if="description" class="description text-sm">{{ description }}</div>
            </header>
        </slot>
        <div class="content w-full flex-1 min-h-0" :class="contentClass">
            <slot/>
        </div>
        <footer v-if="$slots.footer" class="p-3 border-t border-gray-200" :class="className">
            <slot name="footer"/>
        </footer>
    </div>
</template>
