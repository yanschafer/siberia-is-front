<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="approveRoleRemove"
    @close="closeModal"
  />
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1
            v-if="!editing"
            class="animate__animated animate__fadeIn username-heading"
          >
            {{ roleName }}
          </h1>
          <MDBRow class="d-flex flex-row justify-content-between" v-else>
            <MDBCol class="col-auto col-span">
              <p class="animate__animated animate__fadeIn label">
                {{ localize("roleNameCapslock", "role") }}
              </p>
            </MDBCol>
            <MDBCol class="col-auto d-flex flex-row justify-content-end">
              <InputText
                class="input-wrapper animate__animated animate__fadeIn username-input"
                :class="{ 'p-invalid': !validate.name }"
                type="text"
                v-model="newRoleName"
              />
            </MDBCol>
          </MDBRow>
          <p v-if="!editing" class="animate__animated animate__fadeIn">
            {{ roleDescription }}
          </p>
          <MDBRow class="d-flex flex-row justify-content-between mt-2" v-else>
            <MDBCol class="col-auto col-span">
              <span class="animate__animated animate__fadeIn">
                {{ localize("roleDescriptionCapslock", "role") }}
              </span>
            </MDBCol>
            <MDBCol class="col-auto align-items-end">
              <InputText
                class="input-wrapper animate__animated animate__fadeIn username-input input-text"
                :class="{ 'p-invalid': !validate.description }"
                type="text"
                v-model="newRoleDescription"
              />
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow class="w-auto">
        <MDBCol class="col-auto"> </MDBCol>
      </MDBRow>
      <MDBCol v-if="!editing" class="d-flex justify-content-end">
        <MDBBtn @click="startEditing" class="utility-btn" outline="black">{{
          localize("editCapslock", "default")
        }}</MDBBtn>
      </MDBCol>
      <MDBCol v-else class="d-flex justify-content-end">
        <MDBBtn @click="confirmDeletion" class="utility-btn btn-danger">{{
          localize("deleteCapslock")
        }}</MDBBtn>
        <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">{{
          localize("cancelCapslock")
        }}</MDBBtn>
        <MDBBtn @click="saveChanges" class="utility-btn btn-black">{{
          localize("saveCapslock")
        }}</MDBBtn>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4">
    <span class="span">{{ localize("relatedUsersCapslock", "role") }} </span>
    <MultiSelectComponent
      :start-items="relatedUsers"
      :options="usersOptions"
      option-label="name"
      :placeholder="localize('editRelatedUsers', 'role')"
      :disabled="!canEditUsers"
      @items-added="usersAdded"
      @items-removed="usersRemoved"
    />
  </MDBContainer>
  <MDBContainer class="pt-4">
    <Panel :header="localize('rolePermissions', 'role')">
      <TabsComponent :roles="roles" :user-id="null" />
    </Panel>
  </MDBContainer>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  MDBInput,
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
} from "mdb-vue-ui-kit";
import Panel from "primevue/panel";
import InputText from "primevue/inputtext";
import TabsComponent from "@/components/Navigation/TabsComponent.vue";
import ModalComponent from "@/components/Elements/Dialogs/ModalComponent.vue";
import { useRolesStore } from "@/stores/roles.store";
import { useRoute, useRouter } from "vue-router";
import UpdateRoleDto from "@/api/modules/rbac/dto/roles/update-role.dto";
import TokenUtil from "@/utils/token.util";
import { appConf } from "@/api/conf/app.conf";
import MultiSelectComponent from "@/components/Elements/Selectors/MultiSelectComponent.vue";
import { useUsersStore } from "@/stores/user.store";
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";
import { useModalStore } from "@/stores/modal.store";

