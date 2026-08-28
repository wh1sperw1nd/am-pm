<script setup lang="ts">
import { onMounted, ref, useId } from 'vue';
import { storeToRefs } from 'pinia';
import BaseCard from '@/components/common/BaseCard.vue';
import { pluralize } from "@/utils/text.ts";
import { GLASS_TYPES, type GlassOption } from '@/data/options';
import { useSommelierStore } from '@/store/sommelier';

const glassImages = import.meta.glob<string>('../assets/img/glass/*.png', {
    eager: true,
    import: 'default',
});

const glassSrc = (glass: GlassOption) => glassImages[`../assets/img/glass/${glass.id}.png`];

const GlassesTypes = GLASS_TYPES;

const { glass: selected } = storeToRefs(useSommelierStore());

const uid = useId();
const slideId = (glass: GlassOption) => `${uid}-${glass.id}`;

const track = ref<HTMLUListElement | null>(null);
const atStart = ref(true);
const atEnd = ref(false);

/** Distance between two slides, gap included. */
function slideStep(el: HTMLElement) {
    const [ first, second ] = Array.from(el.children) as HTMLElement[];
    return second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
}

function updateEdges() {
    const el = track.value;
    if (!el) return;
    atStart.value = el.scrollLeft <= 1;
    atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

function step(direction: 1 | -1) {
    const el = track.value;
    if (!el) return;
    el.scrollBy({ left: direction * slideStep(el), behavior: 'smooth' });
}

onMounted(updateEdges);

</script>

<template>
    <BaseCard title="Glass type" :description="pluralize(GlassesTypes.length, 'species')" class="max-h-100"
              content-class="h-72">
        <div class="relative h-full">
            <!-- track: native scroll + snap -->
            <ul
                    ref="track"
                    class="track flex h-full gap-3 snap-x snap-mandatory scroll-smooth overflow-x-auto overflow-y-hidden"
                    @scroll.passive="updateEdges"
            >
                <li v-for="glass in GlassesTypes" :key="glass.id" :id="slideId(glass)"
                    class="snap-start shrink-0 w-full">
                    <label
                            class="group relative flex h-full w-full cursor-pointer flex-col items-center overflow-hidden"
                    >
                        <input type="radio" class="sr-only" :name="uid" :value="glass.id" v-model="selected"/>
                        <img class="flex-1" width="256" height="256" :src="glassSrc(glass)" :alt="glass.label"
                             aria-hidden="true"/>
                        <span
                                class="p-3 border-t w-full text-center border-gray-200 transition-colors group-has-checked:bg-blue-600 group-has-checked:text-white"
                        >{{ glass.label }}</span>
                    </label>
                </li>
            </ul>

            <button
                    type="button"
                    aria-label="Previous glass"
                    :disabled="atStart"
                    class="absolute cursor-pointer  top-1/2 left-1 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
                    @click="step(-1)"
            >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                     aria-hidden="true">
                    <path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button
                    type="button"
                    aria-label="Next glass"
                    :disabled="atEnd"
                    class="absolute cursor-pointer top-1/2 right-1 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
                    @click="step(1)"
            >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                     aria-hidden="true">
                    <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </BaseCard>
</template>

<style scoped lang="scss">
.track {
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

</style>
