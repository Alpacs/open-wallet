import { createRouter, createWebHistory } from 'vue-router'

import WalletPage from '../views/WalletPage.vue'
import MiddlePage from '../views/MiddlePage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const routes = [
  {
    path: '/',
    name: 'wallet',
    component: WalletPage
  },
  {
    path: '/middle',
    name: 'MiddlePage',
    component: MiddlePage
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
