<script setup lang="ts">
import NotificationsHost from "@/components/common/NotificationsHost.vue";
</script>

<template>
  <main class="flex flex-col w-full">
    <router-view />
  </main>
  <NotificationsHost/>
</template>
