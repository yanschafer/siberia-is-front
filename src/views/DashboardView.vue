<template>
Вфывыфв
</template>

<script>
import SidebarComponent from "@/components/Navigation/SidebarComponent.vue";
import HeaderComponent from "@/components/Navigation/HeaderComponent.vue";

export default {
  name: "DashboardView",
  components: {
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
      sidebarItems: [
        { name: 'Dashboard',
          icon: 'IconLock',
          iconColor: '#E5E5E5',
          iconSize: 32,
          strokeWidth: 1,
          disabled: true,
          active: false
        },
        { name: 'Products',
          icon: 'IconPackages',
          iconColor: 'white',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: true
        },
        { name: 'Storehouse',
          icon: 'IconBuildingWarehouse',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false
        },
        { name: 'Users',
          icon: 'IconUsersGroup',
          iconColor: '#B8B8B8',
          iconSize: 32,
          strokeWidth: 1,
          disabled: false,
          active: false
        },
      ]
    };
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/');
    },
  },
};
</script>