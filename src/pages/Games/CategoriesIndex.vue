<template>
  <div class="page">
    <section class="glass">
      <div class="cards">
        <router-link :to="{ path: '/games', query: { category: 'couple' } }" class="card">
          <span class="icon">👫</span>
          <span class="title">کاپلی</span>
        </router-link>
        <router-link :to="{ path: '/games', query: { category: 'team' } }" class="card">
          <span class="icon">👥</span>
          <span class="title">اکیپی</span>
        </router-link>
        <router-link :to="{ path: '/games', query: { category: 'two' } }" class="card">
          <span class="icon">🎮</span>
          <span class="title">دو نفره</span>
        </router-link>
        <router-link :to="{ path: '/games', query: { category: 'online' } }" class="card">
          <span class="icon">🌐</span>
          <span class="title">آنلاین</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--color-text-primary);
  background: var(--color-button-bg);
  border: 1px solid var(--color-header-border);
  border-radius: 16px;
  padding: 1rem;
  height: 140px;
  transition: transform 0.15s ease, background 0.15s ease;
}

.card:hover {
  background: var(--color-button-bg-hover);
}

.card:active {
  transform: scale(0.98);
}

.card:focus-visible {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

.icon {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: 600;
}

@media (max-width: 480px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
  .card {
    height: 120px;
  }
}
</style>
