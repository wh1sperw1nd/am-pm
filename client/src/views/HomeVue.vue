<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Hero from "@/components/common/Hero.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
    <div class="flex h-dvh min-h-110 flex-col">
        <Header />
        <Hero />
    </div>

    <section id="how" class="mx-auto max-w-6xl scroll-mt-6 px-10 py-24">
        <div class="mb-10 flex items-baseline gap-4">
            <h2 class="text-3xl font-normal text-gray-900 dark:text-gray-100">How it works</h2>
            <span class="h-px flex-1 bg-gray-200 dark:bg-gray-700"></span>
            <span class="text-xs font-semibold uppercase tracking-[.3em] text-gray-500">Two modes</span>
        </div>

        <div class="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <article class="rounded-xl border border-amber-100 bg-amber-50 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <svg viewBox="0 0 120 120" width="52" height="52" fill="none" stroke="#b45309" stroke-width="4"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M 26 38 L 34 86 C 36 100, 48 106, 60 106 C 72 106, 84 100, 86 86 L 94 38 Z"></path>
                    <ellipse cx="60" cy="38" rx="34" ry="6"></ellipse>
                    <path d="M 30 46 C 12 46, 12 76, 32 78"></path>
                    <path d="M 50 24 C 46 17, 54 11, 50 4" stroke-width="3"></path>
                    <path d="M 68 24 C 64 17, 72 11, 68 4" stroke-width="3"></path>
                </svg>
                <h3 class="mt-5 mb-2 text-xl font-medium text-gray-900 dark:text-gray-100">Barista</h3>
                <p class="text-gray-600 dark:text-slate-300">
                    Set the beans, the ratio, and the milk. Save the pour that worked so tomorrow morning takes one tap.
                </p>
                <div class="mt-6 flex flex-wrap gap-2">
                    <span class="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">Ratio</span>
                    <span class="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">Grind</span>
                    <span class="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">Milk</span>
                </div>
                <router-link to="/barista" class="mt-6 inline-block text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800">
                    Start Barista →
                </router-link>
            </article>

            <article class="rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-sm">
                <svg viewBox="0 0 120 120" width="52" height="52" fill="none" stroke="#fca5a5" stroke-width="4"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M 32 20 C 16 54, 20 90, 60 90 C 100 90, 104 54, 88 20 Z"></path>
                    <ellipse cx="60" cy="20" rx="28" ry="5"></ellipse>
                    <path d="M 26 44 C 44 50, 76 50, 94 44" stroke="#991b1b" stroke-width="9"></path>
                    <line x1="60" y1="90" x2="60" y2="112"></line>
                    <path d="M 38 114 C 44 111, 52 110, 60 110 C 68 110, 76 111, 82 114"></path>
                </svg>
                <h3 class="mt-5 mb-2 text-xl font-medium text-gray-100">Sommelier</h3>
                <p class="text-slate-300">
                    Pick the spirit, balance sweet against bitter, and keep notes on the bottle you opened. Evening service, written down.
                </p>
                <div class="mt-6 flex flex-wrap gap-2">
                    <span class="rounded-full bg-red-800/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-200">Spirit</span>
                    <span class="rounded-full bg-red-800/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-200">Balance</span>
                    <span class="rounded-full bg-red-800/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-200">Garnish</span>
                </div>
                <router-link to="/sommelier" class="mt-6 inline-block text-xs font-bold uppercase tracking-widest text-red-300 hover:text-red-200">
                    Start Sommelier →
                </router-link>
            </article>
        </div>
    </section>

    <Footer />
</template>
