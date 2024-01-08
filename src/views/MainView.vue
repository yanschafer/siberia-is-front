<template>
  <div>
    <SidebarComponent :sidebarItems="sidebar" />
    <div class="header-area">
      <HeaderComponent :title="pageTitle" :breadcrumbs="navBreadcrumbs" />
    </div>
    <div class="container-bg">
      <Suspense>
        <router-view />
      </Suspense>
      <Suspense>
        <router-view v-if="shouldDisplayRolesView" />
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import SidebarComponent from "@/components/Navigation/SidebarComponent.vue";
import HeaderComponent from "@/components/Navigation/HeaderComponent.vue";
import TokenUtil from "@/utils/token.util";
import {appConf} from "@/api/conf/app.conf";
export default {
  name: 'DashboardView',
  components: {
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
      sidebarItems: [
        // { name: 'Dashboard',
        //   icon: 'IconLock',
        //   iconColor: '#E5E5E5',
        //   iconSize: 32,
        //   strokeWidth: 1,
        //   disabled: true,
        //   active: false,
        // },
        { name: 'Products',
          icon: 'IconPackages',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: true,
          route: 'products',
          rule: appConf.rules.productsManaging
        },
        { name: 'Storehouse',
          icon: 'IconBuildingWarehouse',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: 'storehouses',
          rule: appConf.rules.stockManaging
        },
        { name: 'Users',
          icon: 'IconUser',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: 'users',
          rule: appConf.rules.userManaging
        },
        { name: 'Roles',
          icon: 'IconUsersGroup',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: 'roles',
          rule: appConf.rules.rbacManaging
        },
      ],
      router: useRouter(),
      pageTitle: '',
    };
  },
  setup() {
    return {
      router: useRouter(),
    }
  },
  watch: {
    '$route': 'updatePageTitleAndContent',
  },
  methods: {
    updatePageTitleAndContent() {
      const routeNames = this.$route.matched.map(route => route.name);
      const currentPageName = routeNames.pop() || 'dashboard';

      if (currentPageName) {
        this.pageTitle = currentPageName.charAt(0).toUpperCase() + currentPageName.slice(1);
      } else {
        this.pageTitle = 'Dashboard';
      }
    },
    logout() {
      this.router.push('/');
    },
  },
  computed: {
    sidebar() {
      return this.sidebarItems.filter(el => TokenUtil.hasAccessTo(el.rule))
    },
    navBreadcrumbs() {
      const breadcrumbs = this.$route.matched.map(route => ({
        name: route.name || 'dashboard',
        path: route.path,
      }));

      return breadcrumbs;
    },
    shouldDisplayRolesView() {
      const isUsersViewWithoutId = this.$route.name === 'users' && !this.$route.params.id;
      const isRolesView = this.$route.name === 'roles';
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
  left: 10vw;
  padding: 1rem;
  width: 100%;
  overflow: hidden;
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