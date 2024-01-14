<template>
  <TreeSelect
    v-model="selectedValue"
    :options="filteredNodes"
    placeholder="Select Item"
    :filter="true"
    :filterBy="['label']"
    class="md:w-20rem w-full"
    @change="handleChange"
  >
    <template #header>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-search"></i>
        </span>
        <input
          v-model="searchText"
          type="text"
          class="p-inputtext"
          placeholder="Search"
        />
      </div>
    </template>
  </TreeSelect>
</template>

<script lang="ts">
import TreeSelect from "primevue/treeselect";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import OverlayPanel from 'primevue/overlaypanel';
import loggerUtil from "@/utils/logger/logger.util";
import { ref } from "vue";

export default {
  name: "TreeDropdownComponent",
  components: { TreeSelect },
  props: {
    nodes: {
      type: Array,
    },
    modelValue: {
      type: String,
    },
  },
  data() {
    return {
      selectedValue: this.nodes.label,
      searchText: "",
      expandedKeys: [],
      addNew: null,
      inputName: 'Create name for a collection'
    };
  },
  mounted() {
    this.selectedValue = { [this.modelValue]: true };
    this.addNew = this.$refs.addNew;
  },
  computed: {
    filteredNodes() {
      return this.filterNodes(this.nodes, this.searchText.toLowerCase(), true);
    },
  },
  methods: {
    toggle(event) {
      this.addNew.toggle(event);
    },
    handleChange() {
      this.$emit("update:modelValue", Object.keys(this.selectedValue)[0]);
    },
    filterNodes(nodes, searchText, parentMatch) {
      return nodes.reduce((result, node) => {
        const labelMatch = node.label.toLowerCase().includes(searchText);
        const expanded = labelMatch || parentMatch;
        const filteredChildren = this.filterNodes(
          node.children || [],
          searchText,
          labelMatch,
        );

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
<style scoped>
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: fit-content;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
}
</style>
