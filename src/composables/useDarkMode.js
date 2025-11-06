import { watchEffect } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useDarkMode() {
  // Dark mode state
  const isDark = useLocalStorage('darkMode', false)

  // AUTOMATISCH SYNCHRONISEREN TUSSEN isDark EN dark CLASS
  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    // De watchEffect zorgt nu voor het togglen van de class
  }

  return { isDark, toggleDarkMode }
}
