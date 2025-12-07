<template>
  <div class="layout" dir="rtl">
    <Topbar :canGoBack="canGoBack" :crumbs="crumbs" @back="goBack" @toggle="toggleMenu" />
    <transition name="slide">
      <Sidebar v-if="menuOpen" @close="closeMenu" />
    </transition>
    <main class="content" @click="closeMenu">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Topbar from '@/layouts/components/Topbar.vue'
import Sidebar from '@/layouts/components/Sidebar.vue'

const route = useRoute()
const router = useRouter()

// دیکشنری ترجمه
const translations: Record<string, string> = {
  home: 'خانه',
  about: 'درباره ما',
  profile: 'پروفایل',
  games: 'بازی',
  game: 'بازی',
  meet: 'میت',
  notifications: 'اعلانات',
  notification: 'اعلان',
  recommendations: 'پیشنهادات',
  recommendation: 'پیشنهاد',
  chats: 'چت ها',
  chat: 'چت',
  watch: 'تماشا',
  settings: 'تنظیمات',
  dashboard: 'داشبورد',
}

// تابع ترجمه
const translate = (text: string) => {
  const lower = text.toLowerCase()
  return translations[lower] || text
}

// ذخیره تعداد صفحات بازدید شده
const navigationCount = ref(0)

// افزایش شمارنده هر بار که route تغییر کند
watch(
  () => route.fullPath,
  () => {
    navigationCount.value++
  },
  { immediate: true }
)

// Back Button - نمایش دکمه بک در تمام صفحات به جز home
const canGoBack = computed(() => {
  // فقط وقتی که در صفحه home نیستیم، دکمه بک را نشان بده
  return route.path !== '/'
})

const goBack = () => {
  // اگر در history صفحه قبلی وجود دارد، برگرد
  // در غیر این صورت به home برو
  if (window.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}

// Breadcrumb generator
const crumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((segment, index) => ({
    label: translate(segment.charAt(0).toUpperCase() + segment.slice(1)),
    to: '/' + paths.slice(0, index + 1).join('/'),
  }))
})

// Hamburger sidebar
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

watch(
  () => route.fullPath,
  () => {
    if (menuOpen.value) closeMenu()
  },
)
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
}
.content {
  flex: 1;
  padding: 1rem;
}
</style>
