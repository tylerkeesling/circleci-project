import Admin from '@/views/Admin';
import Blog from '@/views/Blog';
import CreatePost from '@/views/CreatePost';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
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
    // beforeEnter: (to, from, next) => {
    //   const idToken = localStorage.getItem('okta-token-storage');
    //   if (idToken) {
    //     next({ path: '/' });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login/callback',
    component: LoginCallback,
  },
  {
    path: '/blog',
    component: Blog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/blog/new',
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAdmin)) {
//     console.log('record', oktaAuth);
//   }
//   next();
// });

export default router;
