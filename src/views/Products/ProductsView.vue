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
import PrintUtil from "@/utils/localization/print.util";

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
          title: this.localize("vendorCode"),
          type: FilterType.TEXT,
          value: null,
        },
        name: {
          title: this.localize("name"),
          type: FilterType.TEXT,
          value: null,
        },
        description: {
          title: this.localize("description"),
          type: FilterType.TEXT,
          value: null,
        },
        color: {
          title: this.localize("color"),
          type: FilterType.TEXT,
          value: null,
        },
        purchasePrice: {
          title: this.localize("purchasePrice"),
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        distributorPrice: {
          title: this.localize("distributorPrice"),
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        professionalPrice: {
          title: this.localize("professionalPrice"),
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        commonPrice: {
          title: this.localize("commonPrice"),
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        amountInBox: {
          title: this.localize("amountInBox"),
          type: FilterType.NUMBER,
          value: { min: null, max: null },
        },
        brand: {
          title: this.localize("brand"),
          items: this.brandStore.getBrandList,
          type: FilterType.SELECT,
          value: null,
        },
        collection: {
          title: this.localize("collection"),
          items: this.collectionStore.getCollectionList,
          type: FilterType.SELECT,
        },
        category: {
          title: this.localize("category"),
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
    localize(key, module = "products") {
          return PrintUtil.localize(key, module);
    },
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
