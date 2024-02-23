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
    <template #option="slotProps">
      <div class="selector-option align-items-center justify-content-between">
        <div>{{ slotProps.option.name }}</div>
        <Badge v-if="showBadge" value="SKU" class="ml-2"></Badge>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from "primevue/dropdown";

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
    showBadge: {
      type: Boolean,
      default: false,
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
<style scoped>
.selector-option {
  display: flex;
}
</style>
