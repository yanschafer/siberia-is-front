<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1 class="username-heading">{{ roleName }}</h1>
        </MDBCol>
      </MDBRow>
      <MDBCol class="d-flex justify-content-end">
        <MDBBtn class="utility-btn" outline="black">EDIT</MDBBtn>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4">
    <TabsComponent />
  </MDBContainer>
</template>

<script lang="ts">
import { ref } from 'vue';
import { MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
export default {
  name: "SingleRoleView",
  components: {TabsComponent, MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane },
  props: {
    id: {
      type: String,
      required: true,
    },
    rolesData: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectedRole() {
      return this.rolesData.find((role) => role.id == this.id) || {};
    },
    roleName() {
      return this.selectedRole.roleName || '';
    },
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