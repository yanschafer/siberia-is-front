<template>
  <template v-if="!isIdProvided">
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent
          :filters-input="filtersInput"
          @start-search="handleSearchStart"
        />
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
import {IconSearchOff} from "@tabler/icons-vue";

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
        title: "Nothing was found",
        text: "Please clarify your search query",
      },
      filtersInput: {
        author: {
          title: "Author",
          type: FilterType.TEXT,
          value: null,
        },
        range: {
          title: "Date range",
          type: FilterType.DATE,
          value: { min: null, max: null },
        },
        eventTypeId: {
          title: "Event type",
          type: FilterType.SELECT,
          items: this.historyStore.getEventTypes,
        },
        eventObjectTypeId: {
          title: "Event object type",
          type: FilterType.SELECT,
          items: this.historyStore.getEventObjectTypes,
        },
      },
    };
  },
  async setup() {
    const historyStore = useHistoryStore();
    const route = useRoute();
    const router = useRouter();

    return {
      historyStore,
      route,
      router,
      loadListRes: await historyStore.loadHistoryList(),
      loadEventObjectsRes: await historyStore.loadEventObjectTypes(),
      loadEventTypesRes: await historyStore.loadEventTypes(),
    };
  },
  created() {
    this.loadListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadEventTypesRes.toastIfError(this.$toast, this.$nextTick);
    this.loadEventObjectsRes.toastIfError(this.$toast, this.$nextTick);
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
