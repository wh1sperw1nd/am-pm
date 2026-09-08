<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Header from "@/components/common/Header.vue";
import { useReferenceDataStore } from "@/store/referenceData";
import type { IRecipe } from "@/actions/recipes";

const referenceData = useReferenceDataStore();
const { recipes } = storeToRefs(referenceData);
const isLoading = ref(true);

onMounted(async () => {
    await referenceData.loadRecipes();
    isLoading.value = false;
});

function description(recipe: IRecipe): string {
    return (recipe.payload.description as { shortDescription?: string } | undefined)?.shortDescription ?? '';
}

function ingredientLines(recipe: IRecipe): string[] {
    const ingredients = recipe.payload.ingredients as { name: string; amount: string; unit: string }[] | undefined;
    return (ingredients ?? [])
        .filter((ingredient) => ingredient.name.trim())
        .map((ingredient) => [ingredient.amount, ingredient.unit, ingredient.name].filter(Boolean).join(' '));
}

function formattedDate(recipe: IRecipe): string {
    return new Date(recipe.createdAt).toLocaleDateString();
}
</script>

<template>
    <Header />

    <section class="mx-auto max-w-5xl px-4 py-10">
        <h1 class="mb-8 text-3xl font-normal text-gray-900 dark:text-gray-100">Recipes</h1>

        <p v-if="isLoading" class="text-gray-500">Loading recipes…</p>
        <p v-else-if="!recipes.length" class="text-gray-500">No recipes saved yet.</p>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <article
                    v-for="recipe in recipes"
                    :key="recipe.id"
                    class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
                <div class="mb-2 flex items-baseline justify-between gap-2">
                    <h2 class="text-xl font-medium text-gray-900 dark:text-gray-100">{{ recipe.name }}</h2>
                    <span class="shrink-0 text-xs text-gray-400">{{ formattedDate(recipe) }}</span>
                </div>

                <p v-if="description(recipe)" class="mb-4 text-sm text-gray-600 dark:text-slate-300">
                    {{ description(recipe) }}
                </p>

                <ul v-if="ingredientLines(recipe).length" class="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-slate-300">
                    <li v-for="line in ingredientLines(recipe)" :key="line">{{ line }}</li>
                </ul>
            </article>
        </div>
    </section>
</template>
