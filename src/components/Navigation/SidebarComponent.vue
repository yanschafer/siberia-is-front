<template>
  <MDBContainer class="d-flex flex-column align-items-center sidebar-bg">
    <img alt="logo" class="logo" src="../../assets/logo.svg">
    <MDBCol class="sidebar-item-group d-flex justify-content-center flex-column">
      <router-link
          v-for="(item, index) in sidebarItems"
          :key="index"
          :to="{ name: item.route }"
          class="sidebar-item"
          :class="{ 'active': isRouteActive(item), 'inactive': !isRouteActive(item), 'disabled': item.disabled }"
      >
        <div class="item-icon" :class="{ 'active': isRouteActive(item), 'inactive': !isRouteActive(item), 'disabled': item.disabled }">
          <component :is="item.icon" :color="item.iconColor" :size="item.iconSize" :stroke-width="item.strokeWidth" />
        </div>
        <span :class="{ 'item-name': true, 'active': isRouteActive(item), 'inactive': !isRouteActive(item), 'disabled': item.disabled }">{{ item.name }}</span>
      </router-link>
    </MDBCol>
    <a class="logout" href="#" @click.prevent="logout"><IconLogout2 /> Log Out</a>
  </MDBContainer>
</template>

<script lang="ts">
import {useRoute} from 'vue-router';
import { MDBContainer, MDBCol } from "mdb-vue-ui-kit";
import { IconPackages, IconLock, IconBuildingWarehouse, IconUsersGroup, IconLogout2, IconUser } from '@tabler/icons-vue';
import TokenUtil from "@/utils/token.util";
import Router from "@/router";

export default {
  name: 'SidebarComponent',
  components: {
    MDBContainer,
    MDBCol,
    IconPackages,
    IconLock,
    IconBuildingWarehouse,
    IconUsersGroup,
    IconLogout2,
    IconUser
  },
  props: {
    sidebarItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    router: Router
  }),
  setup() {
    const route = useRoute();

    const isRouteActive = (item) => {
      return isRouteActiveRecursive(route, item);
    };

    const isRouteActiveRecursive = (currentRoute, item) => {
      if (currentRoute.name === item.route) {
        return true;
      }

      if (currentRoute.matched && currentRoute.matched.some(record => record.name === item.route)) {
        return true;
      }

      return currentRoute.matched && currentRoute.matched.some(record => isRouteActiveRecursive(record, item));
    };

    return {
      isRouteActive,
    };
  },
  methods: {
    logout() {
      TokenUtil.logout()
      this.router.push('/');
    },
  },
};
</script>


<style scoped>
* {
  transition: all 0.3s ease-in-out;
}
.sidebar-bg {
  background-color: #FCFCFC;
  border-right: 2px solid #EEEEEE;
  height: 100vh;
  position: fixed;
  left: 0;
  width: 100%;
  max-width: 10vw;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.logo {
  width: 100%;
  max-width: 70px;
}
.item-icon {
  border-radius: 50%;
  border: 2px solid #B8B8B8;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-icon.disabled {
  border-color: #E5E5E5;
}
.item-icon.active {
  background-color: black;
}
.item-name.active {
  color: black;
}
.disabled {
  color: #E5E5E5;
}
.inactive {
  color: #B8B8B8;
}
.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}
.sidebar-item:hover {
  cursor: pointer;
}
.sidebar-item-group {
  gap: 1rem;
}
.logout {
  color: black;
}
</style>