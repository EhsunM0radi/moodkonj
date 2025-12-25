<template>
  <div class="chatbar" ref="el">
    <input
      ref="inputEl"
      class="input"
      :value="text"
      placeholder="پیام..."
      @keydown.enter.prevent="$emit('send')"
      @input="onInput"
    />
    <div class="emoji-wrap" ref="emojiWrapEl">
      <button class="emoji" @click="togglePicker">😊</button>
    </div>
    <button class="send" @click="$emit('send')" :disabled="!text.trim().length">ارسال</button>
    <div v-if="showPicker" class="picker-wide" ref="pickerWideEl">
      <EmojiPicker :native="true" @select="onSelectEmoji" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
const props = defineProps<{ text: string }>()
const emit = defineEmits<{ (e: 'update:text', value: string): void; (e: 'send'): void }>()
const el = ref<HTMLElement | null>(null)
defineExpose({ el })
const inputEl = ref<HTMLInputElement | null>(null)
const emojiWrapEl = ref<HTMLElement | null>(null)
const pickerWideEl = ref<HTMLElement | null>(null)
const showPicker = ref(false)
const togglePicker = () => {
  showPicker.value = !showPicker.value
}
const onInput = (ev: Event) => {
  const v = (ev.target as HTMLInputElement).value
  emit('update:text', v)
}
type EmojiSelection = { native?: string; i?: string }
const onSelectEmoji = async (emoji: EmojiSelection) => {
  const elRef = inputEl.value
  const t = props.text || ''
  const start = elRef?.selectionStart ?? t.length
  const end = elRef?.selectionEnd ?? t.length
  const symbol = emoji?.i || emoji?.native || ''
  const next = t.slice(0, start) + symbol + t.slice(end)
  emit('update:text', next)
  await nextTick()
  inputEl.value?.focus()
  const pos = start + symbol.length
  inputEl.value?.setSelectionRange(pos, pos)
}
const onGlobalPointerDown = (e: Event) => {
  if (!showPicker.value) return
  const target = e.target as Node
  if (
    (pickerWideEl.value && pickerWideEl.value.contains(target)) ||
    (emojiWrapEl.value && emojiWrapEl.value.contains(target))
  )
    return
  showPicker.value = false
}
onMounted(() => document.addEventListener('pointerdown', onGlobalPointerDown, { passive: true }))
onUnmounted(() => document.removeEventListener('pointerdown', onGlobalPointerDown))
</script>
<style scoped>
.chatbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  z-index: 120;
  margin: 0 auto;
  width: min(900px, 100vw - 32px);
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.5rem;
  background: var(--color-header-bg);
  border: 1px solid var(--color-header-border);
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  position: fixed;
  --emoji-col-size: 12.5%;
}
.emoji-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.emoji {
  background: var(--color-button-bg);
  border: 1px solid var(--color-hover-bg);
  color: var(--color-text-primary);
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background-color 0.12s ease,
    border-color 0.12s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
.input {
  flex: 1;
  background: var(--color-button-bg);
  border: 1px solid var(--color-header-border);
  color: var(--color-text-primary);
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  transition:
    box-shadow 0.12s ease,
    border-color 0.12s ease;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-hover-bg);
  border-color: var(--color-hover-bg);
}
.send {
  background: var(--color-button-bg);
  border: 1px solid var(--color-hover-bg);
  color: var(--color-text-primary);
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background-color 0.12s ease,
    border-color 0.12s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
.send:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: var(--color-button-bg-hover);
}
.send:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.emoji:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: var(--color-button-bg-hover);
}
.emoji:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.picker-wide {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + 8px);
  z-index: 200;
  background: transparent;
}
:deep(.v3-emoji-picker) {
  --v3-picker-bg: var(--color-button-bg);
  --v3-picker-fg: var(--color-text-primary);
  --v3-picker-border: var(--color-header-border);
  --v3-picker-input-bg: var(--color-button-bg);
  --v3-picker-input-border: var(--color-header-border);
  --v3-picker-input-focus-border: var(--color-hover-bg);
  background: var(--v3-picker-bg);
  border: 1px solid var(--v3-picker-border);
  color: var(--v3-picker-fg);
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  width: 100% !important;
  border-radius: 12px;
}
:deep(.v3-emoji-picker .v3-header) {
  border-color: var(--v3-picker-border);
  background: var(--v3-picker-bg);
}
:deep(.v3-emoji-picker .v3-search input) {
  background: var(--v3-picker-input-bg);
  border-color: var(--v3-picker-input-border);
  color: var(--v3-picker-fg);
}
:deep(.v3-emoji-picker .v3-search input:focus) {
  border-color: var(--v3-picker-input-focus-border);
  box-shadow: 0 0 0 2px var(--color-hover-bg);
}
:deep(.v3-emoji-picker .v3-body),
:deep(.v3-emoji-picker .v3-body .v3-body-inner),
:deep(.v3-emoji-picker .v3-body .v3-body-inner .v3-group h5) {
  background: var(--v3-picker-bg);
}
:deep(.v3-emoji-picker .v3-body .v3-body-inner .v3-group .v3-emojis button) {
  flex-basis: var(--emoji-col-size);
  max-width: var(--emoji-col-size);
}
.input {
  transition:
    box-shadow 0.12s ease,
    border-color 0.12s ease;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-hover-bg);
  border-color: var(--color-hover-bg);
}
@media (min-width: 480px) {
  .chatbar {
    --emoji-col-size: 10%;
  } /* ~10 columns */
}
@media (min-width: 720px) {
  .chatbar {
    --emoji-col-size: 8.3333%;
  } /* ~12 columns */
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-hover-bg);
  border-color: var(--color-hover-bg);
}
</style>
