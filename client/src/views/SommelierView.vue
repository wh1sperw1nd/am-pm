<script setup lang="ts">
import VesselPanel from "@/components/VesselPanel.vue";
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
import { useReferenceDataStore } from "@/store/referenceData";
import { useNotificationsStore } from "@/store/notifications";
import { createRecipe } from "@/actions/recipes";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import { storeToRefs } from "pinia";
import { provide } from "vue";
import { cardThemeKey } from "@/types/theme";

provide(cardThemeKey, 'wine');

const store = useSommelierStore();
const { availableCocktailTypes, availableStrengths, availableBase } = storeToRefs(store);
const referenceData = useReferenceDataStore();
const { glasses, methods } = storeToRefs(referenceData);
const notifications = useNotificationsStore();

async function onSave() {
    if (!store.name.trim()) {
        notifications.notify('error', 'Give the cocktail a name before saving.');
        return;
    }

    try {
        await createRecipe(store.toPayload());
        notifications.notify('success', 'Cocktail saved.');
    } catch (error) {
        console.error('Error saving recipe:', error);
        notifications.notify('error', "Couldn't save the cocktail.");
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
            <VesselPanel title="Glass type" :items="glasses" v-model="store.glass" image-folder="glass"
                         unit-label="species" :load="referenceData.loadGlasses"/>
            <TypesPanel title="Cocktail Type" :items="availableCocktailTypes" v-model="store.cocktailType"
                        unit-label="type" :load="referenceData.loadCocktailTypesWithCompatibility"/>
            <StrengthPanel :items="availableStrengths" v-model="store.strength" :load="referenceData.loadStrengthsWithCompatibility"/>
            <BasePanel :items="availableBase" v-model="store.base" :load="referenceData.loadBaseDrinksWithCompatibility"/>
        </section>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 mt-6 lg:max-h-96">
            <IngredientsPanel v-model="store.ingredients"/>
            <PortionsPanel v-model:portions="store.portions" v-model:doublePortions="store.doublePortions"/>
            <TimePanel v-model:cookingTime="store.cookingTime" v-model:extendedTime="store.extendedTime"/>
            <ComplexityPanel v-model:complexity="store.complexity" v-model:uncategorized="store.uncategorized"/>
            <MethodPanel :items="methods" v-model="store.method" :load="referenceData.loadMethods"/>
        </section>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <DecorationsPanel v-model="store.decorations"/>
            <TagsPanel v-model="store.tags"/>
            <DescriptionPanel v-model:name="store.name" v-model:altNames="store.altNames"
                               v-model:shortDescription="store.shortDescription"
                               v-model:instructions="store.instructions"/>
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
    </div>
    <Footer />
</template>

<style scoped lang="scss">

</style>
