<template>
  <template v-if="!isIdProvided">
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent @start-search="handleFiltersSearch" />
      </MDBCol>
      <MDBCol class="content-col">
        <TableComponent
          :infoMessage="noDataMessage"
          :rows="filteredOperations"
          :columns="operationStore.operationColumns"
          :searchTerm="''"
          @rowClick="handleRowClick"
        />
      </MDBCol>
    </MDBContainer>
  </template>
  <router-view v-if="isIdProvided" :id="routeIdParam" />
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import { useOperationStore } from "@/stores/operation.store";
import { useRoute, useRouter } from "vue-router";
import { FilterType, TransactionType } from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";
import { MDBContainer, MDBCol } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import { useStorehousesStore } from "@/stores/storehouse.store";
import PrintUtil from "@/utils/localization/print.util";
import { useFiltersStore } from "@/stores/filters.store";
export default {
  name: "OperationsView",
  components: {
    FiltersSidebarComponent,
    TableComponent,
    SearchComponent,
    MDBContainer,
    MDBCol,
  },
  data() {
    return {
      noDataMessage: {
        icon: "IconSearchOff",
        title: "Nothing was found",
        text: "Please clarify your search query",
      },
      typeMapper: {
        [TransactionType.INCOME]: "Arrival",
        [TransactionType.OUTCOME]: "Sale",
        [TransactionType.TRANSFER]: "Request",
        [TransactionType.WriteOff]: "Write-off",
      },
    };
  },
  async setup() {
    const operationStore = useOperationStore();
    const stockStore = useStorehousesStore();
    const filtersStore = useFiltersStore();
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([
      operationStore.loadOperationList(),
      stockStore.loadStorehouseList(),
      operationStore.loadStatusesList(),
    ]);

    return {
      filtersStore,
      operationStore,
      stockStore,
      route,
      router,
      loaders,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));
    this.filtersStore.setFilters({
      showClosed: {
        title: PrintUtil.localize("showClosedOperations", "operations"),
        type: FilterType.CHECKBOX,
        value: false,
      },
      status: {
        title: PrintUtil.localize("operationStatus", "operations"),
        type: FilterType.SELECT,
        items: this.operationStore.getStatusList,
        value: null,
      },
      type: {
        title: PrintUtil.localize("operationType", "operations"),
        type: FilterType.SELECT,
        items: [
          {
            id: TransactionType.INCOME,
            name: PrintUtil.localize("Arrival", "operations"),
          },
          {
            id: TransactionType.OUTCOME,
            name: PrintUtil.localize("Sale", "operations"),
          },
          {
            id: TransactionType.TRANSFER,
            name: PrintUtil.localize("Request", "operations"),
          },
          {
            id: TransactionType.WriteOff,
            name: PrintUtil.localize("Write-off", "operations"),
          },
        ],
        value: null,
      },
      to: {
        title: PrintUtil.localize("storehouseTo", "operations"),
        type: FilterType.SELECT,
        items: this.stockStore.getStorehouseList,
        value: null,
      },
      from: {
        title: PrintUtil.localize("storehouseFrom", "operations"),
        type: FilterType.SELECT,
        items: this.stockStore.getStorehouseList,
        value: null,
      },
    });
  },
  computed: {
    filtersInput() {
      return this.filtersStore.getFilters;
    },
    filteredOperations() {
      const searchTerm = this.operationStore.getSearchTerm;
      let data = [];
      if (searchTerm.trim() === "") data = this.operationStore.getOperationList;
      else
        data = this.operationStore.getOperationList.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );

      const res = data.map((el) => ({
        id: el.id,
        operation: this.localize(this.typeMapper[el.type.id]),
        from: el.fromName,
        to: el.toName,
        status: this.localize(el.status.name),
      }));
      LoggerUtil.debug(res);
      return res;
    },
    routeIdParam() {
      return parseInt(this.route.params.id.toString());
    },
    isIdProvided() {
      return !!this.route.params.id;
    },
  },
  methods: {
    localize(key, module = "operations") {
      return PrintUtil.localize(key, module);
    },
    handleRowClick(row) {
      this.router.push({
        name: "Single operation",
        params: { id: row.id.toString() },
      });
    },
    async handleFiltersSearch(filter) {
      LoggerUtil.debug(filter);
      await this.operationStore.loadOperationList(filter);
    },
  },
};
</script>

<style scoped>
.content-col {
  width: 75vw !important;
}
</style>
