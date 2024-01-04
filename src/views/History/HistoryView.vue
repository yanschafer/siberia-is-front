<template>
  <template v-if="!$route.params.id">
    <TableComponent :rows="filteredHistory" :columns="historyStore.historyColumns" :searchTerm="historyStore.searchTerm" @rowClick="handleRowClick" />
  </template>
  <router-view v-if="$route.params.id !== undefined" :historyData="historyStore.historyData" :currentRole="getCurrentHistory" :id="$route.params.id" />
</template>
<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import {useHistoryStore} from "@/stores/store";
import {computed} from "vue";

export default {
  name: "HistoryView",
  components: {SearchComponent, TableComponent},
  setup() {
    const historyStore = useHistoryStore();
    const filteredHistory = computed(() => {
      const searchTerm = historyStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return historyStore.historyRows;
      } else {
        return historyStore.historyRows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }
    });
    const getCurrentHistory = (historyId) => {
      return filteredHistory.value.find((history) => history.id === historyId);
    };

    return {
      historyStore,
      filteredHistory,
      getCurrentHistory,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.historyStore.loadHistoryData();
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'Single history', params: { id: row.id.toString() } });
    },
  },
}
</script>
<style scoped>

</style>
<script setup lang="ts">
</script>