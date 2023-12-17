<template>
  <MDBContainer class="d-flex flex-column align-items-center sidebar-bg">
    <img class="logo" src="@/assets/Logo.svg">
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
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { MDBContainer, MDBCol } from "mdb-vue-ui-kit";
import { IconPackages, IconLock, IconBuildingWarehouse, IconUsersGroup, IconLogout2 } from '@tabler/icons-vue';

export default {
  name: 'SidebarComponent',
  components: {
    MDBContainer,
    MDBCol,
    IconPackages,
    IconLock,
    IconBuildingWarehouse,
    IconUsersGroup,
    IconLogout2
  },
  props: {
    sidebarItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup() {
    const route = useRoute();

    const isRouteActive = (item) => {
      return route.name === item.route;
    };

    return {
      isRouteActive,
    };
  },
  methods: {
    logout() {
      this.$router.push('/');
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
.sidebar-item:hover:first-child {
  cursor: not-allowed;
}
.sidebar-item-group {
  gap: 1rem;
}
.logout {
  color: black;
}
</style>