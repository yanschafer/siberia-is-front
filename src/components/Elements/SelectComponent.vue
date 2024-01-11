<template>
  <Dropdown v-model="selectedItem" @change="handleChange" :options="items" filter optionLabel="name" placeholder="Select an item" class="w-full md:w-14rem">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <div>{{ slotProps.value[labelField] }}</div>
      </div>
      <span v-else>
            {{ slotProps.placeholder }}
        </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <div>{{ slotProps.option[labelField] }}</div>
      </div>
    </template>
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