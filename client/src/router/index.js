import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/add-photo',
    name: 'AddPhoto',
    component: () => import('../views/AddPhoto.vue')
  },
  {
    path: '/home-member',
    name: 'HomeMember',
    component: () => import('../views/HomeMember.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditPhoto',
    component: () => import('../views/EditPhoto.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth) && localStorage.token) {
    next()
  } else if (to.name === 'HomeMember' && localStorage.memberToken){
    next()
  } else if (to.name === 'HomeMember' && !localStorage.memberToken){
    next('/login')
  } else if (to.name === 'Login' && localStorage.memberToken){
    next('/home-member')
  } else if(to.name === 'Register' && !localStorage.token){
    next()
  } else if(to.name === 'Register' && localStorage.token){
    next('/')
  } else if (to.name !== 'Login' && !localStorage.token) {
    next({ path: '/login' })
  } else if (to.name === 'Login' && localStorage.token) {
    next({ path: '/' })
  } else {
    next()
  }
  
})
export default router
