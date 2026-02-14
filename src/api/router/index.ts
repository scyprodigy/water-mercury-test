import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage },
    { 
      path: '/dashboard', 
      component: Dashboard,
      // 簡單的導航守衛：沒 Token 就踢回登入頁
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) next('/login');
        else next();
      }
    }
  ]
})

export default router
