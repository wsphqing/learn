import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Decision from '../views/Decision.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Decision',
    component: Decision
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
