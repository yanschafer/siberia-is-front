<template>
  <span class="filtername">{{ title }}</span>
  <Calendar
    id="calendar-12h"
    v-model="dateRange"
    selectionMode="range"
    hourFormat="12"
  />
  <hr class="hr" />
</template>

<script lang="ts">
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import Calendar from "primevue/calendar";
import { useFiltersStore } from "@/stores/filters.store";

export default {
  name: "MinMaxDateFilter",
  components: {
    Calendar,
  },
  data: () => ({
    dateRange: null,
  }),
  props: {
    title: String,
  },
  emits: ["change"],
  created() {
    const filtersStore = useFiltersStore();
    filtersStore.$onAction(({ name }) => {
      if (name == "clearFilter") {
        this.dateRange = [];
        this.handleChange();
      }
    });
    this.$watch("dateRange", () => {
      this.handleChange();
    });
  },
  methods: {
    handleChange() {
      const min = this.dateRange[0];
      const max = this.dateRange[1];

      let minTimestamp = new Date(min).getTime();
      let maxTimestamp = new Date(max).getTime();

      if (Number.isNaN(minTimestamp) || minTimestamp == 0) minTimestamp = null;
      //If max selected expand it for 23:59
      if (Number.isNaN(maxTimestamp) || maxTimestamp == 0) maxTimestamp = null;
      else maxTimestamp += 23 * 60 * 60 * 1000 + 59 * 60 * 1000;

      this.$emit("change", { min: minTimestamp, max: maxTimestamp });
    },
    localize(key, module = "filters") {
      return PrintUtil.localize(key, module);
    },
  },
};
</script>

<style scoped>
.filtername {
  color: black;
}
.hr {
  border: 1px solid #ececec;
}
</style>
