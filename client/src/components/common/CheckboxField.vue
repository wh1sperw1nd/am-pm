<script setup lang="ts">
import { useId } from 'vue';

const checked = defineModel<boolean>({ default: false });
const id = useId();
</script>

<template>
    <label :for="id" class="flex gap-2 cursor-pointer items-center select-none">
        <input :id="id" v-model="checked" type="checkbox" class="sr-only peer"/>
        <span class="w-6 h-6 rounded-md border-2 border-gray-300 flex items-center justify-center text-transparent peer-checked:bg-blue-500 peer-checked:text-white transition-all duration-200 bg-white">
		 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
		 </svg>
		</span>
        <span class="text-sm text-gray-600"><slot/></span>
    </label>
</template>
