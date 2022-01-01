import About from '@/views/About';
import Admin from '@/views/Admin';
import Home from '@/views/Home';
import Login from '@/views/Login';
import { LoginCallback } from '@okta/okta-vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/login/callback',
    component: LoginCallback,
  },
  {
    path: '/about',
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach(Vue.$auth.authRedirectGuard());

export default router;
