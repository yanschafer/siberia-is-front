<template>
  <template v-if="!isIdProvided">
    <TableComponent
      :rows="filteredHistory"
      :columns="historyStore.historyColumns"
      :searchTerm="historyStore.searchTerm"
      @rowClick="handleRowClick"
    />
  </template>
  <router-view v-if="isIdProvided" :id="routeIdParam" />
</template>
<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useHistoryStore } from "@/stores/history.store";

export default {
  name: "HistoryView",
  components: { SearchComponent, TableComponent },
  async setup() {
    const historyStore = useHistoryStore();
    const route = useRoute();
    const router = useRouter();
    await historyStore.loadHistoryList();
    return {
      historyStore,
      route,
      router,
    };
  },
  computed: {
    filteredHistory() {
      const searchTerm = this.historyStore.getSearchTerm;
      let res = [];
      if (searchTerm.trim() === "") {
        res = this.historyStore.historyRows;
      } else {
        res = this.historyStore.historyRows.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );
      }
      return res.map((el) => {
        if (
          parseInt(el.eventObjectName) &&
          el.eventObjectType == "Stock event"
        ) {
          return {
            ...el,
            eventObjectName: `Operation ${el.eventObjectName}`,
          };
        }
        return el;
      });
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
      console.log("Clicked row with id:", row.id);
      this.router.push({
        name: "Single history",
        params: { id: row.id },
      });
    },
  },
};
</script>
<style scoped></style>
<script setup lang="ts"></script>
