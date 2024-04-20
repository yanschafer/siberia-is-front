<template>
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
      <MDBRow class="w-auto">
        <h1 class="username-heading">{{ getGroupName }}</h1>
        <MDBBtn class="btn btn-outline-black utility-btn" @click="startEdit">{{
          localize("editGroup", "groups")
        }}</MDBBtn>
        <MDBBtn
          class="btn btn-outline-black utility-btn"
          @click="applyChanges"
          >{{ localize("applyChanges", "groups") }}</MDBBtn
        >
      </MDBRow>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4 table-block">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">
        {{ localize("productsList", "groups") }}
      </h1>
    </MDBRow>
    <SearchComponent @search="handleSearch" />
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
import { useProductsStore } from "@/stores/products.store";
import PrintUtil from "@/utils/localization/print.util";
import { appConf } from "@/api/conf/app.conf";
import { useAddToGroupModalStore } from "@/stores/add-to-group-modal.store";
import AddToGroupComponent from "@/views/groups/AddToGroupComponent.vue";
import Dialog from "primevue/dialog";

export default {
  name: "SingleProductGroupView",
  components: {
    SearchComponent,
    TableComponent,
    AddToGroupComponent,
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
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([
      productGroupStore.loadSelectedGroup(parseInt(route.params.id.toString())),
    ]);

    return {
      productGroupStore,
      addToGroupModalStore,
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
          severity: "success",
          summary: "Group update",
          detail: "Group was successfully updated",
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Group update",
          detail: "Group was not updated!",
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
</style>
