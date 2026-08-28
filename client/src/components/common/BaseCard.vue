<script setup lang="ts">
export type CardVariant = 'primary' | 'secondary' | 'accent';

const { variant = 'primary' } = defineProps<{
    title: string;
    description?: string;
    variant?: CardVariant;
    contentClass?: string;
    className?: string;
}>();

const headerColors: Record<CardVariant, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-400',
    accent: 'bg-purple-700',
};

</script>

<template>
    <div class="flex flex-col rounded-lg border border-gray-200 shadow-md overflow-hidden bg-gray-100">
        <slot name="header">
            <header class="text-white flex justify-between p-4 items-center" :class="headerColors[variant]">
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
