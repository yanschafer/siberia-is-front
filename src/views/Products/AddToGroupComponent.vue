<script lang="ts">
import { defineComponent } from "vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { useProductsStore } from "@/stores/products.store";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "AddToGroupComponent",
  components: {
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
    TableComponent,
    InputText,
  },
  setup() {
    const productsStore = useProductsStore();
    return {
      productsStore,
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.productsStore.searchTerm = searchTerm;
    },
    async handleFiltersSearch(filters) {
      const loadRes = await this.productsStore.loadProductList(
        new ProductSearchFilterDto(filters),
      );
      loadRes.toastIfError(this.$toast, this.$nextTick);
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

<template>
  <div class="row mb-2">
    <div class="col-auto">
      <h5 class="m-0">Group name</h5>
    </div>
    <div class="col-auto">
      <InputText :placeholder="'New group name'" />
    </div>
    <div class="col">
      <Button class="btn btn-black btn-outline utility-btn">+ Create</Button>
    </div>
  </div>
  <MDBContainer class="d-flex container-content">
    <MDBCol class="col-auto">
      <FiltersSidebarComponent @start-search="handleFiltersSearch" />
    </MDBCol>
    <MDBCol class="">
      <TableComponent
        :info-message="noDataMessage"
        :showEditColumn="false"
        :showSelectionColumn="true"
        :rows="getFilteredProducts"
        :columns="productsStore.productColumns"
        :searchTerm="productsStore.searchTerm"
      />
    </MDBCol>
  </MDBContainer>
</template>

<style scoped></style>
