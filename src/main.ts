import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import '@/assets/main.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const themeStore = useThemeStore(pinia)
themeStore.init()

app.mount('#app')
