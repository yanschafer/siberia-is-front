import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: '/products',
        name: 'products',
        component: () => import('@/views/Products/ProductsView.vue'),
        children: [
          {
            path: ':id',
            name: 'product',
            component: () => import('@/views/Products/SingleProductView.vue')
          }
        ]
      },
      {
        path: '/storehouses',
        name: 'storehouses',
        component: () => import('@/views/Storehouses/StorehousesView.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users/UsersView.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Check token
const checkToken = () => {
  //Future token validation logic
  const token = localStorage.getItem('token');
  return !!token;
};

//Global authorization check
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !checkToken()) {
    //In case token is not valid
    next('/login');
  } else {
    next();
  }
});

export default router;