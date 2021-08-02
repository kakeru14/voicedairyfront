import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
// import Login from '../views/about.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    // component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  },
  // {
  //   path: '/history',
  //   name: 'History',
  //   // component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  //   component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
  // },
  {
    path: '/history/:dairy_id?',
    name: 'HistoryDiscription',
    // component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    component: () => import(/* webpackChunkName: "about" */ '../views/DairyDiscription.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
