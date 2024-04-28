<template>
  <div class="row mb-2">
    <div class="col-auto">
      <h5 class="m-0">{{ localize("groupNamePlaceholder") }}</h5>
    </div>
    <div class="col-auto">
      <InputText
        v-model="addToGroupModalStore.name"
        :placeholder="localize('groupNamePlaceholder')"
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
        {{ localize("clickOnRowsToSelect") }}
      </p>
      <SearchComponent v-model="productsStore.searchTerm" />
      <TableComponent
        class="table-data"
        :info-message="noDataMessage"
        :showEditColumn="false"
        :selection-mode="'multiple'"
        :selected-output-store="addToGroupModalStore"
        :rows="getFilteredProducts"
        :columns="productsStore.productColumns"
        :searchTerm="addToGroupModalStore.searchTerm"
        :frozen-selected="true"
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
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import { FilterType } from "@/api/conf/app.conf";
import { useFiltersStore } from "@/stores/filters.store";
import { useBrandStore } from "@/stores/brand.store";
import { useCollectionStore } from "@/stores/collection.store";

export default defineComponent({
  name: "AddToGroupComponent",
  components: {
    SearchComponent,
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
    TableComponent,
    InputText,
    Button,
    IconInfoCircle,
  },
  props: {
    groupName: {
      type: String,
      default: PrintUtil.localize("groupName", "groups"),
    },
  },
  async setup() {
    const productsStore = useProductsStore();
    const productGroupStore = useProductGroupStore();
    const addToGroupModalStore = useAddToGroupModalStore();
    const filtersStore = useFiltersStore();

    const loaders = await Promise.all([productsStore.loadProductList()]);

    return {
      productsStore,
      productGroupStore,
      addToGroupModalStore,
      filtersStore,
      loaders,
    };
  },
  created() {
    this.filtersStore.setFilters({
      vendorCode: {
        title: this.localize("vendorCode", "products"),
        type: FilterType.TEXT,
        value: null,
      },
      name: {
        title: this.localize("name", "products"),
        type: FilterType.TEXT,
        value: null,
      },
      description: {
        title: this.localize("description", "products"),
        type: FilterType.TEXT,
        value: null,
      },
      color: {
        title: this.localize("color", "products"),
        type: FilterType.TEXT,
        value: null,
      },
      purchasePrice: {
        title: this.localize("purchasePrice", "products"),
        type: FilterType.NUMBER,
        value: { min: null, max: null },
      },
      distributorPrice: {
        title: this.localize("distributorPrice", "products"),
        type: FilterType.NUMBER,
        value: { min: null, max: null },
      },
      professionalPrice: {
        title: this.localize("professionalPrice", "products"),
        type: FilterType.NUMBER,
        value: { min: null, max: null },
      },
      commonPrice: {
        title: this.localize("commonPrice", "products"),
        type: FilterType.NUMBER,
        value: { min: null, max: null },
      },
      amountInBox: {
        title: this.localize("amountInBox", "products"),
        type: FilterType.NUMBER,
        value: { min: null, max: null },
      },
    });
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));

    this.productGroupStore.$onAction(async (action) => {
      if (action.name == "update_success") {
        this.$toast.add({
          severity: "info",
          summary: this.localize("success"),
          detail: `${this.localize("group")} '${this.addToGroupModalStore.name}' ${this.localize("updateSuccess")}`,
          life: 3000,
        });
        this.addToGroupModalStore.addToGroupOpen = false;
      }
      if (action.name == "update_failed") {
        this.$toast.add({
          severity: "error",
          summary: this.localize("failed"),
          detail: `${this.localize("group")} '${this.addToGroupModalStore.name}' ${this.localize("updateFailed")}`,
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
            summary: this.localize("success"),
            detail: `${this.localize("group")} '${created.getData().name}' ${this.localize("createSuccess")}`,
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
    localize(key: string, module: string = "groups") {
      return PrintUtil.localize(key, module);
    },
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
    isSelected(id) {
      return (
        this.addToGroupModalStore.selectedRows.filter((el) => el.id == id)
          .length > 0
      );
    },
  },
  computed: {
    getFilteredProducts() {
      let productList;

      const searchTerm = this.productsStore.getSearchTerm;

      if (searchTerm.trim() === "")
        productList = this.productsStore.getProductList;

      productList = this.productsStore.getProductList.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );

      let resultList = [];
      productList.forEach((el) => {
        if (this.isSelected(el.id)) {
          resultList.unshift(el);
        } else {
          resultList.push(el);
        }
      });

      return resultList;
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
