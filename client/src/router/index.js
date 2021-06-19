import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateDelivery from '../views/CreateDelivery.vue'

import firebaseService from "../providers/Firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/delivery/new',
    name: 'Create Delivery',
    component: CreateDelivery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/delivery/:id',
    name: 'Delivery',
    component: () => import('../views/Delivery.vue')
  },
  {
    path: '/pickup/new',
    name: 'Create Pickup',
    component: () => import('../views/CreatePickup.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  let user = await firebaseService.getCurrentUser()
  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
      next('/login')
      return
  }
  next()
})


export default router
