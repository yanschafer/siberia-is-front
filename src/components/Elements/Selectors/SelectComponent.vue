<template>
  <Dropdown
    v-model="selectedItem"
    @change="handleChange"
    :options="items"
    :filter="filter"
    optionLabel="name"
    :placeholder="placeholder"
    class="w-full md:w-14rem"
    :virtualScrollerOptions="{ itemSize: 38 }"
  >
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import LoggerUtil from "@/utils/logger/logger.util";
export default {
  name: "SelectComponent",
  components: {
    Dropdown,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    filter: {
      type: Boolean,
    },
    labelField: {
      type: String,
      default: "name",
    },
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
    },
  },
  setup(props, { emit }) {
    let selectedItem = null;
    const handleChange = (event) => {
      if (selectedItem && selectedItem.id == event.value.id) {
        selectedItem = null;
        emit("update:modelValue", null);
      } else {
        selectedItem = event.value;
        emit("update:modelValue", event.value);
      }
    };
    return {
      selectedItem,
      handleChange,
    };
  },
  mounted() {
    this.$watch("modelValue", () => {
      this.selectedItem = this.modelValue;
    });
  },
};
</script>
<style scoped></style>
