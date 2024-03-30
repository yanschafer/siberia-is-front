<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1 class="username-heading">{{ getGroupName }}</h1>
        <MDBBtn class="btn btn-outline-black utility-btn" @click="applyChanges"
          >APPLY CHANGES</MDBBtn
        >
      </MDBRow>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">Products list</h1>
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

export default {
  name: "SingleProductGroupView",
  components: {
    SearchComponent,
    TableComponent,
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
    const route = useRoute();
    const router = useRouter();

    return {
      productGroupStore,
      router,
      groupId: parseInt(route.params.id.toString()),
      loadSelectedRes: await productGroupStore.loadSelectedGroup(
        parseInt(route.params.id.toString()),
      ),
    };
  },
  methods: {
    localize(name, module) {
      return PrintUtil.localize(name, module);
    },
    handleSearch(searchTerm) {
      this.productGroupStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      window.open(`${window.location.origin}/product/${row.id}`, "_blank");
    },
    async handleRowDelete(row) {
      console.log(row);
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
</style>
