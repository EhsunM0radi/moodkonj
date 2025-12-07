<template>
  <button class="hamburger" @click="$emit('toggle')">☰</button>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'toggle'): void }>()
</script>

<style scoped>
.hamburger {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-primary);
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.hamburger:hover { background: var(--color-button-bg-hover); }
.hamburger:active { transform: scale(0.98); }
</style>
