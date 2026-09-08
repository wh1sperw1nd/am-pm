<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import './Loading.scss'

const props = withDefaults(defineProps<{ duration?: number }>(), { duration: 1200 });

const percent = ref(0);
let rafId = 0;

onMounted(() => {
    const start = performance.now();
    const tick = (now: number) => {
        percent.value = Math.min(100, Math.round(((now - start) / props.duration) * 100));
        if (percent.value < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
});

onUnmounted(() => cancelAnimationFrame(rafId));
</script>

<template>
    <div class="flex justify-center bg-gray-900 fixed inset-0 items-center">
        <div id="whisky" class="relative h-50 w-50">
            <div id="whiskyglass"></div>
            <div id="whiskycontent">
                <div class="ice"></div>
                <div class="ice"></div>
                <div>
                    <div class="whiskydetail"></div>
                    <div class="whiskydetail"></div>
                </div>
            </div>
        </div>

        <div id="cocktail" class="relative h-50 w-50 flex items-center justify-center">
            <span id="counter">{{ percent }}%</span>
            <div id="straw"></div>
            <div id="cocktailglass"></div>
            <div id="glassfoot"></div>
            <div id="cocktaildetail">
                <div></div>
                <div></div>
            </div>
            <div id="cocktailbubble">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div id="beer" class="relative h-50 w-50">
            <div id="glass">
                <div class="foam"></div>
                <div class="foam"></div>
                <div class="foam"></div>
                <div class="foam"></div>
                <div>
                    <div class="foam drip"></div>
                    <div class="foam drip"></div>
                </div>
                <div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                </div>
            </div>
            <div id="details">
                <div class="glassEffect"></div>
                <div class="glassEffect"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
