<template>
  <div class="messages" ref="el" :style="{ height }">
    <div v-for="m in messages" :key="m.id" :class="'bubble ' + (m.sender === 'me' ? 'me' : 'you')">
      <div class="bubble-meta" v-if="showNames">
        <span class="name">{{
          m.sender === 'me' ? myName : m.senderName || othersName || 'بازیکن'
        }}</span>
      </div>
      <div class="bubble-head" v-if="m.type === 'proposal'">
        <span class="chip">{{ m.likes }} لایک</span>
        <button class="mini" @click="$emit('like', m)" :disabled="m.liked">لایک</button>
        <button class="mini" @click="$emit('selectProposal', m.id)">انتخاب</button>
      </div>
      <div class="bubble-body">{{ m.text }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
type Msg = {
  id: string
  text: string
  sender: 'me' | 'you'
  type: 'chat' | 'proposal'
  likes?: number
  liked?: boolean
  senderName?: string
}
defineProps<{
  messages: Msg[]
  height: string
  myName: string
  othersName?: string
  showNames?: boolean
}>()
defineEmits<{ (e: 'like', m: Msg): void; (e: 'selectProposal', id: string): void }>()
const el = ref<HTMLElement | null>(null)
defineExpose({ el })
</script>
<style scoped>
.messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.25rem;
  overflow-y: auto;
}
.bubble-meta {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
  text-align: right;
}
.bubble {
  max-width: 70%;
  padding: 0.5rem 0.7rem;
  border-radius: 10px;
  border: 1px solid var(--color-header-border);
  background: var(--color-button-bg);
  color: var(--color-text-primary);
  margin-left: 0;
  margin-right: 0;
}
.bubble.me {
  margin-left: auto;
  margin-right: 0;
}
.bubble.you {
  margin-right: auto;
  margin-left: 0;
}
.bubble-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
}
.chip {
  background: var(--color-hover-bg);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
  font-size: 0.8rem;
}
.mini {
  background: var(--color-button-bg);
  border: 1px solid var(--color-header-border);
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background-color 0.12s ease,
    border-color 0.12s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
.mini:hover {
  background: var(--color-button-bg-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.mini:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.mini:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
