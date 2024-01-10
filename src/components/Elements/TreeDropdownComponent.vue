<template>
  <TreeSelect
      v-model="selectedValue"
      :options="filteredNodes"
      placeholder="Select Item"
      :filter="true"
      :filterBy="['label']"
      class="md:w-20rem w-full"
  >
    <template #header>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-search"></i>
        </span>
        <input v-model="searchText" type="text" class="p-inputtext" placeholder="Search">
      </div>
    </template>
  </TreeSelect>
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
      selectedValue: this.nodes.label,
      searchText: '',
      expandedKeys: [],
    };
  },
  computed: {
    filteredNodes() {
      return this.filterNodes(this.nodes, this.searchText.toLowerCase(), true);
    },
  },
  methods: {
    filterNodes(nodes, searchText, parentMatch) {
      return nodes.reduce((result, node) => {
        const labelMatch = node.label.toLowerCase().includes(searchText);
        const expanded = labelMatch || parentMatch;
        const filteredChildren = this.filterNodes(node.children || [], searchText, labelMatch);

        if (labelMatch) {
          result.push({ ...node, children: filteredChildren, expanded });
        } else if (filteredChildren.length > 0) {
          result.push({ ...node, children: filteredChildren, expanded });
        }

        return result;
      }, []);
    },
  },
};
</script>