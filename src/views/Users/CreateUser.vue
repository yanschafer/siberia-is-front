<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <MDBRow>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">User name</h4>
        <InputText :placeholder="namePlaceholder" class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newName" />
        <h4 class="storehouse-heading">Login</h4>
        <InputText :placeholder="loginPlaceholder" class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newLogin" />

      </MDBCol>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">Password</h4>
        <InputText :placeholder="passwordPlaceholder" class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newPassword" />
        <h4 class="storehouse-heading">Confirm password</h4>
        <InputText :placeholder="passwordTwicePlaceholder" class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newPasswordRepeat" />
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
import {MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput} from "mdb-vue-ui-kit";
import {IconMapPinFilled} from "@tabler/icons-vue";
import InputText from "primevue/inputtext";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import {ref} from "vue";

export default {
  name: "CreateUser",
  components: {TabsComponent, MDBInput, MDBRow, IconMapPinFilled, MDBContainer, MDBCol, MDBBtn, InputText},
  data: () => ({
    namePlaceholder: "Enter a real user's name",
    loginPlaceholder: 'Create user login',
    passwordPlaceholder: "Create password",
    passwordTwicePlaceholder: "Confirm password",
  }),
  methods: {
    createRoles() {
      return [
        {
          id: 'role1',
          name: 'Role 1',
          categories: [
            { name: 'Accounting', key: 'A', selected: false },
            { name: 'Marketing', key: 'M', selected: true },
          ]
        },
        {
          id: 'role2',
          name: 'Hueta',
          categories: [
            { name: 'Accounting', key: 'A', selected: false },
            { name: 'Marketing', key: 'M', selected: true },
          ]
        },
        {
          id: 'role3',
          name: 'Zalupa',
          categories: [
            { name: 'Zalu2', key: '2', selected: false },
            { name: 'Marketing', key: '3', selected: true },
          ]
        },
      ];
    },
  },
  computed: {
    roles() {
      return this.createRoles();
    },
  }
}
</script>
<style scoped>
.storehouse-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: 6rem;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 2px;
  padding-right: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
  margin-top: 0.5rem;
}
:deep(.form-outline) {
  width: 100%;
  max-width: 10rem;
  background: #f8f8f8;
  border: 0;
  border-bottom: 2px solid #565656;
  height: 2rem;
  padding-top: 0!important;
}
:deep(.form-control) {
  padding-top: 0.1rem;
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw!important;
}
:deep(.p-dropdown-label) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown) {
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown-filter) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>