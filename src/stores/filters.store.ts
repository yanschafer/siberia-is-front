import { defineStore } from "pinia";
import LoggerUtil from "@/utils/logger/logger.util";

export const useFiltersStore = defineStore({
  id: "filtersStore",
  state: () => ({
    defaults: {},
    filters: {},
    needStartSearch: false,
  }),
  getters: {
    getFilters: (state) => state.filters,
  },
  actions: {
    setDefaults(defaults) {
      this.defaults = defaults;
    },
    setFilters(filters) {
      const filtersKeys = Object.keys(filters);
      this.needStartSearch = false;
      Object.keys(this.defaults).map((el) => {
        if (filtersKeys.includes(el)) {
          filters[el].value = [...this.defaults[el]];
        }
        this.needStartSearch = true;
      });
      this.defaults = {};
      this.filters = filters;
    },
    clearFilter() {
      /*

        This action is listened from FilterItems

      */
    },
  },
});
