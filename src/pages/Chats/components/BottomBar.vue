<template>
  <div class="bottom-bar">
    <div class="turn">
      <span class="label">نوبت</span>
      <span class="name">{{ targetName }}</span>
      <div class="choices" v-if="choice === null">
        <button class="btn choice choice-dare" @click="$emit('choose', 'dare')">😈 جرعت</button>
        <button class="btn choice choice-truth" @click="$emit('choose', 'truth')">😇 حقیقت</button>
      </div>
      <div class="chosen" v-else>
        <span class="chip">{{ choice === 'dare' ? 'جرعت' : 'حقیقت' }}</span>
      </div>
    </div>
    <div class="proposer">
      <input
        class="input"
        :value="proposalText"
        :placeholder="choice ? 'پیشنهادت رو بنویس...' : 'ابتدا جرعت/حقیقت انتخاب شود'"
        :disabled="!choice"
        @input="$emit('update:proposalText', ($event.target as HTMLInputElement).value)"
        @keydown.enter.prevent="$emit('sendProposal')"
      />
      <button
        class="send"
        @click="$emit('sendProposal')"
        :disabled="!choice || proposalText.trim().length === 0"
      >
        ارسال پیشنهاد
      </button>
    </div>
    <div class="finalize">
      <button class="btn finalize" :disabled="!canFinalize" @click="$emit('finalize')">
        نهایی‌سازی
      </button>
      <span class="hint">نیاز به {{ requiredLikes }} لایک</span>
    </div>
  </div>
</template>
<script setup lang="ts">
type Choice = 'truth' | 'dare' | null
defineProps<{
  targetName: string
  choice: Choice
  proposalText: string
  requiredLikes: number
  canFinalize: boolean
}>()
defineEmits<{
  (e: 'choose', value: Exclude<Choice, null>): void
  (e: 'update:proposalText', value: string): void
  (e: 'sendProposal'): void
  (e: 'finalize'): void
}>()
</script>
<style scoped>
.bottom-bar {
  background: var(--color-header-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--color-header-border);
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 0.5rem;
  align-items: center;
}
.turn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.label {
  color: var(--color-text-muted);
}
.choices {
  display: flex;
  gap: 0.4rem;
}
.btn.choice {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.chip {
  background: var(--color-hover-bg);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
  font-size: 0.9rem;
}
.proposer {
  display: flex;
  gap: 0.5rem;
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
.btn {
  background: var(--color-button-bg);
  border: 1px solid var(--color-header-border);
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
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: var(--color-button-bg-hover);
}
.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.btn.choice {
  border-color: var(--color-hover-bg);
}
.choice-dare {
  background: linear-gradient(180deg, #7c3aed, #6d28d9);
  color: #fff;
  border-color: #5b21b6;
}
.choice-dare:hover {
  background: linear-gradient(180deg, #8b5cf6, #7c3aed);
}
.choice-truth {
  background: linear-gradient(180deg, #0ea5e9, #0284c7);
  color: #fff;
  border-color: #0369a1;
}
.choice-truth:hover {
  background: linear-gradient(180deg, #38bdf8, #0ea5e9);
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
.finalize {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.btn.finalize {
  font-weight: 700;
  background: linear-gradient(180deg, #16a34a, #15803d);
  color: #fff;
  border-color: #14532d;
}
.btn.finalize:hover {
  background: linear-gradient(180deg, #22c55e, #16a34a);
}
.btn.finalize:active {
  background: linear-gradient(180deg, #16a34a, #15803d);
}
.btn.finalize:disabled {
  opacity: 0.6;
}
.hint {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
@media (max-width: 600px) {
  .bottom-bar {
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
  }
}
</style>
