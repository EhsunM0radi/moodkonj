<template>
  <div class="page">
    <section class="glass">
      <div class="wheel-wrap">
        <div class="wheel" :style="{ background: gradient }">
          <div class="labels">
            <span v-for="(p, i) in players" :key="p.id" class="label" :style="labelStyle(i)">
              {{ p.name }}
            </span>
          </div>
          <div class="bottle" :style="{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }">
            <svg class="svg-bottle" viewBox="0 0 100 100" aria-hidden="true">
              <path
                d="M42 8h16v18l-4 6c13 6 20 18 20 34 0 10-6 24-26 24s-26-14-26-24c0-16 7-28 20-34l-4-6V8z"
              />
            </svg>
          </div>
          <div class="pointer">▲</div>
        </div>
      </div>
      <div class="actions">
        <button class="spin-btn" :disabled="spinning" @click="spin">اسپین</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Player = { id: string; name: string; color: string }
const players = ref<Player[]>([
  { id: 'p1', name: 'آرین', color: '#f59e0b' },
  { id: 'p2', name: 'نگین', color: '#ef4444' },
  { id: 'p3', name: 'پارسا', color: '#10b981' },
  { id: 'p4', name: 'سارا', color: '#3b82f6' },
  { id: 'p5', name: 'ماهان', color: '#8b5cf6' },
  { id: 'p6', name: 'نازنین', color: '#f97316' },
])

const step = computed(() => 360 / players.value.length)
const gradient = computed(() => {
  const parts = players.value.map((p, i) => {
    const start = i * step.value
    const end = (i + 1) * step.value
    return `${p.color} ${start}deg ${end}deg`
  })
  return `conic-gradient(${parts.join(', ')})`
})

const angle = ref(0)
const spinning = ref(false)

const labelStyle = (i: number) => {
  const a = (i + 0.5) * step.value
  return {
    transform: `translate(-50%, -50%) rotate(${a}deg) translate(0, calc(-0.34 * var(--wheel-size))) rotate(${-a}deg)`,
  }
}

const spin = () => {
  if (spinning.value) return
  spinning.value = true
  const extra = 3 + Math.floor(Math.random() * 4)
  const targetIndex = Math.floor(Math.random() * players.value.length)
  const center = (targetIndex + 0.5) * step.value
  const jitter = (Math.random() - 0.5) * step.value * 0.3
  angle.value = extra * 360 + center + jitter
  const durationMs = 2800
  window.setTimeout(() => {
    spinning.value = false
    const chosen = players.value[targetIndex]!
    router.push({
      name: 'chat-screen',
      params: { id: `spin-${chosen.id}` },
      query: { name: chosen.name, count: String(players.value.length) },
    })
  }, durationMs + 50)
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.glass {
  width: 100%;
  max-width: 900px;
  background: var(--color-header-bg);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid var(--color-header-border);
  border-radius: 16px;
  padding: 1rem;
}
.wheel-wrap {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.wheel {
  position: relative;
  --wheel-size: 320px;
  --bottle-size: 4rem;
  width: var(--wheel-size);
  height: var(--wheel-size);
  border-radius: 50%;
  border: 1px solid var(--color-header-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) inset;
}
.labels {
  position: absolute;
  inset: 0;
}
.label {
  position: absolute;
  left: 50%;
  top: 50%;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  transform-origin: center;
  pointer-events: none;
}
.bottle {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: var(--bottle-size);
  transition: transform 2.8s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: center;
}
.svg-bottle {
  width: 1em;
  height: 1em;
  fill: var(--color-text-primary);
}
.pointer {
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
  color: var(--color-text-primary);
  font-size: 0.9rem;
}
.actions {
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;
}
.spin-btn {
  background: var(--color-button-bg);
  border: 1px solid var(--color-header-border);
  color: var(--color-text-primary);
  padding: 0.6rem 1rem;
  border-radius: 10px;
  cursor: pointer;
}
.spin-btn:hover {
  background: var(--color-button-bg-hover);
}
.spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
@media (max-width: 480px) {
  .wheel {
    --wheel-size: 280px;
    --bottle-size: 3.5rem;
    width: var(--wheel-size);
    height: var(--wheel-size);
  }
}
</style>
