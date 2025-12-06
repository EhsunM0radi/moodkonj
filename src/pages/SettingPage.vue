<template>
  <div class="settings">
    <h1 class="title">تنظیمات</h1>
    <section class="section">
      <div class="row">
        <span class="label">حالت نمایش</span>
        <button class="toggle" @click="toggleTheme" :aria-pressed="isDark ? 'true' : 'false'">
          <span class="thumb" :class="isDark ? 'on' : ''"></span>
          <span class="text">{{ isDark ? 'دارک' : 'لایت' }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.theme === 'dark')
const toggleTheme = () => themeStore.toggleTheme()
</script>

<style scoped>
.settings {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.section {
  background: var(--color-header-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--color-header-border);
  border-radius: 16px;
  padding: 1rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  color: var(--color-text-muted);
}

.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-button-bg);
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  color: var(--color-text-primary);
}

.toggle:hover {
  background: var(--color-button-bg-hover);
}

.toggle:focus-visible {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

.thumb {
  width: 32px;
  height: 18px;
  border-radius: 999px;
  background: var(--color-hover-bg);
  position: relative;
}

.thumb::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-text-primary);
  transform: translateY(-50%);
  transition: left 0.2s ease;
}

.thumb.on::after {
  left: 17px;
}

.text {
  font-weight: 600;
}
</style>
