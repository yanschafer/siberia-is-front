<template>
  <header>
    <MDBContainer class="bg-container d-flex flex-row align-items-center gap-3" fluid>
      <MDBContainer class="d-flex gap-2 flex-row align-items-center">
        <h1 :key="title" class="animate__animated animate__fadeInUp heading">{{ title }}</h1>
        <MDBBtn v-if="showAddButton" class="animate__animated animate__fadeInUp utility-btn" outline="black">{{ addButtonLabel }}</MDBBtn>
      </MDBContainer>
      <MDBContainer class="d-flex flex-row align-items-center justify-content-end">
        <MDBBtn v-if="showNotificationIcon" class="icon-bg d-flex justify-content-center align-items-center">
          <IconRoute color="#B8B8B8" :size="24" stroke-width="1" />
        </MDBBtn>
        <MDBBadge v-if="showNotificationIcon" class="badge" color="danger" pill notification>
          {{ notificationCount > 999 ? '999+' : notificationCount }}
        </MDBBadge>
        <MDBBtn class="icon-bg d-flex justify-content-center align-items-center">
          <IconBellFilled color="#B8B8B8" :size="24" stroke-width="1" />
        </MDBBtn>
        <MDBBadge class="badge" color="danger" pill notification>999+</MDBBadge>
      </MDBContainer>
    </MDBContainer>

    <MDBBreadcrumb class="breadcrumbs breadcrumb-with-mdb-icon">
      <MDBBreadcrumbItem v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <router-link :to="{ path: breadcrumb.path }">{{ breadcrumb.name }}</router-link>
      </MDBBreadcrumbItem>
    </MDBBreadcrumb>
  </header>
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBBadge,
} from 'mdb-vue-ui-kit';
import { IconBellFilled, IconRoute } from '@tabler/icons-vue';

export default defineComponent({
  name: 'HeaderComponent',
  components: { MDBContainer, MDBRow, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBBadge, IconRoute, IconBellFilled },
  props: {
    title: String,
    showAddButton: {
      type: Boolean,
      default: true,
    },
    addButtonLabel: {
      type: String,
      default: '+ Add',
    },
    showNotificationIcon: {
      type: Boolean,
      default: true,
    },
    notificationCount: {
      type: Number,
      default: 0,
    },
    breadcrumbs: {
      type: Array as PropType<Array<{ name: string; path: string }>>,
      default: () => [],
    },
  },
});
</script>

<style scoped>
.bg-container {
  background-color: #FCFCFC;
  width: 100%;
  display: flex;
  position: relative;
  border-bottom: 1px solid #EEEEEE;
  height: 5rem;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: 4.5rem;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 2px;
  padding-right: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
}
.heading {
  font-size: 36px;
  color: #121221;
  font-weight: bold;
}
.icon-bg {
  width: 50px;
  height: 50px;
  border: 2px solid #EEEEEE;
  border-radius: 50%;
  padding: 0;
  box-shadow: none;
}
.badge {
  z-index: 999999;
  position: relative;
  top: -15px;
  left: -15px;
}
.breadcrumbs {
  padding-left: 2rem;
  padding-top: 1rem;
}
.breadcrumb-item {
  text-transform: capitalize;
}
</style>