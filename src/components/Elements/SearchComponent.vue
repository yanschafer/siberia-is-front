<template>
<span class="p-input-icon-left mb-2">
  <i class="pi pi-search" />
  <InputText v-model="searchQuery" @input="handleSearch" size="small" placeholder="Search" />
</span>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import 'primevue/resources/themes/lara-light-green/theme.css'
import {MDBRow} from "mdb-vue-ui-kit/";
export default {
  name: 'SearchComponent',
  components: {InputText, MDBRow},
  props: {
    modelValue: String,
  },
  data() {
    return {
      searchQuery: this.modelValue,
    };
  },
  methods: {
    handleSearch(event) {
      this.searchQuery = event.target.value;
      this.$emit('update:modelValue', this.searchQuery);
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>
<style scoped>
.p-inputtext {
  width: 88vw;
}
</style>