export default {
  name: "SingleRoleView",
  components: {
    MultiSelectComponent,
    ModalComponent,
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
    MDBInput,
    Panel,
    InputText,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup() {
    const rolesStore = useRolesStore();
    const usersStore = useUsersStore();
    const modalStore = useModalStore();
    const router = useRouter();
    const route = useRoute();

    return {
      usersStore,
      rolesStore,
      roleLoadRes: await rolesStore.loadSelectedRole(
        parseInt(route.params.id.toString()),
      ),
      usersLoadRes: await usersStore.loadUsersList(),
      modalStore,
      router,
    };
  },
  data: () => ({
    modalTitle: PrintUtil.localize("confirmDeletion"),
    disclaimerText: PrintUtil.localize("deleteDisclaimer", "role"),
    showModal: false,
    activeTabId4: "role1-1",
    editing: false,
    newRoleName: "",
    originalRoleName: "",
    newRoleDescription: "",
    originalRoleDescription: "",
    //true => no errors
    validate: {
      name: true,
      description: true,
    },
    validator: new ValidatorUtil(),
  }),
  created() {
    const nameValidateRule = new ValidateRule().skipIfNull().required();
    const descriptionValidateRule = new ValidateRule().skipIfNull().required();
    this.validator = this.validator
      .addRule("name", nameValidateRule)
      .addRule("description", descriptionValidateRule);

    this.roleLoadRes.toastIfError(this.$toast, this.$nextTick);
    this.usersLoadRes.toastIfError(this.$toast, this.$nextTick);
  },
  methods: {
    clearValidationErrors() {
      this.validate = {
        name: true,
        description: true,
      };
    },
    localize(key, module) {
      return PrintUtil.localize(key, module);
    },
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: this.localize("success", "storehouses"),
        detail: this.localize("roleIsUpdated", "role"),
        life: 3000,
      });
    },
    confirmDeletion() {
      this.modalStore.show({
        title: this.modalTitle,
        text: this.modalText,
        disclaimer: this.disclaimerText,
      });
    },
    async approveRoleRemove() {
      const removed = await this.rolesStore.remove(this.id);
      if (removed.success) {
        this.$toast.add({
          severity: "success",
          summary: this.localize("success", "storehouses"),
          detail: this.localize("roleIsRemoved", "role"),
          life: 3000,
        });
        this.modalStore.hide();
        await this.rolesStore.loadRolesList();
        this.router.push({ name: "roles" });
      } else {
        removed.toastIfError(this.$toast, this.$nextTick);
      }
    },
    closeModal() {
      this.modalStore.hide();
    },
    startEditing() {
      this.editing = true;
      this.originalRoleName = this.roleName;
      this.newRoleName = this.roleName;
      this.originalRoleDescription = this.roleDescription;
      this.newRoleDescription = this.roleDescription;
    },
    async saveChanges() {
      this.clearValidationErrors();
      const name = this.newRoleName == this.roleName ? null : this.newRoleName;
      const description =
        this.newRoleDescription == this.roleDescription
          ? null
          : this.newRoleDescription;
      const data = new UpdateRoleDto(name, description);

      const validateRes = this.validator.validate(data);
      if (validateRes !== true) {
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      const updateResult = await this.rolesStore.updateRole(this.id, data);
      this.editing = !updateResult.success;
      if (!updateResult.success) {
        const error = updateResult.getError();
        if (error.httpStatusCode == 415) {
          this.validator.showErrorToast(this.$toast);
          return;
        } else if (error.httpStatusCode == 404) {
          this.$toast.add({
            severity: "error",
            summary: this.localize("deletionFailed", "role"),
            detail: this.localize("roleNotFound", "role"),
            life: 3000,
          });
          this.$router.push({ name: "roles" });
        } else {
          error.showServerErrorToast(this.$toast, this.$nextTick);
        }
      } else {
        this.showSuccessToast();
      }
    },
    cancelEditing() {
      this.clearValidationErrors();
      this.editing = false;
    },
    async usersAdded(addedUsers) {
      const result = await Promise.all(
        addedUsers.map(
          async (el) => await this.usersStore.appendRoles(el, [this.id]),
        ),
      );
      if (result.filter((el) => el.success).length != result.length) {
        result.forEach((el) => {
          if (!el.success) {
            el.getError().showServerErrorToast(this.$toast, this.$nextTick);
          }
        });
      } else this.showSuccessToast();
    },
    async usersRemoved(removedUsers) {
      const result = await Promise.all(
        removedUsers.map(
          async (el) => await this.usersStore.removeRoles(el, [this.id]),
        ),
      );
      if (result.filter((el) => el.success).length != result.length) {
        result.forEach((el) => {
          if (!el.success) {
            el.getError().showServerErrorToast(this.$toast, this.$nextTick);
          }
        });
      } else this.showSuccessToast();
    },
  },
  computed: {
    modalText() {
      return `${PrintUtil.localize("deleteWarn", "role")} "${this.roleName}?"`;
    },
    selectedRole() {
      return this.rolesStore.getSelectedRole || {};
    },
    roleName() {
      return this.selectedRole.name || "";
    },
    roleDescription() {
      return this.selectedRole.description || "";
    },
    roles() {
      if (this.selectedRole.rules)
        return [{ ...this.selectedRole, canChange: true }];
      else return [{ ...this.selectedRole, rules: [], canChange: true }];
    },
    relatedUsers() {
      return this.selectedRole.relatedUsers.map((el) => ({
        id: el.first,
        name: el.second,
      }));
    },
    usersOptions() {
      return this.usersStore.getUserList.map((el) => ({
        id: el.id,
        name: el.name,
      }));
    },
    canEditUsers() {
      return TokenUtil.hasAccessTo(appConf.rules.userManaging);
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
:deep(.p-panel-content) {
  padding: 0;
}
.span {
  color: #6c6c6c;
  margin-right: 1rem;
}
.col-span {
  display: flex;
  align-items: center !important;
}
.label {
  margin: 0;
}
</style>
