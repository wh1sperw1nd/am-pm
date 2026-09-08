<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loading from "@/components/common/Loading/Loading.vue";
import NotificationsHost from "@/components/common/NotificationsHost.vue";

const MIN_LOADING_MS = 1200;

const isLoading = ref(true);

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, MIN_LOADING_MS);
});
</script>

<template>
    <Loading v-if="isLoading" :duration="MIN_LOADING_MS" />
    <template v-else>
        <main class="flex flex-col w-full">
            <router-view />
        </main>
        <NotificationsHost/>
    </template>
</template>
