<template>
  <div class="container-fluid" style="padding: 0">
    <template v-if="!isIdProvided">
      <MDBContainer class="d-flex container-content">
        <MDBCol class="col-auto">
          <FiltersSidebarComponent
            :filters-input="sidebarFilter"
            @start-search="handleFiltersSearch"
          />
        </MDBCol>
        <MDBCol class="col-auto">
          <MDBContainer class="table-container">
            <SearchComponent @search="handleSearch" />
            <TableComponent
              :editableColumns="editableColumns"
              :showEditColumn="true"
              :rows="productsStore.productRows"
              :columns="productsStore.productColumns"
              :searchTerm="productsStore.searchTerm"
              @rowClick="handleRowClick"
              @row-edit-save="handleRowEdit"
            />
          </MDBContainer>
        </MDBCol>
      </MDBContainer>
    </template>
    <router-view v-if="isIdProvided" :id="routeIdParam" />
  </div>
</template>

<script lang="ts">
import FiltersSidebarComponent from "@/components/Elements/Filter/FiltersSidebarComponent.vue";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useProductsStore } from "@/stores/products.store";
import { useRoute, useRouter } from "vue-router";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import { ref } from "vue";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import { useCollectionStore } from "@/stores/collection.store";
import { FilterType } from "@/api/conf/app.conf";
import loggerUtil from "@/utils/logger/logger.util";
import FieldSearchWrapperDto from "@/utils/crud/dto/field-search-wrapper.dto";

export default {
  name: "ProductsView",
  components: {
    SearchComponent,
    TableComponent,
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
  },
  data() {
    return {
      editableColumns: ["price"],
      sidebarFilter: {
        vendorCode: {
          title: "Vendor Code",
          type: FilterType.TEXT,
          value: null,
        },
        name: {
          title: "Name",
          type: FilterType.TEXT,
          value: null,
        },
        description: {
          title: "Description",
          type: FilterType.TEXT,
          value: null,
        },
        color: {
          title: "Color",
          type: FilterType.TEXT,
          value: null,
        },
        purchasePrice: {
          title: "Purchase Price",
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        distributorPrice: {
          title: "Distributor Price",
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        professionalPrice: {
          title: "Professional Price",
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        commonPrice: {
          title: "Common Price",
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        amountInBox: {
          title: "Amount in box",
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        brand: {
          title: "Brand",
          items: this.brandStore.getBrandList,
          type: FilterType.SELECT,
          value: null,
        },
        collection: {
          title: "Collection",
          items: this.collectionStore.getCollectionList,
          type: FilterType.SELECT,
        },
        category: {
          title: "Category",
          items: this.categoryStore.getCategoryList,
          tree: true,
          type: FilterType.SELECT,
        },
      },
    };
  },
  async setup() {
    const productsStore = useProductsStore();
    const brandStore = useBrandStore();
    const categoryStore = useCategoriesStore();
    const collectionStore = useCollectionStore();
    const route = useRoute();
    const router = useRouter();
    await productsStore.loadProductList();
    await brandStore.loadBrandsList();
    await collectionStore.loadCollectionList();
    await categoryStore.loadCategoriesList();
    return {
      brandStore,
      collectionStore,
      categoryStore,
      productsStore,
      route,
      router,
    };
  },
  created() {},
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
    routeIdParam() {
      return parseInt(this.route.params.id.toString());
    },
    isIdProvided() {
      return !!this.route.params.id;
    },
    brandList() {
      return this.brandStore.getBrandList;
    },
    categoryList() {
      return this.categoryStore.getCategoryList;
    },
    collectionList() {
      return this.collectionStore.getCollectionList;
    },
  },
  methods: {
    handleSearch(searchTerm) {
      this.productsStore.searchTerm = searchTerm;
    },
    async handleFiltersSearch(filters) {
      await this.productsStore.loadProductList(
        new ProductSearchFilterDto(filters),
      );
    },
    handleRowClick(row) {
      console.log("Clicked row with id:", row.id);
      this.router.push({
        name: "Product details",
        params: { id: row.id.toString() },
      });
    },
    async handleRowEdit(row) {
      //TODO: Check that price is not empty
      const updated = await this.productsStore.updateProduct(row.id, {
        commonPrice: row.price,
      });
      //TODO: Check for errors
    },
  },
};
</script>

<style scoped>
.container-content {
  width: 100%;
  margin: 0;
}
.table-container {
  width: 83vw;
}
</style>
