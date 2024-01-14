<template>
  <template v-if="!isIdProvided">
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent />
      </MDBCol>
      <MDBCol class="col-auto">
        <TableComponent
            :rows="filteredOperations"
            :columns="operationStore.operationColumns"
            :searchTerm="''"
            @rowClick="handleRowClick" />
      </MDBCol>
    </MDBContainer>
   </template>
  <router-view v-if="isIdProvided" :id="routeIdParam" />
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import {useOperationStore} from "@/stores/operation.store";
import {useRoute, useRouter} from "vue-router";
import {TransactionType} from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";
import {MDBContainer, MDBCol} from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/FiltersSidebarComponent.vue";
export default {
  name: 'OperationsView',
  components: {
    FiltersSidebarComponent,
    TableComponent,
    SearchComponent,
    MDBContainer,
    MDBCol
  },
  data: () => ({
    typeMapper: {
      [TransactionType.INCOME]: "Arrival",
      [TransactionType.OUTCOME]: "Sale",
      [TransactionType.TRANSFER]: "Request"
    }
  }),
  async setup() {
    const operationStore = useOperationStore();
    const route = useRoute()
    const router = useRouter()

    await operationStore.loadOperationList()
    
    return {
      operationStore,
      route, router
    };
  },
  computed: {
    filteredOperations() {
      const searchTerm = this.operationStore.getSearchTerm;
      let data = []
      if (searchTerm.trim() === "")
        data = this.operationStore.getOperationList;
      else
      data = this.operationStore.getOperationList.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      const res = data.map(el => ({
        id: el.id,
        operation: this.typeMapper[el.type.id],
        from: el.fromName,
        to: el.toName,
        status: el.status.name
      }))
      LoggerUtil.debug(res)
      return res
    },
    routeIdParam() {
      return parseInt(this.route.params.id.toString())
    },
    isIdProvided() {
      return !!this.route.params.id
    }
  },
  methods: {
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.router.push({ name: 'Single operation', params: { id: row.id.toString() } });
    },
  },
}
</script>

<style scoped>

</style>