<template>
  <header>
    <MDBContainer
      class="bg-container d-flex flex-row align-items-center gap-3"
      fluid
    >
      <MDBContainer class="d-flex gap-2 flex-row align-items-center fix-margin">
        <h1 :key="title" class="animate__animated animate__fadeInUp heading">
          {{ title }}
        </h1>
        <MDBBtn
          @click="navigate"
          v-if="showAddButton"
          class="animate__animated animate__fadeInUp utility-btn"
          outline="black"
          >{{ addButtonLabel }}</MDBBtn
        >
      </MDBContainer>
      <MDBContainer
        class="d-flex gap-4 flex-row align-items-center justify-content-end"
      >
        <MDBTooltip
          v-if="hasAccessToHistory"
          v-model="tooltip1"
          tag="a"
          direction="left"
        >
          <template #reference>
            <MDBBtn
              @click="handleClickHistory()"
              class="icon-bg d-flex justify-content-center align-items-center"
            >
              <IconHistoryToggle color="#B8B8B8" :size="24" stroke-width="1" />
            </MDBBtn>
          </template>
          <template #tip> {{ localize("History") }} </template>
        </MDBTooltip>
        <MDBTooltip v-model="tooltip2" tag="a" direction="left">
          <template #reference>
            <MDBBtn
              @click="handleClickOperations()"
              class="icon-bg d-flex justify-content-center align-items-center"
            >
              <IconRoute color="#B8B8B8" :size="24" stroke-width="1" />
            </MDBBtn>
          </template>
          <template #tip> {{ localize("Operations") }} </template>
        </MDBTooltip>
        <MDBTooltip v-model="tooltip3" tag="a" direction="left">
          <template #reference>
            <NotificationsComponent />
          </template>
          <template #tip> {{ localize("Notifications") }} </template>
        </MDBTooltip>
        <MDBBadge
          v-if="showNotificationIcon"
          class="badge"
          color="danger"
          pill
          notification
        >
          {{ notificationCount > 999 ? "999+" : notificationCount }}
        </MDBBadge>
        <MDBTooltip v-model="tooltip4" tag="a" direction="left">
          <template #reference>
            <ProfileComponent />
          </template>
          <template #tip> {{ localize("Profile") }} </template>
        </MDBTooltip>
      </MDBContainer>
    </MDBContainer>

    <MDBBreadcrumb class="breadcrumbs breadcrumb-with-mdb-icon">
      <MDBBreadcrumbItem
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
      >
        <router-link
          v-if="breadcrumb.path !== '/dashboard'"
          :to="{ path: breadcrumb.path }"
          >{{ breadcrumb.name }}</router-link
        >
        <span v-else>{{ breadcrumb.name }}</span>
      </MDBBreadcrumbItem>
    </MDBBreadcrumb>
  </header>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import {
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBBadge,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdown,
  MDBCol,
  MDBTooltip,
} from "mdb-vue-ui-kit";
import {
  IconHome2,
  IconBellFilled,
  IconRoute,
  IconHistoryToggle,
  IconExclamationCircle,
  IconAlertTriangle,
  IconBell,
} from "@tabler/icons-vue";
import { ref } from "vue";
import NotificationsComponent from "@/components/Elements/Notification/NotificationsComponent.vue";
import TokenUtil from "@/utils/token.util";
import { appConf } from "@/api/conf/app.conf";
import { useRouter } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";
import ApiModelUtil from "@/utils/api-model.util";
import { useAuthCheckStore } from "@/stores/auth-check.store";
import ProfileComponent from "@/components/Elements/Profile/ProfileComponent.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    ProfileComponent,
    IconHome2,
    MDBTooltip,
    NotificationsComponent,
    MDBContainer,
    MDBRow,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBBtn,
    MDBBadge,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdown,
    MDBCol,
    IconRoute,
    IconBellFilled,
    IconHistoryToggle,
    IconExclamationCircle,
    IconAlertTriangle,
    IconBell,
  },
  props: {
    title: String,
    showAddButton: {
      type: Boolean,
      default: false,
    },
    addBtnRoute: {
      type: String,
      default: "",
    },
    addButtonLabel: {
      type: String,
      default: PrintUtil.localize("AddBtnLabel", "header"),
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
  methods: {
    localize(key, module = "header") {
      return PrintUtil.localize(key, module);
    },
    navigate() {
      this.router.push({ name: this.addBtnRoute || "" });
    },
    handleClickHistory() {
      this.$router.push({ name: "History" });
    },
    handleClickOperations() {
      this.$router.push({ name: "Operations" });
    },
  },
  computed: {
    hasAccessToHistory() {
      return this.authCheckStore.getHasAccessToHistory;
    },
  },
  setup() {
    const tooltip1 = ref(false);
    const tooltip2 = ref(false);
    const tooltip3 = ref(false);
    const tooltip4 = ref(false);
    const dropdown24 = ref(false);
    const router = useRouter();

    return {
      tooltip1,
      tooltip2,
      tooltip3,
      tooltip4,
      dropdown24,
      router,
      authCheckStore: useAuthCheckStore(),
    };
  },
});
</script>

<style scoped>
.bg-container {
  background-color: #fcfcfc;
  width: 100%;
  display: flex;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  height: 5rem;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: max-content;
  font-weight: 800;
  max-height: 2rem;
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
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
  border: 2px solid #eeeeee;
  border-radius: 50%;
  padding: 0;
  box-shadow: none;
  background-color: white;
}
.badge {
  z-index: 999;
  position: relative;
  top: -15px;
  left: -30px;
}
.breadcrumbs {
  padding-left: 2rem;
  padding-top: 1rem;
}
.breadcrumb-item {
  text-transform: capitalize;
}
.fix-margin {
  margin-left: 0 !important;
}
</style>
