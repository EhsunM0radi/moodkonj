<template>
  <button v-if="show" class="back-btn" @click="$emit('back')">→</button>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
defineEmits<{ (e: 'back'): void }>()
</script>

<style scoped>
.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.back-btn:hover { background: var(--color-button-bg-hover); }
.back-btn:active { transform: scale(0.98); }
.back-btn:focus-visible { box-shadow: 0 0 0 2px var(--color-focus-ring); }
</style>
