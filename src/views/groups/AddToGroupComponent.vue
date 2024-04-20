<template>
  <div class="row mb-2">
    <div class="col-auto">
      <h5 class="m-0">Group name</h5>
    </div>
    <div class="col-auto">
      <InputText
        v-model="addToGroupModalStore.name"
        :placeholder="'New group name'"
      />
    </div>
    <div class="col">
      <Button @click="save" class="btn btn-black btn-outline utility-btn">{{
        addToGroupModalStore.buttonLabel
      }}</Button>
    </div>
  </div>
  <MDBContainer class="d-flex container-content">
    <MDBCol class="col-auto">
      <FiltersSidebarComponent @start-search="handleFiltersSearch" />
    </MDBCol>
    <MDBCol class="">
      <p class="text-info">
        <IconInfoCircle color="#b6b6b6" :size="24" stroke-width="1" />
        Click on rows to select
      </p>

      <TableComponent
        class="table-data"
        :info-message="noDataMessage"
        :showEditColumn="false"
        :selection-mode="'multiple'"
        :selected-output-store="addToGroupModalStore"
        :rows="getFilteredProducts"
        :columns="productsStore.productColumns"
        :searchTerm="addToGroupModalStore.searchTerm"
      />
    </MDBCol>
  </MDBContainer>
</template>

<script lang="ts">
import { IconInfoCircle } from "@tabler/icons-vue";
import { defineComponent } from "vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { useProductsStore } from "@/stores/products.store";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useAddToGroupModalStore } from "@/stores/add-to-group-modal.store";
import { useProductGroupStore } from "@/stores/product-group.store";
import LoggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";

export default defineComponent({
  name: "AddToGroupComponent",
  components: {
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
    TableComponent,
    InputText,
    Button,
    IconInfoCircle,
  },
  async setup() {
    const productsStore = useProductsStore();
    const productGroupStore = useProductGroupStore();
    const addToGroupModalStore = useAddToGroupModalStore();

    const loaders = await Promise.all([productsStore.loadProductList()]);

    return {
      productsStore,
      productGroupStore,
      addToGroupModalStore,
      loaders,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));

    this.productGroupStore.$onAction(async (action) => {
      if (action.name == "update_success") {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `Group '${this.addToGroupModalStore.name}' updated`,
          life: 3000,
        });
        this.addToGroupModalStore.addToGroupOpen = false;
      }
      if (action.name == "update_failed") {
        this.$toast.add({
          severity: "error",
          summary: "Failed",
          detail: `Group '${this.addToGroupModalStore.name}' updating failed`,
          life: 3000,
        });
        this.addToGroupModalStore.addToGroupOpen = false;
      }
    });
    this.addToGroupModalStore.$onAction(async (action) => {
      if (action.name == "create") {
        const created = await this.productGroupStore.createGroup(
          this.addToGroupModalStore.getOutput,
        );

        if (created.success) {
          this.$toast.add({
            severity: "info",
            summary: "Success",
            detail: `Group '${created.getData().name}' created`,
            life: 3000,
          });
          this.addToGroupModalStore.addToGroupOpen = false;
        } else created.toastIfError(this.$toast, this.$nextTick);
      }
    });
  },
  data: () => ({
    noDataMessage: {
      icon: "IconSearchOff",
      title: PrintUtil.localize("nothingWasFound", "role"),
      text: PrintUtil.localize("pleaseClarifyYourSearchQuery", "role"),
    },
  }),
  methods: {
    handleSearch(searchTerm) {
      this.addToGroupModalStore.searchTerm = searchTerm;
    },
    async handleFiltersSearch(filters) {
      const loadRes = await this.productsStore.loadProductList(
        new ProductSearchFilterDto(filters),
      );
      loadRes.toastIfError(this.$toast, this.$nextTick);
    },
    async save() {
      this.addToGroupModalStore.callback();
    },
  },
  computed: {
    getFilteredProducts() {
      const searchTerm = this.productsStore.getSearchTerm;

      if (searchTerm.trim() === "") return this.productsStore.getProductList;

      return this.productsStore.getProductList.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    },
  },
});
</script>

<style scoped>
.container-content {
  margin: 0;
  width: max-content;
  display: flex;
}
.table-data {
  width: 70vw;
}
.text-info {
  color: #b6b6b6 !important;
}
</style>
