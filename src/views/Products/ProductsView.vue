<template>
  <ScrollPanel
    style="height: 80vh; width: 88vw"
    class="main-area animate__animated animate__fadeIn"
  >
    <template v-if="!isIdProvided">
      <TabsNavComponent />
      <MDBContainer class="d-flex container-content mt-3">
        <MDBCol class="col-auto">
          <FiltersSidebarComponent @start-search="handleFiltersSearch" />
        </MDBCol>
        <MDBCol class="col-auto">
          <MDBContainer class="table-container mt-2">
            <SearchComponent class="search" @search="handleSearch" />
            <TableComponent
              :info-message="noDataMessage"
              :editableColumns="editableColumns"
              :showEditColumn="true"
              :rows="getFilteredProducts"
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
  </ScrollPanel>
</template>

<script lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
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
import LoggerUtil from "@/utils/logger/logger.util";
import { useFiltersStore } from "@/stores/filters.store";
import ScrollPanel from "primevue/scrollpanel";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useProductGroupStore } from "@/stores/product-group.store";
import FileUploadModalComponent from "@/components/Inputs/FileUploadModalComponent.vue";
import AddToGroupComponent from "@/views/groups/AddToGroupComponent.vue";
import TabsNavComponent from "@/components/Navigation/TabsNavComponent.vue";
import { useNavTabsStore } from "@/stores/nav-tabs.store";
import NavTabDto from "@/router/dto/nav-tab.dto";
import RouteParametrized from "@/router/dto/route-parametrized";

export default {
  name: "ProductsView",
  components: {
    Button,
    TabsNavComponent,
    Dialog,
    AddToGroupComponent,
    FileUploadModalComponent,
    SearchComponent,
    TableComponent,
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
    ScrollPanel,
    TabView,
    TabPanel,
  },
  data() {
    return {
      noDataMessage: {
        icon: "IconSearchOff",
        title: this.localize("nothingWasFound", "user"),
        text: this.localize("pleaseClarifyYourSearchQuery", "role"),
      },
      editableColumns: ["price"],
    };
  },

  async setup() {
    const productsStore = useProductsStore();
    const productGroupStore = useProductGroupStore();
    const brandStore = useBrandStore();
    const categoryStore = useCategoriesStore();
    const collectionStore = useCollectionStore();
    const filtersStore = useFiltersStore();
    const tabNavStore = useNavTabsStore();
    const route = useRoute();
    const router = useRouter();

    tabNavStore.setTabs([
      new NavTabDto(1, "Single products", null, () => {}),
      new NavTabDto(2, "Grouped products", new RouteParametrized("groups")),
    ]);
    tabNavStore.setActive(0);

    return {
      tabNavStore,
      filtersStore,
      brandStore,
      collectionStore,
      categoryStore,
      productsStore,
      productGroupStore,
      route,
      router,
      loadProductListRes: await productsStore.loadProductList(),
      loadBrandListRes: await brandStore.loadBrandsList(),
      loadCollectionListRes: await collectionStore.loadCollectionList(),
      loadCategoryListRes: await categoryStore.loadCategoriesList(),
    };
  },
  created() {
    this.filtersStore.setFilters({
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
    });
    this.loadProductListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadBrandListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCollectionListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCategoryListRes.toastIfError(this.$toast, this.$nextTick);
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
      const loadRes = await this.productsStore.loadProductList(
        new ProductSearchFilterDto(filters),
      );
      loadRes.toastIfError(this.$toast, this.$nextTick);
    },
    handleRowClick(row) {
      this.router.push({
        name: "Product details",
        params: { id: row.id.toString() },
      });
    },
    async handleRowEdit(row) {
      if (row.price == "") {
        this.$toast.add({
          severity: "error",
          summary: this.localize("updateFailed"),
          detail: this.localize("priceCantBeEmpty"),
          life: 3000,
        });
        return;
      }
      const newPrice = parseFloat(row.price);
      if (
        Number.isNaN(newPrice) ||
        String(newPrice).length < String(row.price).length
      ) {
        this.$toast.add({
          severity: "error",
          summary: this.localize("updateFailed"),
          detail: this.localize("badPriceProvided"),
          life: 3000,
        });
        return;
      }
      const updated = await this.productsStore.updateProduct(row.id, {
        commonPrice: row.price,
      });
      if (!updated.success) {
        const error = updated.getError();
        if (error.httpStatusCode == 415) {
          this.$toast.add({
            severity: "error",
            summary: this.localize("updateFailed"),
            detail: this.localize("badPriceProvided"),
            life: 3000,
          });
        } else {
          error.showServerErrorToast(this.$toast, this.$nextTick);
        }
      }
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
  overflow-x: hidden !important;
}
.main-area {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
.search {
  width: 90vw;
}
</style>
