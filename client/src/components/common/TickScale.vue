<script setup lang="ts">
defineProps<{ values: number[] }>();

const current = defineModel<number | null>({ default: null });
</script>

<template>
    <div class="w-full flex flex-col items-center gap-2 py-6 px-4">
        <div class="flex items-end justify-between w-full relative">
            <button
                    v-for="value in values"
                    :key="value"
                    type="button"
                    class="flex flex-col items-center gap-1 cursor-pointer w-7"
                    @click="current = value"
            >
                <template v-if="value === current">
                    <span class="flex items-center justify-center w-7 h-6 rounded bg-blue-500 text-white text-xs font-bold">{{
                            value
                        }}</span>
                    <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-400 absolute -bottom-4"></div>
                </template>
                <span v-else class="text-gray-400 text-xs">{{ value }}</span>
            </button>
        </div>
        <div class="w-full border-t border-gray-300"></div>
    </div>
</template>
