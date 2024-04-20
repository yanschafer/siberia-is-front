<template>
  <template v-if="!isIdProvided">
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent @start-search="handleSearchStart" />
      </MDBCol>
      <MDBCol class="content-col">
        <TableComponent
          :infoMessage="noDataMessage"
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
<script lang="ts">
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useHistoryStore } from "@/stores/history.store";
import { MDBContainer, MDBCol } from "mdb-vue-ui-kit";
import { FilterType } from "@/api/conf/app.conf";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import loggerUtil from "@/utils/logger/logger.util";
import { IconSearchOff } from "@tabler/icons-vue";
import PrintUtil from "@/utils/localization/print.util";
import { useFiltersStore } from "@/stores/filters.store";

export default {
  name: "HistoryView",
  components: {
    SearchComponent,
    TableComponent,
    MDBContainer,
    MDBCol,
    FiltersSidebarComponent,
  },
  data() {
    return {
      noDataMessage: {
        icon: "IconSearchOff",
        title: this.localize("nothingFound", "default"),
        text: this.localize("nothingFoundClarifyQuery", "default"),
      },
    };
  },
  async setup() {
    const historyStore = useHistoryStore();
    const filtersStore = useFiltersStore();
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([
      historyStore.loadHistoryList(),
      historyStore.loadEventObjectTypes(),
      historyStore.loadEventTypes(),
    ]);

    return {
      filtersStore,
      historyStore,
      route,
      router,
      loaders,
    };
  },
  created() {
    this.filtersStore.setFilters({
      author: {
        title: this.localize("Author"),
        type: FilterType.TEXT,
        value: null,
      },
      range: {
        title: this.localize("DateRange"),
        type: FilterType.DATE,
        value: { min: null, max: null },
      },
      eventTypeId: {
        title: this.localize("EventType"),
        type: FilterType.SELECT,
        items: this.historyStore.getEventTypes,
      },
      eventObjectTypeId: {
        title: this.localize("EventObjectType"),
        type: FilterType.SELECT,
        items: this.historyStore.getEventObjectTypes,
      },
    });
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));
  },
  computed: {
    filtersInput() {
      return useFiltersStore().getFilters;
    },
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
            eventType: this.localize(el.eventType),
            eventObjectType: this.localize(el.eventObjectType),
            timestamp: this.translateTimestamp(el.timestamp),
            eventObjectName: `${this.localize("Operation")} ${el.eventObjectName}`,
          };
        }
        return {
          ...el,
          eventType: this.localize(el.eventType),
          eventObjectType: this.localize(el.eventObjectType),
          timestamp: this.translateTimestamp(el.timestamp),
        };
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
    localize(key, module = "history") {
      return PrintUtil.localize(key, module);
    },
    handleRowClick(row) {
      this.router.push({
        name: "Single history",
        params: { id: row.id },
      });
    },
    translateTimestamp(timestamp) {
      if (timestamp) return timestamp.split("T")[0];
      return timestamp;
    },
    async handleSearchStart(filters) {
      const res = await this.historyStore.loadHistoryList(filters);
      res.toastIfError(this.$toast, this.$nextTick);
    },
  },
};
</script>
<style scoped>
.content-col {
  width: 80vw;
}
</style>
