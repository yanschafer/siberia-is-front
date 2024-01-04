<template>
  <template v-if="!$route.params.id">
    <TableComponent :rows="filteredOperations" :columns="operationsStore.operationsColumns" :searchTerm="operationsStore.searchTerm" @rowClick="handleRowClick" />
  </template>
  <router-view v-if="$route.params.id !== undefined" :operationsData="operationsStore.operationsData" :currentOperation="getCurrentOperation" :id="$route.params.id" />
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import {useOperationsStore} from "@/stores/store";
import {computed} from "vue";
export default {
  name: 'OperationsView',
  components: {
    TableComponent,
    SearchComponent,
  },
  setup() {
    const operationsStore = useOperationsStore();
    const filteredOperations = computed(() => {
      const searchTerm = operationsStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return operationsStore.operationsRows;
      } else {
        return operationsStore.operationsRows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }
    });
    const getCurrentOperation = (operationId) => {
      return filteredOperations.value.find((operation) => operation.id === operationId);
    };

    return {
      operationsStore,
      filteredOperations,
      getCurrentOperation,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.operationsStore.loadOperationsData();
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'Single operation', params: { id: row.id.toString() } });
    },
  },
}
</script>

<style scoped>

</style>