<template>
  <MDBDropdown align="right" v-model="dropdown">
    <MDBDropdownToggle class="btn-dark icon-bg d-flex justify-content-center align-items-center" @click="dropdown = !dropdown">
      <IconBellFilled :color="defaultNotification1.iconColor" :size="24" stroke-width="1" />
    </MDBDropdownToggle>
    <MDBDropdownMenu class="dropdown-main mt-2 dropdown-bg d-flex flex-column gap-2">
      <MDBContainer class="d-flex overflow-y-scroll dropdown-bg flex-column gap-2">
        <template v-for="notification in [errorNotification, warningNotification, defaultNotification1, defaultNotification2]" :key="notification.type">
          <MDBContainer v-if="notification.visible" :class="['notification-body', notification.type === 'error' ? 'badge-danger' : (notification.type === 'warning' ? 'badge-warning' : 'alert-secondary'), 'd-flex w-100']" fluid>
            <MDBCol class="col-auto">
              <h5>{{ notification.title }}</h5>
              <p class="notification-text">{{ notification.text }}</p>
            </MDBCol>
            <MDBCol class="d-flex flex-row justify-content-end">
              <component :is="notification.type" :color="notification.iconColor" :size="52" stroke-width="1" />
            </MDBCol>
          </MDBContainer>
          <MDBRow class="d-flex justify-content-between w-100">
            <span class="mark-read w-auto" @click="markAsRead(notification)">Mark as read</span>
            <span class="date-time w-auto p-0">{{ notification.dateTime }}</span>
          </MDBRow>
          <hr class="separator" />
        </template>
      </MDBContainer>
      <hr class="separator" />
      <MDBRow class="noti-footer d-flex flex-row justify-content-end">
        <MDBBtn class="utility-btn" outline="dark" @click="clearAllNotifications">CLEAR ALL</MDBBtn>
      </MDBRow>
    </MDBDropdownMenu>
  </MDBDropdown>
</template>

<script lang="ts">
import { IconAlertTriangle, IconBell, IconBellFilled, IconExclamationCircle } from "@tabler/icons-vue";
import { MDBBtn, MDBCol, MDBContainer, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBRow } from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useNotificationsStore } from '@/stores/store';

export default {
  name: 'NotificationsComponent',
  components: {
    IconAlertTriangle,
    IconBell,
    IconBellFilled,
    IconExclamationCircle,
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBRow
  },
  setup() {
    const dropdown = ref(false);
    const notificationsStore = useNotificationsStore();

    const markAsRead = (notification) => {
      notificationsStore.hideNotification(notification);
    };

    const clearAllNotifications = () => {
      notificationsStore.hideAllNotifications();
    };

    return {
      dropdown,
      markAsRead,
      clearAllNotifications,
      errorNotification: notificationsStore.errorNotification,
      warningNotification: notificationsStore.warningNotification,
      defaultNotification1: notificationsStore.defaultNotification1,
      defaultNotification2: notificationsStore.defaultNotification2,
    };
  }
}
</script>

<style scoped>
.dropdown-toggle::after {
  display: none;
}
.dropdown-bg {
  background-color: white;
  width: max-content;
  padding: 1rem;
  height: 100%;
  min-height: 30rem;
}
.notification-body {
  border-radius: 0.5rem;
  padding: 1rem;
}
.notification-text {
  margin-bottom: 0;
}
.dropdown-main {
  height: 100%;
  min-height: 80vh;
}
.icon-bg {
  width: 50px;
  height: 50px;
  border: 2px solid #EEEEEE;
  border-radius: 50%;
  padding: 0;
  box-shadow: none;
  background-color: white;
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
</style>