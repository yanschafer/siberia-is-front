<template>
  <span class="p-input-icon-left mb-2">
    <i class="pi pi-search" />
    <InputText
      v-model="searchQuery"
      @input="handleSearch"
      size="small"
      :placeholder="localize('search')"
    />
  </span>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import "primevue/resources/themes/lara-light-green/theme.css";
import { MDBRow } from "mdb-vue-ui-kit/";
import PrintUtil from "@/utils/localization/print.util";
export default {
  name: "SearchComponent",
  components: { InputText, MDBRow },
  props: {
    modelValue: String,
  },
  data() {
    return {
      searchQuery: this.modelValue,
    };
  },
  methods: {
    localize(key, module = "components") {
      return PrintUtil.localize(key, module);
    },
    handleSearch(event) {
      this.searchQuery = event.target.value;
      this.$emit("update:modelValue", this.searchQuery);
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>
<style scoped>
.p-inputtext {
  width: 100%;
}
</style>
