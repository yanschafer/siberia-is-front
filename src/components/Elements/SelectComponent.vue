<template>
  <Dropdown v-model="selectedItem" :options="items" filter optionLabel="name" placeholder="Select an item" class="w-full md:w-14rem">
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

</style>