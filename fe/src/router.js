import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meal',
      name: 'meal',
      component: () => import('./views/meal.vue')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('./views/ranking.vue')
    },
    {
      path: '/menu/:id',
      name: 'menu',
      props: true,
      component: () => import('./views/menu.vue')
    }
  ]
})
