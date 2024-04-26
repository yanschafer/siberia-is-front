<template>
  <span
    class="export-btn d-flex justify-content-center align-items-center gap-2"
    @click="showExport()"
    ><IconFileArrowRight color="#9b9b9b" :size="16" stroke-width="2" />
    {{ localize("exportToFile") }}
  </span>

  <Dialog
    v-model:visible="visible"
    modal
    :header="localize('exportToFile')"
    :style="{ width: '80vw', height: '90vh' }"
  >
    <div class="row justify-content-between">
      <div class="col-auto">
        <p>{{ localize("columnsForExport") }}</p>
      </div>
      <div class="col-auto">
        <button
          @click="exportProducts"
          class="btn btn-outline-black utility-btn"
        >
          {{ localize("export") }}
        </button>
      </div>
    </div>
    <div class="row">
      <MultiSelectComponent
          :placeholder="localize('columnsForExport')"
          :options="availableColumns"
          :option-label="'name'"
          :start-items="[]"
          @items-changed="columnsChanged"
          class="selector-multi"
      />
    </div>
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent
          :use-fast-search="true"
          @start-search="handleFiltersSearch"
        />
      </MDBCol>
      <MDBCol class="">
        <TableComponent
          class="table-data"
          :info-message="noDataMessage"
          :rows="getFilteredProducts"
          :columns="tableColumns"
          :searchTerm="productsStore.searchTerm"
        />
      </MDBCol>
    </MDBContainer>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { IconFileArrowRight, IconInfoCircle } from "@tabler/icons-vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import MultiSelectComponent from "@/components/Elements/Selectors/MultiSelectComponent.vue";
import PrintUtil from "@/utils/localization/print.util";
import { useProductsStore } from "@/stores/products.store";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import { FilterType } from "@/api/conf/app.conf";
import { useFiltersStore } from "@/stores/filters.store";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import { useCollectionStore } from "@/stores/collection.store";
import LoggerUtil from "@/utils/logger/logger.util";
import ExportConfigDto from "@/api/modules/product/dto/export-config.dto";

export default defineComponent({
  name: "ProductsExportModal",
  components: {
    MultiSelectComponent,
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
    TableComponent,
    IconInfoCircle,
    Button,
    Dialog,
    IconFileArrowRight,
  },
  data() {
    return {
      visible: false,
      noDataMessage: {
        icon: "IconSearchOff",
        title: this.localize("nothingWasFound", "user"),
        text: this.localize("pleaseClarifyYourSearchQuery", "role"),
      },
      availableColumns: PrintUtil.localize("availableColumns", "products"),
      selectedColumns: [],
      filters: {},
      hideFromTable: ["description"],
    };
  },
  async setup() {
    const productsStore = useProductsStore();
    const filtersStore = useFiltersStore();
    const brandStore = useBrandStore();
    const categoryStore = useCategoriesStore();
    const collectionStore = useCollectionStore();

    return {
      productsStore,
      filtersStore,
      brandStore,
      categoryStore,
      collectionStore,
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
  },
  computed: {
    getFilteredProducts() {
      const searchTerm = this.productsStore.getSearchTerm;

      if (searchTerm.trim() === "")
        return this.productsStore.getProductUnminifiedList;

      return this.productsStore.getProductUnminifiedList.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
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
    tableColumns() {
      if (Object.keys(this.selectedColumns).length == 0)
        return this.productsStore.productColumns.map((el) => {
          if (el.field == "price") {
            return { ...el, field: "commonPrice" };
          } else return el;
        });
      else
        return Object.keys(this.selectedColumns)
          .filter((el) => !this.hideFromTable.includes(el))
          .map((el) => {
            return {
              field: el,
              header: this.selectedColumns[el],
            };
          });
    },
  },
  methods: {
    localize(key: string, module: string = "products") {
      return PrintUtil.localize(key, module);
    },
    async showExport() {
      const loaders = await Promise.all([
        this.productsStore.loadUnminifiedProductList(),
        this.brandStore.loadBrandsList(),
        this.collectionStore.loadCollectionList(),
        this.categoryStore.loadCategoriesList(),
      ]);
      loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));
      this.visible = true;
    },
    columnsChanged(items) {
      this.selectedColumns = {};
      items.forEach((el) => {
        this.selectedColumns[el.key] = el.name;
      });
      LoggerUtil.debug("selectedcolumn", this.selectedColumns);
    },
    async exportProducts() {
      const exportConfig = new ExportConfigDto(
        this.filters,
        this.selectedColumns,
      );

      const exported = await this.productsStore.exportToFile(exportConfig);

      LoggerUtil.debug(exported);
    },
    handleSearch(searchTerm) {
      this.productsStore.searchTerm = searchTerm;
    },
    async handleFiltersSearch(filters) {
      this.filters = filters;
      const loadRes = await this.productsStore.loadUnminifiedProductList(
        new ProductSearchFilterDto(filters),
      );
      loadRes.toastIfError(this.$toast, this.$nextTick);
    },
  },
});
</script>

<style scoped>
.export-btn {
  margin-right: 2rem;
  color: #9b9b9b;
  transition: all 0.3s ease-in-out;
}
.export-btn:hover {
  filter: brightness(0) saturate(100%);
  cursor: pointer;
}
.selector-multi {
  max-width: 75vw;
  margin-bottom: 1rem;
}
</style>
