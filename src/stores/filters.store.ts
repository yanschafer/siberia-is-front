import { defineStore } from "pinia";
import LoggerUtil from "@/utils/logger/logger.util";

export const useFiltersStore = defineStore({
  id: "filtersStore",
  state: () => ({
    filters: {},
  }),
  getters: {
    getFilters: (state) => state.filters,
  },
  actions: {
    setFilters(filters) {
      LoggerUtil.debug("FILTERS WAS UPDATED", filters);
      this.filters = filters;
    },
    clearFilter() {},
  },
});
