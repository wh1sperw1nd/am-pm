<script setup lang="ts">
import GlassPanel from "@/components/GlassPanel.vue";
import TypesPanel from "@/components/TypesPanel.vue";
import StrengthPanel from "@/components/StrengthPanel.vue";
import PortionsPanel from "@/components/PortionsPanel.vue";
import IngredientsPanel from "@/components/IngredientsPanel.vue";
import BasePanel from "@/components/BasePanel.vue";
import TimePanel from "@/components/TimePanel.vue";
import ComplexityPanel from "@/components/ComplexityPanel.vue";
import MethodPanel from "@/components/MethodPanel.vue";
import DecorationsPanel from "@/components/DecorationsPanel.vue";
import TagsPanel from "@/components/TagsPanel.vue";
import DescriptionPanel from "@/components/DescriptionPanel.vue";
import { useSommelierStore } from "@/store/sommelier";
import { useNotificationsStore } from "@/store/notifications";
import Header from "@/components/common/Header.vue";

const store = useSommelierStore();
const notifications = useNotificationsStore();

function onSave() {
    // TODO: send store.toPayload() to the backend once it exists.
    console.log(store.toPayload());
    notifications.notify('success', 'Cocktail saved.');
}

function onClear() {
    store.reset();
    notifications.notify('info', 'Form cleared.');
}
</script>

<template>
    <Header />
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassPanel/>
        <TypesPanel/>
        <StrengthPanel/>
        <BasePanel/>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 mt-6 lg:max-h-96">
        <IngredientsPanel/>
        <PortionsPanel/>
        <TimePanel/>
        <ComplexityPanel/>
        <MethodPanel/>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <DecorationsPanel/>
        <TagsPanel/>
        <DescriptionPanel/>
    </section>
    <section class="grid grid-cols-2 gap-6 p-6 ">
        <button
                class="bg-gray-200 border-gray-400 border text-black px-4 py-2 rounded hover:bg-gray-300 w-1/4 justify-self-end cursor-pointer font-bold"
                @click="onClear">
            Clear
        </button>
        <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-1/4 cursor-pointer font-bold"
                @click="onSave">
            Save
        </button>
    </section>
</template>

<style scoped lang="scss">

</style>
