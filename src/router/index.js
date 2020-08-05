import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import store from '../store/index'

Vue.use(Router)

const router = new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login
    } , {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        auth: true
      }
    }, {
      path: '/profile/:id',
        name: 'editprofile',
        component: () => import('../views/EditProfile.vue'),
        meta: {
          auth: true
        }
    }, {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue')
    }, {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue')
    }, {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../views/detail/Category.vue')
    }, {
      path: '/product/:slug',
      name: 'product',
      component: () => import('../views/detail/Product.vue')
    }, {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
      meta: {
        auth: true
      }
    }, {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue'),
      meta: {
        auth: true
      }
    }, {
      path: '/my-order',
      name: 'my-order', 
      component: () => import('../views/MyOrder.vue'),
      meta: {
        auth: true
      }
    }, {
      path: '/order/:invoice_number',
      name: 'order',
      component: () => import('../views/detail/Order.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if (to.matched.some(record => record.meta.auth)) {
    // if user == guest
    if (store.getters['auth/guest']) {
      // Menampilkan pesan
      store.dispatch('alert/set', {
        status: true,
        text: 'Login first',
        color: 'error'
      })
      store.dispatch('setPrevUrl', to.path)

      // menampilkan form login
      store.dispatch('dialog/setComponent', 'login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
