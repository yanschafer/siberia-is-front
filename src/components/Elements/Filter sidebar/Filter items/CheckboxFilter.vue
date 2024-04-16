<template>
  <div class="container d-flex flex-column m-0 p-1">
    <div class="flex-row">
      <span class="filtername">{{ title }}:</span>
      <Checkbox @change="handleOnChange" :binary="true" v-model="value" />
    </div>
    <hr class="hr" />
  </div>
</template>

<script lang="ts">
import Checkbox from "primevue/checkbox";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: "CheckboxFilter",
  components: {
    Checkbox,
  },
  props: {
    defaultValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    value: false,
  }),
  created() {
    LoggerUtil.debug(this.defaultValue);
    this.value = this.defaultValue;
  },
  emits: ["change"],
  methods: {
    handleOnChange() {
      LoggerUtil.debug(this.value);
      this.$emit("change", this.value);
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
  margin-right: 0.3rem;
}
:deep(.p-inputnumber-input) {
  width: 4rem;
}
.hr {
  border: 1px solid #ececec;
}
</style>
