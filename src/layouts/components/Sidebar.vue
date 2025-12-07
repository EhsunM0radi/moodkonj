<template>
  <aside class="sidebar" @click.stop>
    <button class="close-btn" @click="$emit('close')">×</button>
    <router-link class="item" to="/" @click="$emit('close')">
      <span class="icon">🏠</span>
      <span>خانه</span>
    </router-link>
    <router-link class="item" to="/profile" @click="$emit('close')">
      <span class="icon">👤</span>
      <span>پروفایل</span>
    </router-link>
    <router-link class="item" to="/games" @click="$emit('close')">
      <span class="icon">🎮</span>
      <span>بازی</span>
    </router-link>
    <router-link class="item" to="/meet" @click="$emit('close')">
      <span class="icon">🤝</span>
      <span>میت</span>
    </router-link>
    <router-link class="item" to="/notifications" @click="$emit('close')">
      <span class="icon">🔔</span>
      <span>اعلانات</span>
    </router-link>
    <router-link class="item" to="/recommendations" @click="$emit('close')">
      <span class="icon">💡</span>
      <span>پیشنهادات</span>
    </router-link>
    <router-link class="item" to="/chats" @click="$emit('close')">
      <span class="icon">💬</span>
      <span>چت ها</span>
    </router-link>
    <router-link class="item" to="/watch" @click="$emit('close')">
      <span class="icon">▶️</span>
      <span>تماشا</span>
    </router-link>
    <router-link class="item" to="/settings" @click="$emit('close')">
      <span class="icon">⚙️</span>
      <span>تنظیمات</span>
    </router-link>
  </aside>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'close'): void }>()
defineOptions({ name: 'LayoutSidebar' })
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100%;
  background: linear-gradient(180deg, var(--color-sidebar-start) 0%, var(--color-sidebar-end) 100%);
  border-right: none;
  padding: 1rem 1rem;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 150;
  font-family: var(--font-sans);
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
  color: var(--color-text-primary);
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
.close-btn:hover {
  background: var(--color-button-bg-hover);
}
.close-btn:active {
  transform: scale(0.98);
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
  color: var(--color-text-primary);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}
.item:hover {
  background: var(--color-hover-bg);
}
.item:active {
  transform: scale(0.98);
}
.item:focus-visible {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
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

@media (max-width: 768px) {
  .sidebar {
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    padding: calc(0.75rem + env(safe-area-inset-top)) 0.75rem 0.75rem;
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
    margin: 0.5rem 0.5rem 0.75rem 0;
    z-index: 1;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: min(440px, 94vw);
    font-size: 1.05rem;
    padding: 1rem 0.9rem;
  }
  .item:hover {
    transform: none;
  }
  .icon {
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }
}
</style>
