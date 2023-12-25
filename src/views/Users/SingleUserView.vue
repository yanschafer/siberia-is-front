<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1 class="username-heading">Orlando R Fiorentini</h1>
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
      <span class="username">ADMIN</span>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">PASSWORD</span>
      <span class="username">*******</span>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4">
    <MDBTabs v-model="activeTabId4" vertical>
      <!-- Tabs navs -->
      <MDBTabNav pills tabsClasses="mb-3 text-center">
        <MDBTabItem class="tab-item" :wrap="true" tabId="role1-1" href="role1-1">Personal permissions</MDBTabItem>
        <MDBTabItem class="tab-item" :wrap="false" tabId="role1-2" href="role1-2">Admin 1</MDBTabItem>
        <MDBTabItem class="tab-item" :wrap="false" tabId="role1-3" href="role1-3">Admin 2</MDBTabItem>
        <MDBTabItem class="tab-item" :wrap="false" tabId="role1-4" href="role1-4">Mod 3</MDBTabItem>
      </MDBTabNav>
      <!-- Tabs navs -->
      <!-- Tabs content -->
      <MDBTabContent>
        <MDBTabPane tabId="role1-1">Tab 1 content</MDBTabPane>
        <MDBTabPane tabId="role1-2">Tab 2 content</MDBTabPane>
        <MDBTabPane tabId="role1-3">Tab 3 content</MDBTabPane>
        <MDBTabPane tabId="role1-4">Tab 3 content</MDBTabPane>
      </MDBTabContent>
      <!-- Tabs content -->
    </MDBTabs>
  </MDBContainer>
</template>

<script lang="ts">
import { ref } from 'vue';
import { MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane } from "mdb-vue-ui-kit";
export default {
  name: "SingleUserView",
  components: { MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      activeTabId4: 'role1-1',
    }
  }
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