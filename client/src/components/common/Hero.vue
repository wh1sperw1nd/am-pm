<script setup lang="ts">
</script>

<template>
    <section class="hero relative flex w-full flex-1 min-h-0 flex-col items-center justify-center gap-6 px-8 pb-16 text-center">
        <h1 class="text-8xl font-extrabold tracking-tight text-white drop-shadow-lg">
            AM<span class="text-[#8B0000]">:</span>PM
        </h1>

        <p class="max-w-2xl text-2xl font-light text-gray-100/90">
            Build the cup you want at seven, and the pour you want at seven again. One recipe book, two halves of the day.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
            <router-link
                    to="/barista"
                    class="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-lg shadow-amber-900/30 transition hover:-translate-y-0.5 hover:bg-amber-50"
            >
                <span class="block h-1.5 w-1.5 rounded-full bg-amber-700"></span>
                Start Barista
            </router-link>
            <router-link
                    to="/sommelier"
                    class="inline-flex items-center gap-2 rounded-lg bg-red-800 px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-100 shadow-lg shadow-red-900/40 transition hover:-translate-y-0.5 hover:bg-red-900"
            >
                <span class="block h-1.5 w-1.5 rounded-full bg-red-300"></span>
                Start Sommelier
            </router-link>
        </div>

        <a href="#how" aria-label="Scroll to how it works" class="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <span class="text-[10px] font-semibold uppercase tracking-[.34em] text-gray-100/70"></span>
            <svg viewBox="0 0 24 30" width="40" height="40" fill="none" stroke="#fff" stroke-width="3"
                 stroke-linecap="round" stroke-linejoin="round" class="animate-bounce">
                <line x1="12" y1="2" x2="12" y2="24"></line>
                <path d="M 4 17 L 12 25 L 20 17"></path>
            </svg>
        </a>
    </section>
</template>

<style scoped lang="scss">
.hero {
    z-index: 0;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: -6px;
        z-index: -1;
        background: url("@/assets/img/bg.png") no-repeat center / cover;
        filter: blur(2px);
    }
}
</style>
