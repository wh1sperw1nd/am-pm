<script setup lang="ts">
import NotificationsHost from "@/components/common/NotificationsHost.vue";
</script>

<template>
  <main class="flex justify-center flex-col container max-w-7xl m-auto">
    <router-view />
  </main>
  <NotificationsHost/>
</template>
