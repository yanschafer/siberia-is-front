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
    meta: {
      hideTitle: true,
    },
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('@/views/Products/ProductsView.vue'),
        children: [
          {
            path: '/product/:id',
            name: 'Product details',
            component: () => import('@/views/Products/SingleProductView.vue'),
            props: true
          },
        ]
      },
      {
        path: '/storehouses',
        name: 'storehouses',
        component: () => import('@/views/Storehouses/StorehousesView.vue'),
        children: [
          {
            path: '/storehouse/:id',
            name: 'Storehouse',
            component: () => import('@/views/Storehouses/SingleStorehouseView.vue'),
            props: true
          }
        ]
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/Roles/RolesView.vue'),
        props: true,
        children: [
          {
            path: '/roles/:id',
            name: 'Role',
            component: () => import('@/views/Roles/SingleRoleView.vue'),
            props: true,
          }
        ]
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users/UsersView.vue'),
        children: [
          {
            path: '/user/:id',
            name: 'User',
            component: () => import('@/views/Users/SingleUserView.vue'),
            props: true
          },
        ]
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('@/views/History/HistoryView.vue'),
        children: [
          {
            path: '/history/:id',
            name: 'Single history',
            component: () => import('@/views/History/SingleHistoryView.vue'),
            props: true,
          }
        ]
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