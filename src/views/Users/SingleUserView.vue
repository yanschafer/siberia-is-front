<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1 v-if="!editing" class="username-heading">{{ userName }}</h1>
          <InputText
            v-else
            class="input-wrapper animate__animated animate__fadeIn username-input"
            :class="{ 'p-invalid': validate.name }"
            type="text"
            v-model="newUserName"
          />
        </MDBCol>
        <MDBCol class="align-self-center">
          <MDBRow class="d-flex flex-row flex-nowrap align-self-center">
            <span class="user-roles-heading">{{
              localize("userRolesCapslock", "user")
            }}</span>
            <div class="container">
              <MDBBadge
                v-for="roleName in userRolesNameList"
                color="secondary"
                >{{ roleName }}</MDBBadge
              >
            </div>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBCol v-if="!editing" class="d-flex justify-content-end">
        <MDBBtn @click="startEditing" class="utility-btn" outline="black">{{
          localize("editCapslock")
        }}</MDBBtn>
      </MDBCol>
      <MDBCol v-else class="d-flex justify-content-end">
        <MDBBtn
          v-if="!isMySelf"
          @click="confirmDeletion"
          class="utility-btn btn-danger"
          >{{ localize("deleteCapslock") }}</MDBBtn
        >
        <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">{{
          localize("cancelCapslock")
        }}</MDBBtn>
        <MDBBtn @click="saveChanges" class="utility-btn btn-black">{{
          localize("saveCapslock")
        }}</MDBBtn>
      </MDBCol>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">{{
        localize("userNameCapslock", "user")
      }}</span>
      <span v-if="!editing" class="username">{{ userUsername }}</span>
      <InputText
        v-else
        class="input-wrapper animate__animated animate__fadeIn username-input"
        :class="{ 'p-invalid': validate.login }"
        type="text"
        v-model="newUserUsername"
      />
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">{{
        localize("passwordCapslock", "user")
      }}</span>
      <span v-if="!editing" class="password">{{ userPassword }}</span>
      <InputText
        v-else
        class="input-wrapper animate__animated animate__fadeIn username-input"
        :class="{ 'p-invalid': validate.password }"
        type="text"
        v-model="newUserPassword"
      />
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4">
    <MultiSelectComponent
      :start-items="rolesList"
      :options="rolesOptions"
      option-label="name"
      placeholder="Edit user roles"
      @items-added="rolesAdded"
      @items-removed="rolesRemoved"
    />
  </MDBContainer>
  <MDBContainer class="pt-4">
    <Suspense>
      <TabsComponent :roles="roles" :user-id="selectedUser.id" />
    </Suspense>
  </MDBContainer>
</template>

