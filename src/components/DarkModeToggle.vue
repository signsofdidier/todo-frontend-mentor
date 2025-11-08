<script setup>
import { useDarkModeStore } from '@/stores/darkModeStore' // of '@/stores/darkMode'

const darkModeStore = useDarkModeStore()
</script>

<template>
  <button @click="darkModeStore.toggleDarkMode" class="cursor-pointer">
    <img
      :src="darkModeStore.isDark ? '/images/icon-sun.svg' : '/images/icon-moon.svg'"
      :alt="darkModeStore.isDark ? 'Sun icon' : 'Moon icon'"
    />
  </button>
</template>
