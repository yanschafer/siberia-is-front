<template>
  <div>
    <SidebarComponent :sidebarItems="sidebarItems" />
    <div class="header-area">
      <HeaderComponent :title="pageTitle" :breadcrumbs="navBreadcrumbs" />
    </div>
    <div class="container-bg">
      <router-view />
      <router-view v-if="shouldDisplayRolesView" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
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
          route: 'products'
        },
        { name: 'Storehouse',
          icon: 'IconBuildingWarehouse',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: 'storehouses'
        },
        { name: 'Users',
          icon: 'IconUsersGroup',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false,
          route: 'users'
        },
      ],
      router: useRouter(),
      pageTitle: '',
    };
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
        this.pageTitle = 'Dashboard'; // По умолчанию, если нет имени страницы
      }
    },
    logout() {
      this.$router.push('/');
    },
  },
  computed: {
    navBreadcrumbs() {
      const breadcrumbs = this.$route.matched.map(route => ({
        name: route.name || 'dashboard',
        path: route.path,
      }));

      return breadcrumbs;
    },
    shouldDisplayRolesView() {
      // Проверяем, является ли текущий маршрут UsersView и нет ли id в параметрах
      const isUsersViewWithoutId = this.$route.name === 'users' && !this.$route.params.id;

      // Проверяем, является ли текущий маршрут RolesView
      const isRolesView = this.$route.name === 'roles';

      // Возвращаем результат логического И для отображения router-view RolesView
      return isUsersViewWithoutId && isRolesView;
    },
  },
  mounted() {
    this.updatePageTitleAndContent(); // Обновляет заголовок при монтировании компонента
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