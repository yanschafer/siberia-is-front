import { createRouter, createWebHistory } from "vue-router";
import TokenUtil from "@/utils/token.util";
import { appConf } from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import app from "@/App.vue";
import BreadcrumbDto from "@/router/dto/breadcrumb.dto";
import { useMediaModalStore } from "@/stores/media-modal.store";
import HeaderBtnDto from "@/router/dto/header-btn.dto";
import RouteParametrized from "@/router/dto/route-parametrized";
import { useAddToGroupModalStore } from "@/stores/add-to-group-modal.store";

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
    path: "/",
    redirect: "/login",
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    name: "Siberia Panel",
    path: "/",
    component: () => import("@/views/MainView.vue"),
    meta: {
      name: PrintUtil.localize("panelName", "router"),
      hideTitle: true,
      requireAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/DashboardView.vue"),
        meta: {
          name: PrintUtil.localize("dashboard", "router"),
        },
      },
      {
        path: "/assortment",
        name: "assortment",
        component: () => import("@/views/Assortment/AssortmentView.vue"),
        meta: {
          name: PrintUtil.localize("assortments", "router"),
          ruleId: [
            appConf.rules.brandManaging,
            appConf.rules.collectionManaging,
            appConf.rules.categoryManaging,
          ],
        },
      },
      {
        path: "/media",
        name: "media",
        component: () => import("@/views/Media/MediaView.vue"),
        meta: {
          buttons: [
            new HeaderBtnDto("+ ADD", null, () => {
              const mediaStore = useMediaModalStore();
              mediaStore.openUploadModal();
            }),
          ],
          name: PrintUtil.localize("Media", "router"),
        },
      },
      {
        path: "/products",
        name: "products",
        component: () => import("@/views/Products/ProductsView.vue"),
        meta: {
          ruleId: [
            appConf.rules.productsManaging,
            appConf.rules.viewProductsList,
          ],
          buttons: [
            new HeaderBtnDto(
              PrintUtil.localize("+ ADD", "router"),
              new RouteParametrized("New product"),
            ),
            new HeaderBtnDto(
              PrintUtil.localize("UPLOAD", "router"),
              null,
              () => {
                const mediaStore = useMediaModalStore();
                mediaStore.openUploadProducts();
              },
            ),
          ],
          name: PrintUtil.localize("products", "router"),
        },
        children: [
          {
            path: "/product/:id",
            name: "Product details",
            component: () => import("@/views/Products/SingleProductView.vue"),
            props: true,
            meta: {
              name: PrintUtil.localize("Product", "router"),
            },
          },
        ],
      },
      {
        path: "/product/new",
        name: "New product",
        component: () => import("@/views/Products/CreateProduct.vue"),
        props: true,
        meta: {
          breadcrumbs: [
            new BreadcrumbDto(
              PrintUtil.localize("panelName", "router"),
              new RouteParametrized("dashboard"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("products", "router"),
              new RouteParametrized("products"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("NewProduct", "router"),
              new RouteParametrized("products"),
            ),
          ],
          name: PrintUtil.localize("NewProduct", "router"),
        },
      },
      {
        name: "groups",
        path: "/group",
        component: () => import("@/views/groups/GroupsView.vue"),
        props: true,
        meta: {
          breadcrumbs: [
            new BreadcrumbDto(
              PrintUtil.localize("panelName", "router"),
              new RouteParametrized("dashboard"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("Groups", "router"),
              new RouteParametrized("groups"),
            ),
          ],
          buttons: [
            new HeaderBtnDto(
              PrintUtil.localize("+ ADD", "router"),
              null,
              () => {
                const groupModalStore = useAddToGroupModalStore();
                groupModalStore.openCreateModal();
              },
            ),
          ],
          name: PrintUtil.localize("Groups", "router"),
        },
      },
      {
        path: "/group/:id",
        name: "Group details",
        component: () => import("@/views/groups/SingleProductGroupView.vue"),
        props: true,
        meta: {
          breadcrumbs: [
            new BreadcrumbDto(
              PrintUtil.localize("panelName", "router"),
              new RouteParametrized("dashboard"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("Groups", "router"),
              new RouteParametrized("groups"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("Group details", "router"),
              new RouteParametrized("Group details"),
            ),
          ],
          name: PrintUtil.localize("Group details", "router"),
        },
      },
      {
        path: "/group/:id/apply",
        name: "Group apply",
        component: () => import("@/views/groups/ApplyChangesView.vue"),
        props: true,
        meta: {
          breadcrumbs: [
            new BreadcrumbDto(
              PrintUtil.localize("panelName", "router"),
              new RouteParametrized("dashboard"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("Groups", "router"),
              new RouteParametrized("groups"),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("Group details", "router"),
              new RouteParametrized("Group details", {
                id: "nested",
              }),
            ),
            new BreadcrumbDto(
              PrintUtil.localize("Apply changes", "router"),
              new RouteParametrized("Group apply"),
            ),
          ],
          name: PrintUtil.localize("Apply changes", "router"),
        },
      },
      {
        path: "/storehouses",
        name: "storehouses",
        component: () => import("@/views/Storehouses/StorehousesView.vue"),
        meta: {
          name: PrintUtil.localize("storehouses", "router"),
          ruleId: [appConf.rules.stockManaging, appConf.rules.viewStockData],
          buttons: [
            new HeaderBtnDto(
              PrintUtil.localize("+ ADD", "router"),
              new RouteParametrized("New storehouse"),
            ),
          ],
        },
        children: [
          {
            path: "/storehouse/:id",
            name: "Storehouse",
            component: () =>
              import("@/views/Storehouses/SingleStorehouseView.vue"),
            props: true,
            meta: {
              name: PrintUtil.localize("Storehouse", "router"),
            },
          },
        ],
      },
      {
        path: "/storehouses/new",
        name: "New storehouse",
        component: () => import("@/views/Storehouses/CreateStorehouse.vue"),
        props: true,
        meta: {
          name: PrintUtil.localize("NewStorehouse", "router"),
        },
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("@/views/Roles/RolesView.vue"),
        props: true,
        meta: {
          name: PrintUtil.localize("roles", "router"),
          ruleId: [appConf.rules.rbacManaging],
          buttons: [
            new HeaderBtnDto("+ ADD", new RouteParametrized("New role")),
          ],
        },
        children: [
          {
            path: "/roles/:id",
            name: "Role",
            component: () => import("@/views/Roles/SingleRoleView.vue"),
            props: true,
            meta: {
              name: PrintUtil.localize("Role", "router"),
            },
          },
        ],
      },
      {
        path: "/roles/new",
        name: "New role",
        component: () => import("@/views/Roles/CreateRole.vue"),
        props: true,
        meta: {
          name: PrintUtil.localize("NewRole", "router"),
        },
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/Users/UsersView.vue"),
        meta: {
          name: PrintUtil.localize("users", "router"),
          ruleId: [appConf.rules.userManaging],
          buttons: [
            new HeaderBtnDto("+ ADD", new RouteParametrized("New user")),
          ],
        },
        children: [
          {
            path: "/user/:id",
            name: "User",
            component: () => import("@/views/Users/SingleUserView.vue"),
            props: true,
            meta: {
              name: PrintUtil.localize("User", "router"),
            },
          },
        ],
      },
      {
        path: "/users/new",
        name: "New user",
        component: () => import("@/views/Users/CreateUser.vue"),
        props: true,
        meta: {
          name: PrintUtil.localize("NewUser", "router"),
        },
      },
      {
        path: "/history",
        name: "History",
        component: () => import("@/views/History/HistoryView.vue"),
        meta: {
          name: PrintUtil.localize("History", "router"),
          ruleId: [appConf.rules.checkLogs],
        },
        children: [
          {
            path: "/history/:id",
            name: "Single history",
            component: () => import("@/views/History/SingleHistoryView.vue"),
            props: true,
            meta: {
              name: PrintUtil.localize("SingleHistory", "router"),
            },
          },
        ],
      },
      {
        path: "/operations",
        name: "Operations",
        component: () => import("@/views/Operations/OperationsView.vue"),
        meta: {
          name: PrintUtil.localize("Operations", "router"),
        },
        children: [
          {
            path: "/operations/:id",
            name: "Single operation",
            component: () =>
              import("@/views/Operations/SingleOperationView.vue"),
            props: true,
            meta: {
              name: PrintUtil.localize("SingleOperation", "router"),
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Global authorization check
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta["requireAuth"];

  if (requiresAuth && !TokenUtil.isAuthorized()) {
    //In case token is not valid
    next("/login");
    return;
  }
  if (!requiresAuth && TokenUtil.isAuthorized()) {
    next("/dashboard");
    return;
  }

  if (to.meta["ruleId"]) {
    if (
      !(to.meta.ruleId as number[]).some((el) =>
        TokenUtil.hasAccessTo(parseInt(el.toString())),
      )
    ) {
      next("/dashboard");
      return;
    }
  }

  if (to.name == "Storehouse") {
    if (to.params && to.params.id) {
      if (!TokenUtil.hasAnyAccessToStock(to.params.id))
        router.push({ name: "storehouses" });
    }
  }

  next();
});

export default router;