<script lang="ts">
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBadge,
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
  MDBInput,
} from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import UserFullDto from "@/api/modules/user/dto/user-full.dto";
import { useRoute, useRouter } from "vue-router";
import UpdateUserDto from "@/api/modules/user/dto/update-user.dto";
import { useUsersStore } from "@/stores/user.store";
import InputText from "primevue/inputtext";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import { useRolesStore } from "@/stores/roles.store";
import MultiSelectComponent from "@/components/Elements/MultiSelectComponent.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
import { useModalStore } from "@/stores/modal.store";
import TokenUtil from "@/utils/token.util";
import PrintUtil from "@/utils/localization/print.util";
import ValidateRule from "@/utils/validator/validate-rule";
import ValidatorUtil from "@/utils/validator/validator.util";
export default {
  name: "SingleUserView",
  components: {
    ModalComponent,
    MultiSelectComponent,
    SelectComponent,
    MDBInput,
    InputText,
    TabsComponent,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBadge,
    MDBTabs,
    MDBTabNav,
    MDBTabContent,
    MDBTabItem,
    MDBTabPane,
  },
  data: () => ({
    editing: false,
    showModal: false,
    searchTerm: "",
    originalUserName: "",
    modalTitle: PrintUtil.localize("confirmDeletion"),
    disclaimerText: PrintUtil.localize("deleteDisclaimer", "user"),
    newUserName: "",
    originalUserUsername: "",
    newUserUsername: "",
    originalUserPassword: "",
    newUserPassword: "",
    rolesList: [],
    lastRolesList: [],
    //true => no errors
    validate: {
      name: true,
      login: true,
      password: true,
    },
    validator: new ValidatorUtil(),
  }),
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    modalText() {
      return `${PrintUtil.localize("deleteWarn", "user")} "${this.userName}?"`;
    },
    isMySelf() {
      return TokenUtil.getAuthorizedId() == this.id;
    },
    selectedUser(): UserFullDto {
      return this.userStore.getSelectedUser;
    },
    userName() {
      return this.selectedUser.name || "";
    },
    userUsername() {
      return this.selectedUser.login || "";
    },
    userPassword() {
      return "password".replace(/./g, "*") || "";
    },
    userRolesNameList() {
      return this.selectedUser.roles.map((el) => el.name);
    },
    roles() {
      const roles = [];
      roles.push({
        id: 0,
        name: PrintUtil.localize("personalRules", "user"),
        relatedUsersCount: 1,
        description: PrintUtil.localize("personalRulesDescription", "user"),
        rules: this.selectedUser.rules,
        canChange: true,
      });
      return roles.concat(this.selectedUser.roles);
    },
    rolesOptions() {
      return this.rolesStore.getRolesList.map((el) => {
        return {
          id: el.id,
          name: el.name,
        };
      });
    },
  },
  async setup() {
    const userStore = useUsersStore();
    const rolesStore = useRolesStore();
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();
    await rolesStore.loadRolesList();
    await userStore.loadSelectedUser(parseInt(route.params.id.toString()));
    return {
      userStore,
      rolesStore,
      modalStore,
      router,
    };
  },
  created() {
    this.rolesList = this.selectedUser.roles.map((el) => ({
      id: el.id,
      name: el.name,
    }));
    this.lastRolesList = [...this.rolesList];

    const userNameValidateRule = new ValidateRule().skipIfNull().required();
    const loginValidateRule = new ValidateRule().skipIfNull().required();
    const passwordRule = new ValidateRule().skipIfNull().required();
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
        detail: "User is updated",
        life: 3000,
      });
    },
    localize(key, module = "default") {
      return PrintUtil.localize(key, module);
    },
    confirmDeletion() {
      this.modalStore.show({
        title: this.modalTitle,
        text: this.modalText,
        disclaimer: this.disclaimerText,
      });
    },
    closeModal() {
      this.modalStore.hide();
    },
    async removeAndCloseModal() {
      const removed = await this.userStore.remove(this.id);
      if (removed.success) {
        this.modalStore.hide();
        await this.userStore.loadUsersList();
        this.router.push({ name: "users" });
      } else {
        removed.getError().showServerErrorToast(this.$toast, this.$nextTick);
      }
    },
    listContains(list, item) {
      return list.filter((el) => el.id == item).length > 0;
    },
    async rolesAdded(addedItems) {
      const res = await this.userStore.appendRoles(this.id, addedItems);
      if (!res.success)
        res.getError().showServerErrorToast(this.$toast, this.$nextTick);
      await this.userStore.loadSelectedUser(parseInt(this.id.toString()));
    },
    async rolesRemoved(removedItems) {
      const res = await this.userStore.removeRoles(this.id, removedItems);
      if (!res.success)
        res.getError().showServerErrorToast(this.$toast, this.$nextTick);
      await this.userStore.loadSelectedUser(parseInt(this.id.toString()));
    },
    startEditing() {
      this.editing = true;
      this.originalUserName = this.userName;
      this.newUserName = this.userName;
      this.originalUserUsername = this.userUsername;
      this.newUserUsername = this.userUsername;
      this.originalUserPassword = this.userPassword;
      this.newUserPassword = "";
    },
    async saveChanges() {
      const newName =
        this.newUserName == this.originalUserName ? null : this.newUserName;
      const newLogin =
        this.newUserUsername == this.originalUserUsername
          ? null
          : this.newUserUsername;
      const newPassword =
        this.newUserPassword == "" ? null : this.newUserPassword;

      const userUpdateDto = new UpdateUserDto(newName, newLogin, newPassword);
      const validateRes = this.validator.validate(userUpdateDto);
      if (validateRes !== true) {
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }
      const result = await this.userStore.updateUser(this.id, userUpdateDto);
      this.editing = !result.success;
      if (result.success) this.showSuccessToast();
      else {
        const error = result.getError();
        if (error.httpStatusCode == 415) {
          this.validator.showErrorToast(this.$toast);
          return;
        } else if (error.httpStatusCode == 404) {
          this.$toast.add({
            severity: "error",
            summary: "Deletion failed",
            detail: "User not found",
            life: 3000,
          });
          this.$router.push({ name: "users" });
        } else {
          error.showServerErrorToast(this.$toast, this.$nextTick);
        }
      }
    },
    cancelEditing() {
      this.editing = false;
      this.newUserName = this.originalUserName;
      this.newUserUsername = this.originalUserUsername;
      this.newUserPassword = this.originalUserPassword;
      this.originalUserName = "";
      this.originalUserUsername = "";
      this.originalUserPassword = "";
    },
  },
};
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
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 2rem;
}

.tab-item {
  font-weight: 800 !important;
}
:deep(.nav-link) {
  font-weight: 600 !important;
}
.username {
  width: 100%;
  max-width: 20rem !important;
}
:deep(.form-outline) {
  width: 100%;
  max-width: 20rem !important;
}
</style>
