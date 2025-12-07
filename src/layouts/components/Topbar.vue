<template>
  <header class="topbar">
    <div class="left">
      <BackButton :show="canGoBack" @back="$emit('back')" />
      <Breadcrumbs :crumbs="crumbs" />
    </div>
    <HamburgerButton @toggle="$emit('toggle')" />
  </header>
</template>

<script setup lang="ts">
import BackButton from './BackButton.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import HamburgerButton from './HamburgerButton.vue'
import type { Crumb } from './Breadcrumbs.vue'

defineProps<{ canGoBack: boolean; crumbs: Crumb[] }>()
defineEmits<{ (e: 'back'): void; (e: 'toggle'): void }>()
defineOptions({ name: 'LayoutTopbar' })
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  background: var(--color-header-bg);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid var(--color-header-border);
  margin: 0.75rem 1rem;
  border-radius: 16px;
  padding: 0.75rem 1rem;
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
</style>
