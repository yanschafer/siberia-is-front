<template>
  <Dialog
    v-model:visible="addToGroupStore.addToGroupOpen"
    modal
    :style="{ width: '90vw' }"
    :header="addToGroupStore.title"
  >
    <AddToGroupComponent />
  </Dialog>
  <TabsNavComponent />
  <MDBContainer class="d-flex container-content">
    <MDBCol class="col-auto">
      <MDBContainer class="table-container mt-3">
        <SearchComponent class="search" @search="handleSearch" />
        <TableComponent
          :info-message="noDataMessage"
          :enable-delete="true"
          :showEditColumn="false"
          :rows="getFilteredGroups"
          :columns="productGroupStore.getColumns"
          :searchTerm="productsStore.searchTerm"
          @rowClick="handleGroupClick"
          @row-delete="handleGroupDelete"
        />
      </MDBContainer>
    </MDBCol>
  </MDBContainer>
</template>

<script lang="ts">
import PrintUtil from "@/utils/localization/print.util";
import { MDBContainer, MDBCol } from "mdb-vue-ui-kit";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import AddToGroupComponent from "@/views/groups/AddToGroupComponent.vue";
import TabsNavComponent from "@/components/Navigation/TabsNavComponent.vue";
import { useProductGroupStore } from "@/stores/product-group.store.ts";
import { useProductsStore } from "@/stores/products.store.ts";
import Dialog from "primevue/dialog";
import { useAddToGroupModalStore } from "@/stores/add-to-group-modal.store.ts";
import { useRouter } from "vue-router";
import { useNavTabsStore } from "@/stores/nav-tabs.store.ts";
import NavTabDto from "@/router/dto/nav-tab.dto.ts";
import RouteParametrized from "@/router/dto/route-parametrized.ts";

export default {
  name: "GroupsView",
  components: {
    SearchComponent,
    TableComponent,
    AddToGroupComponent,
    TabsNavComponent,
    Dialog,
    MDBCol,
    MDBContainer,
  },
  async setup() {
    const productGroupStore = useProductGroupStore();
    const productsStore = useProductsStore();
    const addToGroupStore = useAddToGroupModalStore();
    const tabNavStore = useNavTabsStore();
    const router = useRouter();

    tabNavStore.setTabs([
      new NavTabDto(1, "Single products", new RouteParametrized("products")),
      new NavTabDto(2, "Grouped products", null, () => {}),
    ]);
    tabNavStore.setActive(1);

    const loaders = await Promise.all([productGroupStore.loadGroupsList()]);

    return {
      productGroupStore,
      productsStore,
      addToGroupStore,
      tabNavStore,
      router,
      loaders,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));
  },
  data: () => ({
    noDataMessage: {
      icon: "IconSearchOff",
      title: PrintUtil.localize("nothingWasFound", "user"),
      text: PrintUtil.localize("pleaseClarifyYourSearchQuery", "role"),
    },
  }),
  methods: {
    handleSearch(searchTerm) {
      this.productsStore.searchTerm = searchTerm;
    },
    handleGroupClick(row) {
      this.router.push({
        name: "Group details",
        params: { id: row.id.toString() },
      });
    },
    async handleGroupDelete(row) {
      const removed = await this.productGroupStore.removeGroup(row.id);

      if (removed.success) {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: "Group successfully removed",
          life: 3000,
        });
      } else removed.toastIfError(this.$toast, this.$nextTick);
    },
  },
  computed: {
    getFilteredGroups() {
      const searchTerm = this.productsStore.getSearchTerm;

      if (searchTerm.trim() === "")
        return this.productGroupStore.getProductGroupsList;

      return this.productGroupStore.getProductGroupsList.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    },
  },
};
</script>

<style scoped>
.search {
  width: 90vw;
}
</style>
