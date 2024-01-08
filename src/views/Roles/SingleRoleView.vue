<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex justify-content-around">
      <MDBRow class="w-auto">
        <MDBCol class="col-auto">
          <h1 v-if="!editing" class="animate__animated animate__fadeIn username-heading">{{ roleName }}</h1>
          <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newRoleName" />
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
  </MDBContainer>
  <MDBContainer class="pt-4">
    <TabsComponent />
  </MDBContainer>
</template>

<script lang="ts">
import { ref } from 'vue';
import {MDBInput, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Elements/TabsComponent.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
export default {
  name: "SingleRoleView",
  components: {
    ModalComponent,
    TabsComponent,
    MDBBtn, MDBContainer, MDBRow, MDBCol, MDBBadge, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane, MDBInput
  },
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
  data() {
    return {
      activeTabId4: 'role1-1',
      editing: false,
      newRoleName: '',
      originalRoleName: '',
    }
  },
  methods: {
    startEditing() {
      this.editing = true;
      this.originalRoleName = this.roleName;
      this.newRoleName = this.roleName;
    },
    saveChanges() {
      this.editing = false;
      this.originalRoleName = ''; // Сбрасываем оригинальное имя
      // Выполняем логику сохранения изменений
      // this.roleName = this.newRoleName;
    },
    cancelEditing() {
      this.editing = false;
      this.newRoleName = this.originalRoleName; // Возвращаем оригинальное имя при отмене
      this.originalRoleName = ''; // Сбрасываем оригинальное имя
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