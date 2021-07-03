import Vue from 'vue'
import VueRouter from 'vue-router'

import firebaseService from "../providers/Firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/delivery/new',
    name: 'Create Delivery',
    component: () => import('../views/CreateDelivery.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/deliveries',
    name: 'Deliveries',
    component: () => import('../views/MyDeliveries.vue'),
    meta: {
      requiresAuth: true,
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
    component: () => import('../views/Delivery.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

const authGuard = async (to) => {
  let shouldAuthenticate = to.matched.some((record) => record.meta.requiresAuth)
  if(!shouldAuthenticate)
    return true;

  let user = await firebaseService.getCurrentUser()
  return !!user
}

router.beforeEach(async (to, from, next) => {
  let authenticated = await authGuard(to)
  if(!authenticated){
    router.push({ name: 'Login', query: { redirect: to.fullPath } });
    return
  }

  next()
})


export default router
