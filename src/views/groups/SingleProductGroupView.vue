<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="confirmDeleteGroup"
    @close="closeModal"
  />
  <Dialog
    v-model:visible="addToGroupModalStore.addToGroupOpen"
    modal
    :style="{ width: '90vw' }"
    :header="addToGroupModalStore.title"
  >
    <AddToGroupComponent :group-name="getGroupName" />
  </Dialog>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto gap-2">
        <h1 class="username-heading">{{ getGroupName }}</h1>
        <MDBBtn class="btn btn-outline-black utility-btn" @click="startEdit">{{
          localize("editGroup", "groups")
        }}</MDBBtn>
        <MDBBtn
          class="btn btn-outline-black utility-btn"
          @click="applyChanges"
          >{{ localize("applyChanges", "groups") }}</MDBBtn
        >
        <MDBBtn class="btn btn-danger utility-btn" @click="deleteGroup">{{
          localize("deleteCapslock", "default")
        }}</MDBBtn>
      </MDBRow>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4 table-block">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">
        {{ localize("productsList", "groups") }}
      </h1>
    </MDBRow>
    <SearchComponent class="search" @search="handleSearch" />
    <TableComponent
      :info-message="noDataMessage"
      :rows="getProductList"
      :columns="productGroupStore.productTableColumns"
      :searchTerm="productGroupStore.searchTerm"
      :enable-delete="true"
      @row-delete="handleRowDelete"
      @row-click="handleRowClick"
    />
  </MDBContainer>
</template>
<script lang="ts">
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import { useProductGroupStore } from "@/stores/product-group.store";
import { useRoute, useRouter } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";
import { useAddToGroupModalStore } from "@/stores/add-to-group-modal.store";
import AddToGroupComponent from "@/views/groups/AddToGroupComponent.vue";
import Dialog from "primevue/dialog";
import { useModalStore } from "@/stores/modal.store";
import ModalComponent from "@/components/Elements/Dialogs/ModalComponent.vue";

export default {
  name: "SingleProductGroupView",
  components: {
    SearchComponent,
    TableComponent,
    AddToGroupComponent,
    ModalComponent,
    Dialog,
    MDBRow,
    MDBContainer,
    MDBCol,
    MDBBtn,
  },
  props: ["id"],
  data: () => ({
    noDataMessage: {
      icon: "IconSearchOff",
      title: PrintUtil.localize("nothingWasFound", "user"),
      text: PrintUtil.localize("pleaseClarifyYourSearchQuery", "role"),
    },
  }),
  async setup() {
    const productGroupStore = useProductGroupStore();
    const addToGroupModalStore = useAddToGroupModalStore();
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([
      productGroupStore.loadSelectedGroup(parseInt(route.params.id.toString())),
    ]);

    return {
      productGroupStore,
      addToGroupModalStore,
      modalStore,
      router,
      groupId: parseInt(route.params.id.toString()),
      loaders,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));
  },
  methods: {
    localize(name, module) {
      return PrintUtil.localize(name, module);
    },
    startEdit() {
      const selectedGroup = this.productGroupStore.selectedGroup;
      this.addToGroupModalStore.openEditModal(
        selectedGroup,
        this.productGroupStore.updateGroup,
      );
    },
    handleSearch(searchTerm) {
      this.productGroupStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      window.open(`${window.location.origin}/product/${row.id}`, "_blank");
    },
    async handleRowDelete(row) {
      const res = await this.productGroupStore.removeProductFromGroup(
        this.groupId,
        row.id,
      );

      if (res?.success) {
        this.$toast.add({
          severity: "info",
          summary: PrintUtil.localize("success", "groups"),
          detail: `${PrintUtil.localize("group", "groups")} ${PrintUtil.localize("successfully", "groups")} ${PrintUtil.localize("updated", "groups")}`,
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: PrintUtil.localize("failed", "groups"),
          detail: `${PrintUtil.localize("updateFailure", "groups")}`,
          life: 3000,
        });
      }
    },
    applyChanges() {
      this.router.push({
        name: "Group apply",
        params: { id: this.groupId },
      });
    },
    deleteGroup() {
      this.modalStore.show({
        title: this.localize("confirmDeletion", "default"),
        text: `${this.localize("areYouSure", "groups")} ${this.getGroupName}`,
        disclaimer: "",
      });
    },
    closeModal() {
      this.modalStore.hide();
    },
    async confirmDeleteGroup() {
      const removed = await this.productGroupStore.removeGroup(this.groupId);
      if (removed.success) {
        this.$toast.add({
          severity: "info",
          summary: PrintUtil.localize("success", "groups"),
          detail: `${PrintUtil.localize("group", "groups")} ${PrintUtil.localize("successfully", "groups")} ${PrintUtil.localize("removed", "groups")}`,
          life: 3000,
        });
        this.router.push({ name: "groups" });
      } else {
        removed.toastIfError(this.$toast, this.$nextTick);
      }
    },
  },
  computed: {
    getGroupName() {
      return this.productGroupStore.getSelectedGroup.name || "";
    },
    getProductList() {
      return this.productGroupStore.getSelectedGroup.products || [];
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
  text-align: left;
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
.table-block {
  width: 80vw;
}
.search {
  width: 78.5vw;
}
</style>
