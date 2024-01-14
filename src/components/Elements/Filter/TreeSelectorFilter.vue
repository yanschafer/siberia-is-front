<template>
  <span class="filtername">{{ title }}</span>
  <TreeDropdownComponent
    :placeholder="title"
    class="animate__animated animate__flipInX animate__faster"
    :nodes="items"
    v-model="value"
    :multiselect="true"
    @change="handleChange"
  />
</template>

<script lang="ts">
import TreeDropdownComponent from "@/components/Elements/TreeDropdownComponent.vue";
import loggerUtil from "@/utils/logger/logger.util";

export default {
  name: "TreeSelectorFilter",
  components: { TreeDropdownComponent },
  props: {
    title: String,
    items: Array,
  },
  emits: ["change"],
  data: () => ({
    value: [],
  }),
  methods: {
    handleChange() {
      loggerUtil.debug(this.value);
      this.$emit("change", this.value);
    },
  },
};
</script>

<style scoped></style>
