<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <InputText @change="handleOnchange" type="text" v-model="value" />
    <hr class="hr" />
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import loggerUtil from "@/utils/logger/logger.util";
import { useFiltersStore } from "@/stores/filters.store";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  components: { InputText },
  name: "TextFilter",
  props: {
    title: String,
    defaultValue: {
      default: "",
      type: String,
    },
  },
  emits: ["change"],
  data: () => ({
    value: null,
  }),
  methods: {
    handleOnchange() {
      this.$emit("change", this.value);
    },
  },
  created() {
    this.value = this.defaultValue;
    const filtersStore = useFiltersStore();
    filtersStore.$onAction(({ name }) => {
      if (name == "clearFilter") {
        this.value = null;
        this.handleOnchange();
      }
    });
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
