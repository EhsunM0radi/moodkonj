import { ref } from 'vue'
import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
  }

  const init = () => {
    const saved = localStorage.getItem('theme') as Theme | null
    theme.value = saved === 'dark' ? 'dark' : 'light'
    applyTheme(theme.value)
  }

  const setTheme = (t: Theme) => {
    theme.value = t
    localStorage.setItem('theme', t)
    applyTheme(t)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, init, setTheme, toggleTheme }
})
