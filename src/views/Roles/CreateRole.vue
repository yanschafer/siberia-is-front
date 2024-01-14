<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <MDBRow>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">Role name</h4>
        <InputText
          :placeholder="namePlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="name"
        />
      </MDBCol> </MDBRow
    ><MDBRow>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">Role description</h4>
        <Textarea
          :placeholder="descriptionPlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="description"
        />
      </MDBCol>
    </MDBRow>
    <MDBCol class="d-flex justify-content-start">
      <MDBBtn @click="cancelCreation" class="utility-btn" outline="black"
        >CANCEL</MDBBtn
      >
      <MDBBtn @click="saveCreation" class="utility-btn btn-black"
        >CREATE ROLE</MDBBtn
      >
    </MDBCol>
    <MDBContainer>
      <TabsComponent :creation-mode="true" :roles="[roles]" />
    </MDBContainer>
  </MDBContainer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/inputtext";
import { useUsersStore } from "@/stores/user.store";
import { useRolesStore } from "@/stores/roles.store";
import { useRoute, useRouter } from "vue-router";
import UserFullDto from "@/api/modules/user/dto/user-full.dto";

export default defineComponent({
  name: "CreateRole",
  components: {
    MDBCol,
    TabsComponent,
    MDBRow,
    MDBContainer,
    MDBBtn,
    InputText,
    Textarea,
  },
  data() {
    return {
      name: "",
      description: "",
      namePlaceholder: "Enter a role name",
      descriptionPlaceholder: "Enter a role description",
      roles: {
        id: 1,
        name: "Rules",
        relatedUsersCount: 0,
        description: "Rules for new role",
        rules: [],
        canChange: true,
      },
    };
  },
  async setup() {
    const rolesStore = useRolesStore();
    const router = useRouter();

    return {
      rolesStore,
      router,
    };
  },
  methods: {
    async saveCreation() {
      const created = await this.rolesStore.create(this.name, this.description);
      if (created.success)
        this.router.push({
          name: "Role",
          params: { id: created.getData().id.toString() },
        });
    },
    cancelCreation() {},
  },
  computed: {
    // selectedUser(): UserFullDto {
    //   return this.userStore.getSelectedUser;
    // },
    // roles() {
    //   const roles = [];
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
  },
});
</script>
<style scoped></style>
