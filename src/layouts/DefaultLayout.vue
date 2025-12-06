<template>
  <div class="layout" dir="rtl">
    <header class="topbar">
      <div class="left">
        <button v-if="canGoBack" class="back-btn" @click="goBack">→</button>
        <nav class="breadcrumbs">
          <router-link v-for="(crumb, index) in crumbs" :key="index" :to="crumb.to" class="crumb">
            {{ crumb.label }}
          </router-link>
        </nav>
      </div>
      <button class="hamburger" @click="toggleMenu">☰</button>
    </header>
    <transition name="slide">
      <aside v-if="menuOpen" class="sidebar" @click.stop>
        <button class="close-btn" @click="closeMenu">×</button>
        <router-link class="item" to="/" @click="closeMenu">
          <span class="icon">🏠</span>
          <span>خانه</span>
        </router-link>
        <router-link class="item" to="/profile" @click="closeMenu">
          <span class="icon">👤</span>
          <span>پروفایل</span>
        </router-link>
        <router-link class="item" to="/games" @click="closeMenu">
          <span class="icon">🎮</span>
          <span>بازی</span>
        </router-link>
        <router-link class="item" to="/meet" @click="closeMenu">
          <span class="icon">🤝</span>
          <span>میت</span>
        </router-link>
        <router-link class="item" to="/notifications" @click="closeMenu">
          <span class="icon">🔔</span>
          <span>اعلانات</span>
        </router-link>
        <router-link class="item" to="/recommendations" @click="closeMenu">
          <span class="icon">💡</span>
          <span>پیشنهادات</span>
        </router-link>
        <router-link class="item" to="/chats" @click="closeMenu">
          <span class="icon">💬</span>
          <span>چت ها</span>
        </router-link>
        <router-link class="item" to="/watch" @click="closeMenu">
          <span class="icon">▶️</span>
          <span>تماشا</span>
        </router-link>
        <router-link class="item" to="/settings" @click="closeMenu">
          <span class="icon">⚙️</span>
          <span>تنظیمات</span>
        </router-link>
      </aside>
    </transition>
    <main class="content" @click="closeMenu">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

// Back Button
const canGoBack = computed(() => window.history.length > 2)
const goBack = () => router.back()

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
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

.topbar {
  position: sticky;
  top: 0;
  margin: 10px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-2px);
}

.breadcrumbs {
  display: flex;
  gap: 0.4rem;
  font-family: 'Vazir', 'Tahoma', sans-serif;
}

.crumb {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.crumb:hover {
  opacity: 0.8;
}

.crumb::after {
  content: '/';
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  color: rgba(255, 255, 255, 0.6);
}

.crumb:last-child::after {
  content: '';
}

.hamburger {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.3);
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100%;
  background: linear-gradient(180deg, #f6d365 0%, #fda085 100%);
  border-right: none;
  padding: 1rem 1rem;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 150;
  font-family: 'Vazir', 'Tahoma', sans-serif;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
  box-sizing: border-box;
  overflow-x: hidden;
}

.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.sidebar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.55);
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 1.4rem;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  cursor: pointer;
  position: sticky;
  top: 0;
}

.icon {
  width: 1.5rem;
  display: inline-block;
  text-align: center;
  margin-left: 0.5rem;
}

.item {
  display: block;
  padding: 0.9rem 1rem;
  text-decoration: none;
  color: white;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.content {
  flex: 1;
  padding: 1rem;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    padding: calc(1rem + env(safe-area-inset-top)) 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  .close-btn {
    position: sticky;
    top: 0;
    align-self: flex-start;
    margin: 0.5rem 0.5rem 1rem 0;
    z-index: 1;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: min(440px, 90vw);
    font-size: 1.05rem;
    padding: 1.1rem 1rem;
  }
  .item:hover {
    transform: none;
  }
  .icon {
    font-size: 1.2rem;
    margin-left: 0.6rem;
  }
}
</style>
