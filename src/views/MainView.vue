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
import { useAuthCheckStore } from "@/stores/auth-check.store";
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
      router: useRouter(),
      pageTitle: "",
      showAddBtn: false,
      addBtnRoute: "",
    };
  },
  setup() {
    return {
      authCheckStore: useAuthCheckStore(),
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
      return this.authCheckStore.getSidebarItems;
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
    this.authCheckStore.refresh();
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
