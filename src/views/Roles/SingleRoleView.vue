<template>
  <ModalComponent
    :disclaimerText="disclaimerText"
    :modalTitle="modalTitle"
    :modalText="modalText"
    v-if="showModal"
    @closeModal="closeModal"
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
          <MDBInput
            v-else
            class="input-wrapper animate__animated animate__fadeIn username-input"
            :class="{ 'p-invalid': !validate.name }"
            type="text"
            v-model="newRoleName"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1
            v-if="!editing"
            class="animate__animated animate__fadeIn username-heading"
          >
            {{ roleDescription }}
          </h1>
          <MDBInput
            v-else
            class="input-wrapper animate__animated animate__fadeIn username-input"
            :class="{ 'p-invalid': !validate.description }"
            type="text"
            v-model="newRoleDescription"
          />
        </MDBCol>
      </MDBRow>
      <MDBCol v-if="!editing" class="d-flex justify-content-end">
        <MDBBtn @click="startEditing" class="utility-btn" outline="black"
          >EDIT</MDBBtn
        >
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
    <span class="username"
      >{{ localize("relatedUsersCapslock", "role") }}:
    </span>
    <MultiSelectComponent
      :start-items="relatedUsers"
      :options="usersOptions"
      option-label="name"
      placeholder="Edit related users"
      :disabled="!canEditUsers"
      @items-added="usersAdded"
      @items-removed="usersRemoved"
    />
  </MDBContainer>
  <MDBContainer class="pt-4">
    <TabsComponent :roles="roles" :user-id="null" />
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
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
import { useRolesStore } from "@/stores/roles.store";
import { useRoute } from "vue-router";
import UpdateRoleDto from "@/api/modules/rbac/dto/roles/update-role.dto";
import TokenUtil from "@/utils/token.util";
import { appConf } from "@/api/conf/app.conf";
import MultiSelectComponent from "@/components/Elements/MultiSelectComponent.vue";
import { useUsersStore } from "@/stores/user.store";
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";

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

    const route = useRoute();
    await rolesStore.loadSelectedRole(parseInt(route.params.id.toString()));
    await usersStore.loadUsersList();

    return {
      usersStore,
      rolesStore,
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
  },
  methods: {
    localize(key, module) {
      return PrintUtil.localize(key, module);
    },
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Role is updated",
        life: 3000,
      });
    },
    confirmDeletion() {
      this.roleName = this.selectedRole.name || "";
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    startEditing() {
      this.editing = true;
      this.originalRoleName = this.roleName;
      this.newRoleName = this.roleName;
      this.originalRoleDescription = this.roleDescription;
      this.newRoleDescription = this.roleDescription;
    },
    async saveChanges() {
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
            summary: "Deletion failed",
            detail: "Role not found",
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
      this.editing = false;
      this.newRoleName = this.originalRoleName; // Возвращаем оригинальное имя при отмене
      this.originalRoleName = ""; // Сбрасываем оригинальное имя
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
</style>
