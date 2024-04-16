<template>
  <div>
    <DialogComponent />
    <SidebarComponent :sidebarItems="sidebar" />
    <div class="header-area">
      <HeaderComponent
        :title="pageTitle"
        :breadcrumbs="navBreadcrumbs"
        :buttons="navButtons"
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
import { MDBContainer } from "mdb-vue-ui-kit";
import { useAuthCheckStore } from "@/stores/auth-check.store";
import BreadcrumbDto from "@/router/dto/breadcrumb.dto";

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
        return route.meta.name;
      });
      const currentPageName = routeNames.pop() || "dashboard";

      if (currentPageName) {
        this.pageTitle =
          currentPageName.charAt(0).toUpperCase() + currentPageName.slice(1);
      } else {
        this.pageTitle = "Dashboard";
      }
    },
    logout() {
      this.router.push("/");
    },
  },
  computed: {
    sidebar() {
      return this.authCheckStore.getSidebarItems;
    },
    navButtons() {
      return this.route.meta.buttons || [];
    },
    navBreadcrumbs() {
      if (this.route.meta.breadcrumbs) {
        return this.route.meta.breadcrumbs.map((el: BreadcrumbDto) => {
          return {
            label: el.label,
            ...el.route.toVueRoute(),
          };
        });
      } else {
        return this.$route.matched.map((route) => ({
          label: route.meta.name,
          name: route.name || "dashboard",
        }));
      }
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
