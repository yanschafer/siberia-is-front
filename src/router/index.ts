import { createRouter, createWebHistory } from 'vue-router';
import TokenUtil from "@/utils/token.util";
import {appConf} from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";

/*
user-managing = "1"
  rbac-managing = "2"
  check-logs = "3"
  brand-managing = "4"
  collection-managing = "5"
  category-managing = "6"
  products-managing = "7"
  stock-managing = "8"
 */

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    name: "dashboard",
    path: '/dashboard',
    component: () => import('@/views/MainView.vue'),
    meta: {
      hideTitle: true,
      requireAuth: true
    },
    children: [
      {
        path: '/products',
        name: 'products',
        component: () => import('@/views/Products/ProductsView.vue'),
        meta: {
          ruleId: appConf.rules.productsManaging,
          showAddBtn: true,
          addBtnRoute: "New product"
        },
        children: [
          {
            path: '/product/:id',
            name: 'Product details',
            component: () => import('@/views/Products/SingleProductView.vue'),
            props: true,
            meta: {
              showAddBtn: false
            },
          },
        ]
      },
      {
        path: '/product/new',
        name: 'New product',
        component: () => import('@/views/Products/CreateProduct.vue'),
        props: true
      },
      {
        path: '/storehouses',
        name: 'storehouses',
        component: () => import('@/views/Storehouses/StorehousesView.vue'),
        meta: {
          ruleId: appConf.rules.stockManaging,
          showAddBtn: true,
          addBtnRoute: "New storehouse"
        },
        children: [
          {
            path: '/storehouse/:id',
            name: 'Storehouse',
            component: () => import('@/views/Storehouses/SingleStorehouseView.vue'),
            props: true,
            meta: {
              showAddBtn: false,
            },
          }
        ]
      },
      {
        path: '/storehouses/new',
        name: 'New storehouse',
        component: () => import('@/views/Storehouses/CreateStorehouse.vue'),
        props: true
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/Roles/RolesView.vue'),
        props: true,
        meta: {
          ruleId: appConf.rules.rbacManaging,
          showAddBtn: true,
          addBtnRoute: "New role"
        },
        children: [
          {
            path: '/roles/:id',
            name: 'Role',
            component: () => import('@/views/Roles/SingleRoleView.vue'),
            props: true,
            meta: {
              showAddBtn: false
            },
          }
        ]
      },
      {
        path: '/roles/new',
        name: 'New role',
        component: () => import('@/views/Roles/CreateRole.vue'),
        props: true
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users/UsersView.vue'),
        meta: {
          ruleId: appConf.rules.userManaging,
          showAddBtn: true,
          addBtnRoute: "New user"
        },
        children: [
          {
            path: '/user/:id',
            name: 'User',
            component: () => import('@/views/Users/SingleUserView.vue'),
            props: true,
            meta: {
              showAddBtn: false
            },
          },
        ]
      },
      {
        path: '/users/new',
        name: 'New user',
        component: () => import('@/views/Users/CreateUser.vue'),
        props: true
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('@/views/History/HistoryView.vue'),
        meta: {
          ruleId: appConf.rules.checkLogs,
          showAddBtn: false
        },
        children: [
          {
            path: '/history/:id',
            name: 'Single history',
            component: () => import('@/views/History/SingleHistoryView.vue'),
            props: true,
            meta: {
              showAddBtn: false
            },
          }
        ]
      },
      {
        path: '/operations',
        name: 'Operations',
        component: () => import('@/views/Operations/OperationsView.vue'),
        meta: {
          showAddBtn: false
        },
        children: [
          {
            path: '/operations/:id',
            name: 'Single operation',
            component: () => import('@/views/Operations/SingleOperationView.vue'),
            props: true,
          }
        ]
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Global authorization check
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta["requireAuth"]

  if (requiresAuth && !TokenUtil.isAuthorized()) {
    //In case token is not valid
    next('/login');
    return
  }
  if (!requiresAuth && TokenUtil.isAuthorized()) {
    next("/dashboard");
    return
  }

  if (to.meta["ruleId"]) {
    if (!TokenUtil.hasAccessTo(parseInt(to.meta["ruleId"].toString()))) {
      next("/dashboard")
      return
    }
  } else LoggerUtil.debug(to, to.meta)

  next()
});

export default router;