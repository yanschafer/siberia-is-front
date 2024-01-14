<template>
  <span class="filtername">{{ title }}</span>
  <MultiSelectComponent
    :start-items="[]"
    :options="items"
    option-label="name"
    :placeholder="title"
    :disabled="false"
    @items-changed="handleChange"
  />
</template>

<script lang="ts">
import SelectComponent from "../SelectComponent.vue";
import MultiSelectComponent from "@/components/Elements/MultiSelectComponent.vue";
export default {
  components: { MultiSelectComponent, SelectComponent },
  name: "SelectorFilter",
  props: {
    title: String,
    items: {
      type: Array,
      default: [],
    },
  },
  emits: ["change"],
  data: () => ({}),
  methods: {
    handleChange(items) {
      this.$emit("change", items);
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
</style>
