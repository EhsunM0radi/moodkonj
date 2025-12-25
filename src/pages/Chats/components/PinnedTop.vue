<template>
  <div class="pinned-top" ref="el">
    <div class="left">
      <span class="label">نتیجه دور</span>
      <span :class="'score ' + (score > 0 ? 'pos' : score < 0 ? 'neg' : '')">{{ score }}</span>
    </div>
    <div class="right">
      <button class="btn ok" :disabled="voted !== null" @click="$emit('vote', 'done')">
        انجام داد
      </button>
      <button class="btn no" :disabled="voted !== null" @click="$emit('vote', 'not')">
        انجام نداد
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
type Vote = 'done' | 'not' | null
defineProps<{ score: number; voted: Vote }>()
defineEmits<{ (e: 'vote', value: Exclude<Vote, null>): void }>()
const el = ref<HTMLElement | null>(null)
defineExpose({ el })
</script>
<style scoped>
.pinned-top {
  position: sticky;
  top: 0;
  background: var(--color-header-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--color-header-border);
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.label {
  color: var(--color-text-muted);
}
.score {
  font-weight: 700;
}
.score.pos {
  color: #16a34a;
}
.score.neg {
  color: #dc2626;
}
.right {
  display: flex;
  gap: 0.5rem;
}
.btn {
  background: var(--color-button-bg);
  border: 1px solid var(--color-header-border);
  color: var(--color-text-primary);
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease, border-color .12s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
.btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.2); background: var(--color-button-bg-hover); }
.btn:active { transform: translateY(0); box-shadow: 0 2px 6px rgba(0,0,0,.2); }
.btn:disabled { opacity: .6; cursor: not-allowed; transform: none; box-shadow: none; }
.btn.ok {
  background: linear-gradient(180deg, #16a34a, #15803d);
  color: #fff;
  border-color: #14532d;
}
.btn.ok:hover { background: linear-gradient(180deg, #22c55e, #16a34a); }
.btn.no {
  background: linear-gradient(180deg, #dc2626, #b91c1c);
  color: #fff;
  border-color: #7f1d1d;
}
.btn.no:hover { background: linear-gradient(180deg, #ef4444, #dc2626); }

</style>
