<template>
  <Calendar
    v-model="singleDate"
    showIcon
    iconDisplay="input"
    inputId="datePicker"
    :placeholder="localize('datePickerPlaceholder')"
    :minDate="curDate"
  />
</template>

<script lang="ts">
import PrintUtil from "@/utils/localization/print.util";
import Calendar from "primevue/calendar";
import { usePrimeVue } from "primevue/config";

export default {
  name: "DatePicker",
  components: {
    Calendar,
  },
  data: () => ({
    singleDate: null,
    curDate: new Date(),
  }),
  props: {
    title: String,
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
    this.$watch("singleDate", () => {
      this.handleChange();
    });
  },
  methods: {
    handleChange() {
      this.$emit("change", new Date(this.singleDate));
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
:deep(.p-inputtext) {
  min-width: 10rem;
}
</style>
