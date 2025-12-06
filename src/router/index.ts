import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/Layouts/DefaultLayout.vue'

import Home from '@/pages/Home/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },

      ]
    }
  ],
})

export default router
