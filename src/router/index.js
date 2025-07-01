import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue'; 
import MapView from '../views/MapView.vue';     
import Login from '../views/Login.vue';    
import Signup from '../views/Signup.vue';  
import Landing from '../views/Landing.vue'; 

const routes = [
  { path: '/', redirect: '/landing' },
  { path: '/landing', component: Landing }, 
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/map', component: MapView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;

