<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <MDBRow class="d-flex flex-row flex-nowrap">
      <MDBCol class="col-auto d-flex flex-column">
        <span class="filtername">{{ localize("min") }}</span>
        <InputText
          type="number"
          style="width: 4rem !important"
          v-model.number="min"
          inputId="withoutgrouping"
          :useGrouping="false"
          @change="handleChange"
        />
      </MDBCol>
      <MDBCol class="col-auto d-flex flex-column">
        <span class="filtername">{{ localize("max") }}</span>
        <InputText
          type="number"
          style="width: 4rem !important"
          v-model.number="max"
          inputId="withoutgrouping"
          :useGrouping="false"
          @change="handleChange"
        />
      </MDBCol>
    </MDBRow>
    <hr class="hr" />
  </div>
</template>

<script lang="ts">
import { MDBRow, MDBCol } from "mdb-vue-ui-kit";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import { useFiltersStore } from "@/stores/filters.store";

export default {
  components: { MDBCol, MDBRow, InputNumber, InputText },
  name: "MinMaxFilter",
  props: {
    title: String,
    defaultValue: {
      type: Object,
      default: {},
    },
  },
  emits: ["change"],
  data: () => ({
    min: null,
    max: null,
  }),
  created() {
    if (Object.keys(this.defaultValue).includes("min")) {
      this.min = this.defaultValue.min;
    }
    if (Object.keys(this.defaultValue).includes("max")) {
      this.max = this.defaultValue.max;
    }
    const filtersStore = useFiltersStore();
    filtersStore.$onAction(({ name }) => {
      if (name == "clearFilter") {
        this.min = this.max = null;
        this.handleChange();
      }
    });
  },
  methods: {
    localize(key, module = "filters") {
      return PrintUtil.localize(key, module);
    },
    handleChange() {
      this.$emit("change", { min: this.min, max: this.max });
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0;
}
.filtername {
  color: black;
}
:deep(.p-inputnumber-input) {
  width: 4rem;
}
.hr {
  border: 1px solid #ececec;
}
</style>
