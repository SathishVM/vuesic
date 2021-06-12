import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/manage-music',
    name: 'Manage',
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/manage',
    redirect: { name: 'Manage' },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, _from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    // eslint-disable-next-line no-useless-return
    return;
  }

  if (store.state.userLoggedIn) next();
  else {
    // eslint-disable-next-line no-alert
    alert('In order to proceed you must be login before accessing this route.');
    next({ name: 'Home' });
  }
});

export default router;
