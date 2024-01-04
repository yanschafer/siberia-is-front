<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1 class="username-heading">{{ userName }}</h1>
        </MDBCol>
        <MDBCol class="align-self-center">
          <MDBRow class="d-flex flex-row flex-nowrap align-self-center">
            <span class="user-roles-heading">USER ROLES</span>
            <div class="container">
              <MDBBadge class="" color="secondary">Admin 1</MDBBadge>
              <MDBBadge color="secondary">Admin 2</MDBBadge>
              <MDBBadge color="secondary">Mod 3</MDBBadge>
            </div>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBCol class="d-flex justify-content-end">
        <MDBBtn class="utility-btn" outline="black">EDIT</MDBBtn>
      </MDBCol>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">USERNAME</span>
      <span class="username">{{ userUsername }}</span>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">PASSWORD</span>
      <span class="username">{{ userPassword }}</span>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4">
    <TabsComponent :userTabs="getUserTabs(selectedUser)" />
  </MDBContainer>
</template>

<script lang="ts">
import { MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
export default {
  name: "SingleUserView",
  components: {TabsComponent, MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane },
  props: {
    usersData: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    selectedUser() {
      return this.usersData.find((user) => user.id == this.id) || {};
    },
    userName() {
      return this.selectedUser.userName || '';
    },
    userUsername() {
      return this.selectedUser.userUsername || '';
    },
    userPassword() {
      return this.selectedUser.userPassword.replace(/./g, '*') || '';
    },
  },
  data() {
    return {
      searchTerm: '',
    }
  },
  methods: {
    getUserTabs(user) {
      return user.tabs || [];
    },
  },
}
</script>

<style scoped>
.username-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
}
.user-roles-heading {
  width: fit-content;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: fit-content;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
}
.username {
  color: #121212;
  font-weight: 600;
}
.single-user-info {
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 2rem;
}

.tab-item {
  font-weight: 800!important;
}
:deep(.nav-link) {
  font-weight: 600!important;
}

</style>