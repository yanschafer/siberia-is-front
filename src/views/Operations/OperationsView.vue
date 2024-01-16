<template>
  <template v-if="!isIdProvided">
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent
          :filters-input="filtersInput"
          @start-search="handleFiltersSearch"
        />
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
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useOperationStore } from "@/stores/operation.store";
import { useRoute, useRouter } from "vue-router";
import { FilterType, TransactionType } from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";
import { MDBContainer, MDBCol } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter/FiltersSidebarComponent.vue";
import { useStorehousesStore } from "@/stores/storehouse.store";
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
      },
      filtersInput: {
        status: {
          title: "Operation status",
          type: FilterType.SELECT,
          items: this.operationStore.getStatusList,
        },
        type: {
          title: "Operation type",
          type: FilterType.SELECT,
          items: [
            { id: TransactionType.INCOME, name: "Arrival" },
            { id: TransactionType.OUTCOME, name: "Sale" },
            { id: TransactionType.TRANSFER, name: "Request" },
          ],
        },
        to: {
          title: "Stocks TO",
          type: FilterType.SELECT,
          items: this.stockStore.getStorehouseList,
        },
        from: {
          title: "Stocks FROM",
          type: FilterType.SELECT,
          items: this.stockStore.getStorehouseList,
        },
      },
    };
  },
  async setup() {
    const operationStore = useOperationStore();
    const stockStore = useStorehousesStore();
    const route = useRoute();
    const router = useRouter();

    return {
      operationStore,
      stockStore,
      route,
      router,
      loadOperationsRes: await operationStore.loadOperationList(),
      loadStocksRes: await stockStore.loadStorehouseList(),
      loadStatusesRes: await operationStore.loadStatusesList(),
    };
  },
  created() {
    this.loadOperationsRes.toastIfError(this.$toast, this.$nextTick);
    this.loadStocksRes.toastIfError(this.$toast, this.$nextTick);
    this.loadStatusesRes.toastIfError(this.$toast, this.$nextTick);
  },
  computed: {
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
        operation: this.typeMapper[el.type.id],
        from: el.fromName,
        to: el.toName,
        status: el.status.name,
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
    handleRowClick(row) {
      this.router.push({
        name: "Single operation",
        params: { id: row.id.toString() },
      });
    },
    async handleFiltersSearch(filter) {
      await this.operationStore.loadOperationList(filter);
    },
  },
};
</script>

<style scoped>
.content-col {
  width: 75vw!important;
}
</style>
