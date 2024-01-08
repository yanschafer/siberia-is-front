<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1 v-if="!editing" class="username-heading">{{ userName }}</h1>
          <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newUserName" />
        </MDBCol>
        <MDBCol class="align-self-center">
          <MDBRow class="d-flex flex-row flex-nowrap align-self-center">
            <span class="user-roles-heading">USER ROLES</span>
            <div class="container">
              <MDBBadge v-for="roleName in userRolesNameList" color="secondary">{{ roleName }}</MDBBadge>
            </div>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBCol v-if="!editing" class="d-flex justify-content-end">
        <MDBBtn @click="startEditing" class="utility-btn" outline="black">EDIT</MDBBtn>
      </MDBCol>
      <MDBCol v-else class="d-flex justify-content-end">
        <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">CANCEL</MDBBtn>
        <MDBBtn @click="saveChanges" class="utility-btn btn-black">SAVE</MDBBtn>
      </MDBCol>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">USERNAME</span>
      <span v-if="!editing" class="username">{{ userUsername }}</span>
      <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newUserUsername" />
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">PASSWORD</span>
      <span v-if="!editing" class="password">{{ userPassword }}</span>
      <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newUserPassword" />
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4">
<!--    <TabsComponent :userTabs="getUserTabs(selectedUser)" />-->
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
  MDBInput
} from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import UserFullDto from "@/api/modules/user/dto/user-full.dto";
import {useRoute} from "vue-router";
import UpdateUserDto from "@/api/modules/user/dto/update-user.dto";
import {useUsersStore} from "@/stores/user.store";
export default {
  name: "SingleUserView",
  components: {
    MDBInput,
    TabsComponent, MDBBtn,MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane
  },
  data: () => ({
    editing: false,
    searchTerm: '',
    originalUserName: '',
    newUserName: '',
    originalUserUsername: '',
    newUserUsername: '',
    originalUserPassword: '',
    newUserPassword: ''
  }),
  async setup() {
    const userStore = useUsersStore()
    const route = useRoute()
    await userStore.loadSelectedUser(parseInt(route.params.id.toString()));
    return {
      userStore
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    selectedUser(): UserFullDto {
      return this.userStore.getSelectedUser
    },
    userName() {
      return this.selectedUser.name || '';
    },
    userUsername() {
      return this.selectedUser.login || '';
    },
    userPassword() {
      return "password".replace(/./g, '*') || '';
    },
    userRolesNameList() {
      return this.selectedUser.roles.map(el => el.name)
    }
  },
  methods: {
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
      const newName = (this.newUserName == this.originalUserName) ? null : this.newUserName
      const newLogin = (this.newUserUsername == this.originalUserUsername) ? null : this.newUserUsername
      const newPassword = (this.newUserPassword == "") ? null : this.newUserPassword
      const userUpdateDto = new UpdateUserDto(
        newName, newLogin, newPassword
      );
      const result = await this.userStore.updateUser(this.id, userUpdateDto)
      this.editing = !result.success
      //TODO: Check for errors
      
    },
    cancelEditing() {
      this.editing = false;
      this.newUserName = this.originalUserName;
      this.newUserUsername = this.originalUserUsername;
      this.newUserPassword = this.originalUserPassword;
      this.originalUserName = '';
      this.originalUserUsername = '';
      this.originalUserPassword = '';
    },
    getUserTabs(user) {
      return user.tabs || [];
    },
  },
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
.username {
  width: 100%;
  max-width: 20rem!important;
}
:deep(.form-outline) {
  width: 100%;
  max-width: 20rem!important;
}
</style>