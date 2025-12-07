<template>
  <nav class="breadcrumbs">
    <router-link v-for="(crumb, index) in crumbs" :key="index" :to="crumb.to" class="crumb">
      {{ crumb.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
export type Crumb = { label: string; to: string }
defineProps<{ crumbs: Crumb[] }>()
defineOptions({ name: 'LayoutBreadcrumbs' })
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  gap: 0.4rem;
  font-family: var(--font-sans);
}
.crumb {
  color: var(--color-text-primary);
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
  color: var(--color-text-muted);
}
.crumb:last-child::after {
  content: '';
}
</style>
