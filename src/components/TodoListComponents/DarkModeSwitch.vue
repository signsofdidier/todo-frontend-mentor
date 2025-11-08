<script setup>
import { useDarkModeStore } from '@/composables/darkModeStore'

const darkModeStore = useDarkModeStore()
</script>

<template>
  <button @click="darkModeStore.toggleDarkMode" class="cursor-pointer">
    <img
      :src="darkModeStore.isDark ? '/images/icon-sun.svg' : '/images/icon-moon.svg'"
      alt="moon icon"
    />
  </button>
</template>

<style scoped></style>
