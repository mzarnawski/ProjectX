import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresNotAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  var user = localStorage.getItem("projectx_user")
  if(user) {
    if(to.matched.some(rec => rec.meta.requiresNotAuth)) {
      next({ name: 'home' })
      return
    }
  } else {
    if(to.matched.some(rec => rec.meta.requiresAuth)) {
        next({ name: 'login' })
        return
      }
    }
  next()
})

export default router
