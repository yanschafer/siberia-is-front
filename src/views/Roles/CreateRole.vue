<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <MDBRow>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">User name</h4>
        <InputText :placeholder="namePlaceholder" class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newRoleName" />
      </MDBCol>
    </MDBRow>
    <MDBCol class="d-flex justify-content-start">
      <MDBBtn @click="cancelCreation" class="utility-btn" outline="black">CANCEL</MDBBtn>
      <MDBBtn @click="saveCreation" class="utility-btn btn-black">CREATE USER</MDBBtn>
    </MDBCol>
    <MDBContainer>
      <TabsComponent :roles="roles" />
    </MDBContainer>
  </MDBContainer>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import InputText from "primevue/inputtext";
import {useUsersStore} from "@/stores/user.store";
import {useRolesStore} from "@/stores/roles.store";
import {useRoute} from "vue-router";
import UserFullDto from "@/api/modules/user/dto/user-full.dto";

export default defineComponent({
  name: "CreateRole",
  components: {MDBCol, TabsComponent, MDBRow, MDBContainer, MDBBtn, InputText},
  data() {
    return {
      namePlaceholder: "Enter a role name",
    }
  },
  // async setup() {
  //   const userStore = useUsersStore();
  //   const rolesStore = useRolesStore();
  //   const route = useRoute();
  //   await rolesStore.loadRolesList();
  //   await userStore.loadSelectedUser(parseInt(route.params.id.toString()));
  //   return {
  //     userStore,
  //     rolesStore,
  //   };
  // },
  computed: {
    // selectedUser(): UserFullDto {
    //   return this.userStore.getSelectedUser;
    // },
    // roles() {
    //   const roles = [];
    //   roles.push({
    //     id: 0,
    //     name: "Personal rules",
    //     relatedUsersCount: 1,
    //     description: "Rules which are related only to this user",
    //     rules: this.selectedUser.rules,
    //     canChange: true,
    //   });
    //   return roles.concat(this.selectedUser.roles);
    // },
    // rolesOptions() {
    //   return this.rolesStore.getRolesList.map((el) => {
    //     return {
    //       id: el.id,
    //       name: el.name,
    //     };
    //   });
    // },
  }
})
</script>
<style scoped>

</style>