import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useDarkModeStore = defineStore('darkMode', () => {
  //state
  const isDark = ref(JSON.parse(localStorage.getItem('darkMode')) || false)

  // actions
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  // Automatisch synchroniseren met localStorage en dark class
  watch(
    isDark,
    (newValue) => {
      localStorage.setItem('darkMode', JSON.stringify(newValue))

      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    { immediate: true },
  ) // immediate: true zorgt dat het direct wordt uitgevoerd bij initialisatie

  return {
    isDark,
    toggleDarkMode,
  }
})
