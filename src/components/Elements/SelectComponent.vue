<template>
  <Dropdown v-model="selectedItem" @change="handleChange" :options="items" filter optionLabel="name" :placeholder="placeholder" class="w-full md:w-14rem">
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from "primevue/dropdown";
import { ref } from 'vue';
import LoggerUtil from "@/utils/logger/logger.util";
export default {
  name: 'SelectComponent',
  components: {
    Dropdown
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    labelField: {
      type: String,
      default: 'name',
    },
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
    }
  },
  setup(props, { emit }) {
    const selectedItem = ref(props.modelValue);
    const handleChange = (event) => {
      LoggerUtil.debug(event)
      selectedItem.value = event.value;
      emit('update:modelValue', event.value);
    };
    return {
      selectedItem,
      handleChange,
    };
  },
}
</script>
<style scoped>
/deep/ .p-dropdown-filter .p-inputtext {
  padding: 0 !important;
}
</style>