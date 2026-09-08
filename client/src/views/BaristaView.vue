<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import StrengthPanel from "@/components/StrengthPanel.vue";
import DescriptionPanel from "@/components/DescriptionPanel.vue";
import ComplexityPanel from "@/components/ComplexityPanel.vue";
import VesselPanel from "@/components/VesselPanel.vue";
import BasePanel from "@/components/BasePanel.vue";
import MethodPanel from "@/components/MethodPanel.vue";
import PortionsPanel from "@/components/PortionsPanel.vue";
import TimePanel from "@/components/TimePanel.vue";
import DecorationsPanel from "@/components/DecorationsPanel.vue";
import TypesPanel from "@/components/TypesPanel.vue";
import IngredientsPanel from "@/components/IngredientsPanel.vue";
import TagsPanel from "@/components/TagsPanel.vue";
import { useBaristaStore } from "@/store/barista.ts";
import { useReferenceDataStore } from "@/store/referenceData.ts";
import { useNotificationsStore } from "@/store/notifications.ts";
import { createRecipe } from "@/actions/recipes.ts";
import { storeToRefs } from "pinia";

const store = useBaristaStore();
const referenceData = useReferenceDataStore();
const { cups } = storeToRefs(referenceData);
const notifications = useNotificationsStore();

async function onSave() {
    if (!store.name.trim()) {
        notifications.notify('error', 'Give the coffee a name before saving.');
        return;
    }

    try {
        await createRecipe(store.toPayload());
        notifications.notify('success', 'Coffee saved.');
    } catch (error) {
        console.error('Error saving recipe:', error);
        notifications.notify('error', "Couldn't save the Coffee.");
    }
}

function onClear() {
    store.reset();
    notifications.notify('info', 'Form cleared.');
}
</script>

<template>
    <Header />
    <div class="flex flex-col p-4">
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <VesselPanel title="Cup type" :items="cups" v-model="store.cup" image-folder="cup"
                         unit-label="style" :load="referenceData.loadCups"/>
<!--            <TypesPanel/>-->
<!--            <StrengthPanel/>-->
<!--            <BasePanel/>-->
        </section>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 mt-6 lg:max-h-96">
<!--            <IngredientsPanel/>-->
<!--            <PortionsPanel/>-->
<!--            <TimePanel/>-->
<!--            <ComplexityPanel/>-->
<!--            <MethodPanel/>-->
        </section>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
<!--            <DecorationsPanel/>-->
<!--            <TagsPanel/>-->
<!--            <DescriptionPanel/>-->
        </section>
        <section class="grid grid-cols-2 gap-6 p-6 ">
<!--            <button-->
<!--                    class="bg-gray-200 border-gray-400 border text-black px-4 py-2 rounded hover:bg-gray-300 w-1/4 justify-self-end cursor-pointer font-bold"-->
<!--                    @click="onClear">-->
<!--                Clear-->
<!--            </button>-->
<!--            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-1/4 cursor-pointer font-bold"-->
<!--                    @click="onSave">-->
<!--                Save-->
<!--            </button>-->
        </section>
    </div>
    <Footer />
</template>

<style scoped lang="scss">

</style>
