<script setup lang="ts">
import { computed, useId } from 'vue';

const { min = 0, max = 10, step = 1 } = defineProps<{
    min?: number;
    max?: number;
    step?: number;
    /** Accessible name for the slider, e.g. "Complexity". */
    label?: string;
}>();

const value = defineModel<number>({ default: 0 });
const id = useId();

const ticks = computed(() => {
    const count = Math.floor((max - min) / step) + 1;
    return Array.from({ length: count }, (_, i) => min + i * step);
});

/**
 * Centre of a tick, matching where the native range thumb sits: its centre
 * travels from `thumb / 2` to `100% - thumb / 2`, not from 0 to 100%.
 */
function tickOffset(tick: number): string {
    const ratio = max === min ? 0 : (tick - min) / (max - min);
    return `calc(var(--thumb-size) / 2 + (100% - var(--thumb-size)) * ${ratio})`;
}
</script>

<template>
    <div class="gradient-scale w-full flex flex-col gap-2 py-6 px-4">
        <div class="relative w-full h-4 text-gray-400 text-xs">
            <button
                    v-for="tick in ticks"
                    :key="tick"
                    type="button"
                    class="absolute top-0 -translate-x-1/2 cursor-pointer"
                    :style="{ left: tickOffset(tick) }"
                    @click="value = tick"
            >
                {{ tick }}
            </button>
        </div>

        <div class="relative w-full h-2 rounded-full bg-linear-to-r from-green-500 via-yellow-400 to-red-500">
            <input
                    :id="id"
                    v-model.number="value"
                    :name="id"
                    type="range"
                    class="slider absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-4 cursor-pointer"
                    :min="min"
                    :max="max"
                    :step="step"
                    :aria-label="label"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.gradient-scale {
    /* Shared by the thumb and by tickOffset(), so labels stay under the knob. */
    --thumb-size: 0.9rem;
}

.slider {
    appearance: none;
    background: transparent;

    &::-webkit-slider-runnable-track {
        height: 100%;
        background: transparent;
    }

    &::-moz-range-track {
        height: 100%;
        background: transparent;
    }

    &::-webkit-slider-thumb {
        appearance: none;
        box-sizing: border-box;
        width: var(--thumb-size);
        height: var(--thumb-size);
        border: 2px solid var(--color-gray-500);
        border-radius: 100%;
        background: var(--color-white);
        cursor: pointer;
    }

    &::-moz-range-thumb {
        box-sizing: border-box;
        width: var(--thumb-size);
        height: var(--thumb-size);
        border: 2px solid var(--color-gray-500);
        border-radius: 100%;
        background: var(--color-white);
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        &::-webkit-slider-thumb {
            outline: 2px solid var(--color-blue-500);
            outline-offset: 2px;
        }

        &::-moz-range-thumb {
            outline: 2px solid var(--color-blue-500);
            outline-offset: 2px;
        }
    }
}
</style>
