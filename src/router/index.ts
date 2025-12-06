import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import Home from '@/pages/HomePage.vue'
import ChatIndex from '@/pages/Chats/ChatsIndex.vue'
import ChatScreen from '@/pages/Chats/ChatScreen.vue'
import CategoriesIndex from '@/pages/Meet/CategoriesIndex.vue'
import GamesIndex from '@/pages/Games/GamesIndex.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import RecommendationsPage from '@/pages/RecommendationsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import NotificationsPage from '@/pages/NotificationsPage.vue'
import SettingPage from '@/pages/SettingPage.vue'
import WatchPage from '@/pages/WatchPage.vue'

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
          component: Home,
        },
        {
          path: '/chats',
          name: 'chats',
          component: ChatIndex,
        },
        {
          path: '/chats/:id',
          name: 'chat-screen',
          component: ChatScreen,
        },
        {
          path: '/meet',
          name: 'meet',
          component: CategoriesIndex,
        },
        {
          path: '/games',
          name: 'games',
          component: GamesIndex,
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfilePage,
        },
        {
          path: '/recommendations',
          name: 'recommendations',
          component: RecommendationsPage,
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: NotificationsPage,
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingPage,
        },
        {
          path: '/watch',
          name: 'watch',
          component: WatchPage,
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: NotFoundPage,
        },
      ],
    },
  ],
})

export default router
