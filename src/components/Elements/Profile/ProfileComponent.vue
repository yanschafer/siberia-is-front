<template>
  <div>
    <Button
      type="button"
      class="icon-bg d-flex justify-content-center align-items-center"
      icon="pi pi-image"
      label="Image"
      @click="toggle"
    >
      <IconUserFilled color="#B8B8B8" :size="24" stroke-width="1" />
    </Button>
    <OverlayPanel class="notification-body" ref="op">
      <h5 class="heading">{{ localize("profileHeader") }}</h5>
      <span>{{ localize("userNameCapslockSpaced") }}: </span
      ><span class="name">{{ username }}</span>
      <hr class="hr" />
      <MDBRow class="footer-row">
        <MDBCol class="lang-col">
          <LangSelectComponent />
        </MDBCol>
        <MDBCol class="d-flex justify-content-end">
          <a class="logout" href="#" @click.prevent="logout"
            ><IconLogout2 /> {{ localize("logout") }}
          </a>
        </MDBCol>
      </MDBRow>
    </OverlayPanel>
  </div>
</template>
<script lang="ts">
import Router from "@/router";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-vue-ui-kit";
import { IconLogout2, IconUserFilled } from "@tabler/icons-vue";
import OverlayPanel from "primevue/overlaypanel";
import Button from "primevue/button";
import TokenUtil from "@/utils/token.util";
import NotificationSocketModel from "@/api/modules/notification/models/notification-socket.model";
import LangSelectComponent from "@/components/Navigation/LangSelectComponent.vue";
import PrintUtil from "@/utils/localization/print.util.js";

export default {
  name: "ProfileComponent",
  components: {
    LangSelectComponent,
    IconLogout2,
    IconUserFilled,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    OverlayPanel,
    Button,
  },
  data() {
    return {
      op: null,
      username: "",
      router: Router,
    };
  },
  created() {
    this.username = TokenUtil.getAuthorizedName() || "";
  },
  methods: {
    localize(key, module = "user") {
      return PrintUtil.localize(key, module);
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    logout() {
      TokenUtil.logout();
      NotificationSocketModel.close();
      this.router.push("/");
    },
  },
};
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
  border: 2px solid #eeeeee;
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
.noti-container {
  max-height: 30rem;
}
.notification-body {
  width: 100%;
  min-width: 30rem;
}
:deep(.p-overlaypanel) {
  width: 100%;
  min-width: 30rem !important;
}
.heading {
  font-size: 18px;
  font-weight: bold;
  color: #121212;
}
.logout {
  color: black;
}
:deep(.p-overlaypanel-content) {
  width: 100%;
  min-width: 20rem !important;
}
.footer-row {
  width: 100%;
  min-width: 24rem;
  display: flex;
  justify-content: space-between;
}
.name {
  font-weight: 600;
}
.lang-col {
  padding-left: 1rem !important;
}
</style>
