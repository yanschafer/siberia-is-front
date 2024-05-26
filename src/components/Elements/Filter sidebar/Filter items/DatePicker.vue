<template>
  <Calendar v-model="singleDate" showIcon iconDisplay="input" inputId="datePicker" :placeholder="localize('datePickerPlaceholder')" />
</template>

<script lang="ts">
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import Calendar from "primevue/calendar";
import { useFiltersStore } from "@/stores/filters.store";
import LoggerUtil from "@/utils/logger/logger.util";
import { usePrimeVue } from "primevue/config";

export default {
  name: "DatePicker",
  components: {
    Calendar,
  },
  data: () => ({
    singleDate: null,
  }),
  props: {
    title: String,
    defaultValue: {
      type: Object,
      default: {},
    },
  },
  emits: ["change"],
  setup() {
    const primeVue = usePrimeVue();
    primeVue.config.locale.dayNames = PrintUtil.localize("dayNames", "filters");
    primeVue.config.locale.dayNamesShort = PrintUtil.localize(
      "dayNamesShort",
      "filters",
    );
    primeVue.config.locale.dayNamesMin = PrintUtil.localize(
      "dayNamesMin",
      "filters",
    );
    primeVue.config.locale.monthNames = PrintUtil.localize(
      "monthNames",
      "filters",
    );
    primeVue.config.locale.monthNamesShort = PrintUtil.localize(
      "monthNamesShort",
      "filters",
    );
    primeVue.config.locale.chooseYear = PrintUtil.localize(
      "chooseYear",
      "filters",
    );
    primeVue.config.locale.chooseMonth = PrintUtil.localize(
      "chooseMonth",
      "filters",
    );
    primeVue.config.locale.chooseDate = PrintUtil.localize(
      "chooseDate",
      "filters",
    );
  },
  created() {
    this.dateRange = [];
    if (
      Object.keys(this.defaultValue).includes("min") &&
      this.defaultValue.min != null
    ) {
      this.dateRange.push(new Date(this.defaultValue.min));
    }
    if (
      Object.keys(this.defaultValue).includes("max") &&
      this.defaultValue.max != null
    ) {
      this.dateRange.push(new Date(this.defaultValue.max));
    }
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
    localize(key, module = "datePickerComponent") {
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
