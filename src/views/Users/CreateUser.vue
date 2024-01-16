<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <MDBRow>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">{{ localize("userName") }}</h4>
        <InputText
          :placeholder="namePlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          :class="{ 'p-invalid': !validate.name }"
          type="text"
          v-model="name"
        />
        <h4 class="storehouse-heading">{{ localize("login") }}</h4>
        <InputText
          :placeholder="loginPlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          :class="{ 'p-invalid': !validate.login }"
          type="text"
          v-model="login"
        />
      </MDBCol>
      <MDBCol class="d-flex flex-column col-4 gap-2">
        <h4 class="storehouse-heading">{{ localize("password") }}</h4>
        <InputText
          :placeholder="passwordPlaceholder"
          class="input-wrapper animate__animated animate__fadeIn username-input"
          :class="{ 'p-invalid': !validate.password }"
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
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";
import loggerUtil from "@/utils/logger/logger.util";

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
    //true => no errors
    validate: {
      name: true,
      login: true,
      password: true,
    },
    name: "",
    login: "",
    password: "",
    validator: new ValidatorUtil(),
  }),
  async setup() {
    const userStore = useUsersStore();
    const router = useRouter();
    return {
      userStore,
      router,
    };
  },
  created() {
    const userNameValidateRule = new ValidateRule().required();
    const loginValidateRule = new ValidateRule().required();
    const passwordRule = new ValidateRule().required();
    this.validator = this.validator
      .addRule("name", userNameValidateRule)
      .addRule("login", loginValidateRule)
      .addRule("password", passwordRule);
  },
  methods: {
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "User is created",
        life: 3000,
      });
    },
    localize(key, module = "default") {
      return PrintUtil.localize(key, module);
    },
    cancelCreation() {
      this.router.push({ name: "users" });
    },
    async saveCreation() {
      const createDto = new CreateUserDto(
        {
          name: this.name,
          login: this.login,
          password: this.password,
        },
        [],
        [],
      );
      const validateRes = this.validator.validate(createDto.params);
      if (validateRes !== true) {
        this.validate = validateRes;
        loggerUtil.debug(this.validate);
        this.validator.showErrorToast(this.$toast);
        return;
      }
      const created = await this.userStore.create(createDto);
      if (created.success) {
        this.showSuccessToast();
        this.router.push({
          name: "User",
          params: { id: created.getData().id.toString() },
        });
      } else {
        const error = created.getError();
        if (error.httpStatusCode == 415) {
          this.validator.showErrorToast(this.$toast);
          return;
        } else {
          error.showServerErrorToast(this.$toast, this.$nextTick);
        }
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
