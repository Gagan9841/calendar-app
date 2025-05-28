import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

export function useTheme() {
  const theme = ref<Theme>(localStorage.getItem('theme') as Theme || 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, { immediate: true })

  return {
    theme,
    toggleTheme,
    isDark: () => theme.value === 'dark'
  }
}
