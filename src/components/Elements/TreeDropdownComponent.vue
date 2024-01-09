<template>
  <TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-20rem w-full" />
</template>

<script lang="ts">
import TreeSelect from "primevue/treeselect";

export default {
  name: 'TreeDropdownComponent',
  components: { TreeSelect },
  props: {
    nodes: {
      type: Array,
    },
    modelValue: {
      type: String
    },
  },
  data() {
    return {
      selectedValue: this.nodes,
    };
  },
  watch: {
    modelValue: {
      handler(newValue) {
        // Вызывается при изменении значения из родительского компонента
        console.log('New value from parent:', newValue);
      },
      immediate: true,
    },
  },
};
</script>