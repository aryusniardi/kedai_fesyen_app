import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
