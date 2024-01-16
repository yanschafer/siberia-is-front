<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <MDBRow>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">{{ localize("userName") }}</h4>
        <InputText
          :placeholder="namePlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="name"
        />
        <h4 class="storehouse-heading">{{ localize("login") }}</h4>
        <InputText
          :placeholder="loginPlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="login"
        />
      </MDBCol>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">{{ localize("password") }}</h4>
        <InputText
          :placeholder="passwordPlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="password"
        />
        <!--        <h4 class="storehouse-heading">Confirm password</h4>-->
        <!--        <InputText-->
        <!--          :placeholder="passwordTwicePlaceholder"-->
        <!--          class="input-wrapper animate__animated animate__fadeIn username-input"-->
        <!--          type="text"-->
        <!--          v-model="newPasswordRepeat"-->
        <!--        />-->
      </MDBCol>
    </MDBRow>
    <MDBCol class="d-flex justify-content-start">
      <MDBBtn @click="cancelCreation" class="utility-btn" outline="black">{{
        localize("cancelCapslock")
      }}</MDBBtn>
      <MDBBtn @click="saveCreation" class="utility-btn btn-black">{{
        localize("createUserCapslock", "user")
      }}</MDBBtn>
    </MDBCol>
  </MDBContainer>
</template>
<script lang="ts">
import { MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput } from "mdb-vue-ui-kit";
import { IconMapPinFilled } from "@tabler/icons-vue";
import InputText from "primevue/inputtext";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import { useUsersStore } from "@/stores/user.store";
import CreateUserDto from "@/api/modules/user/dto/create-user.dto";
import { useRouter } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";

export default {
  name: "CreateUser",
  components: {
    TabsComponent,
    MDBInput,
    MDBRow,
    IconMapPinFilled,
    MDBContainer,
    MDBCol,
    MDBBtn,
    InputText,
  },
  data: () => ({
    namePlaceholder: PrintUtil.localize("namePlaceholder", "user"),
    loginPlaceholder: PrintUtil.localize("loginPlaceholder", "user"),
    passwordPlaceholder: PrintUtil.localize("passwordPlaceholder", "user"),
    name: "",
    login: "",
    password: "",
  }),
  async setup() {
    const userStore = useUsersStore();
    const router = useRouter();
    return {
      userStore,
      router,
    };
  },
  methods: {
    localize(key, module = "default") {
      return PrintUtil.localize(key, module);
    },
    cancelCreation() {
      this.router.push({ name: "users" });
    },
    async saveCreation() {
      const created = await this.userStore.create(
        new CreateUserDto(
          {
            name: this.name,
            login: this.login,
            password: this.password,
          },
          [],
          [],
        ),
      );
      if (created.success) {
        this.router.push({
          name: "User",
          params: { id: created.getData().id.toString() },
        });
      } else {
        //TODO: Check for errors
      }
    },
  },
};
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
  padding-top: 0 !important;
}
:deep(.form-control) {
  padding-top: 0.1rem;
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw !important;
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
