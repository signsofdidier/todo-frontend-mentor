import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const data = ref(JSON.parse(localStorage.getItem(key)) || defaultValue) //

  //watch de data en sla op in localStorage bij wijzigingen
  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }, //zorgt ervoor dat nested changes ook worden gedetecteerd
  )

  return data //return de reactive data
}
