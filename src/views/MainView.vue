<template>
  <div>
    <DialogComponent />
    <SidebarComponent :sidebarItems="sidebar" />
    <div class="header-area">
      <HeaderComponent
        :add-btn-route="addBtnRoute"
        :show-add-button="showAddBtn"
        :title="pageTitle"
        :breadcrumbs="navBreadcrumbs"
      />
    </div>
    <MDBContainer class="container-bg">
      <Suspense>
        <router-view />
      </Suspense>
      <Suspense>
        <router-view v-if="shouldDisplayRolesView" />
      </Suspense>
    </MDBContainer>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import SidebarComponent from "@/components/Navigation/SidebarComponent.vue";
import HeaderComponent from "@/components/Navigation/HeaderComponent.vue";
import DialogComponent from "@/components/Elements/Dialogs/DialogComponent.vue";
import TokenUtil from "@/utils/token.util";
import { appConf } from "@/api/conf/app.conf";
import { MDBContainer } from "mdb-vue-ui-kit";
import PrintUtil from "@/utils/localization/print.util";
import loggerUtil from "@/utils/logger/logger.util";
export default {
  name: "DashboardView",
  components: {
    HeaderComponent,
    SidebarComponent,
    DialogComponent,
    MDBContainer,
  },
  data() {
    return {
      sidebarItems: [
        {
          name: PrintUtil.localize("Dashboard", "sidebar"),
          icon: "IconDashboard",
          iconColor: "#B8B8B8",
          iconSize: 24,
          strokeWidth: 1,
          disabled: false,
          active: true,
          route: "dashboard",
          rule: true,
        },
        {
          name: PrintUtil.localize("Products", "sidebar"),
          icon: "IconPackages",
          iconColor: "#B8B8B8",
          iconSize: 24,
          strokeWidth: 1,
          disabled: false,
          active: true,
          route: "products",
          rule: appConf.rules.productsManaging,
        },
        {
          name: PrintUtil.localize("Assortments", "sidebar"),
          icon: "IconDashboard",
          iconColor: "#B8B8B8",
          iconSize: 24,
          strokeWidth: 1,
          disabled: false,
          active: true,
          route: "assortment",
          rule: true,
        },
        {
          name: PrintUtil.localize("Storehouses", "sidebar"),
          icon: "IconBuildingWarehouse",
          iconColor: "#B8B8B8",
          iconSize: 24,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: "storehouses",
          rule: appConf.rules.stockManaging,
        },
        {
          name: PrintUtil.localize("Users", "sidebar"),
          icon: "IconUser",
          iconColor: "#B8B8B8",
          iconSize: 24,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: "users",
          rule: appConf.rules.userManaging,
        },
        {
          name: PrintUtil.localize("Roles", "sidebar"),
          icon: "IconUsersGroup",
          iconColor: "#B8B8B8",
          iconSize: 24,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: "roles",
          rule: appConf.rules.rbacManaging,
        },
      ],
      router: useRouter(),
      pageTitle: "",
      showAddBtn: false,
      addBtnRoute: "",
    };
  },
  setup() {
    return {
      router: useRouter(),
      route: useRoute(),
    };
  },
  watch: {
    $route: "updatePageTitleAndContent",
  },
  methods: {
    updatePageTitleAndContent() {
      const routeNames = this.route.matched.map((route) => {
        loggerUtil.debug(route);
        return route.meta.name;
      });
      const currentPageName = routeNames.pop() || "dashboard";

      if (currentPageName) {
        this.pageTitle =
          currentPageName.charAt(0).toUpperCase() + currentPageName.slice(1);
      } else {
        this.pageTitle = "Dashboard";
      }
      this.showAddBtn = this.route.meta.showAddBtn;
      this.addBtnRoute = this.route.meta.addBtnRoute;
    },
    logout() {
      this.router.push("/");
    },
  },
  computed: {
    sidebar() {
      return this.sidebarItems.filter(
        (el) => TokenUtil.hasAccessTo(el.rule) || el.rule === true,
      );
    },
    navBreadcrumbs() {
      const breadcrumbs = this.$route.matched.map((route) => ({
        name: route.meta.name || "dashboard",
        path: route.path,
      }));

      return breadcrumbs;
    },
    shouldDisplayRolesView() {
      const isUsersViewWithoutId =
        this.$route.name === "users" && !this.$route.params.id;
      const isRolesView = this.$route.name === "roles";
      return isUsersViewWithoutId && isRolesView;
    },
  },
  mounted() {
    this.updatePageTitleAndContent();
  },
};
</script>
<style scoped>
.container-bg {
  position: relative;
  margin-left: 10vw;
}
.content-area {
  width: 100%;
}
.header-area {
  position: relative;
  left: 10vw;
  width: 90vw;
}
</style>
