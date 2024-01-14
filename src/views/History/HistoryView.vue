<template>
  <template v-if="!isIdProvided">
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent />
      </MDBCol>
      <MDBCol class="col-auto">
        <TableComponent
            :rows="filteredHistory"
            :columns="historyStore.historyColumns"
            :searchTerm="historyStore.searchTerm"
            @rowClick="handleRowClick"
        />
      </MDBCol>
    </MDBContainer>
  </template>
  <router-view v-if="isIdProvided" :id="routeIdParam" />
</template>
<script>
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useHistoryStore } from "@/stores/history.store";
import {MDBContainer, MDBCol} from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/FiltersSidebarComponent.vue";

export default {
  name: "HistoryView",
  components: { SearchComponent, TableComponent, MDBContainer, MDBCol, FiltersSidebarComponent },
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
