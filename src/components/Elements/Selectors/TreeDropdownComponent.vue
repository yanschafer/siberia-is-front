<template>
  <TreeSelect
    v-model="selectedValue"
    :options="filteredNodes"
    placeholder="Select Item"
    :filter="true"
    :filterBy="['label']"
    class="md:w-20rem w-full"
    :selectionMode="selectionMode"
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
          :placeholder="localize('search')"
        />
      </div>
    </template>
  </TreeSelect>
</template>

<script lang="ts">
import TreeSelect from "primevue/treeselect";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
import loggerUtil from "@/utils/logger/logger.util";
import { ref } from "vue";
import { useProductsStore } from "@/stores/products.store";
import PrintUtil from "@/utils/localization/print.util";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: "TreeDropdownComponent",
  components: { TreeSelect },
  props: {
    nodes: {
      type: Array,
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      selectedValue: this.nodes.label,
      searchText: "",
      expandedKeys: [],
      addNew: null,
      inputName: this.localize("createNameForACollection"),
    };
  },
  mounted() {
    if (
      this.multiselect &&
      this.modelValue &&
      typeof this.modelValue == "object" &&
      this.modelValue.length > 0
    ) {
      this.selectedValue = {};
      const values = this.modelValue.forEach((el) => {
        this.selectedValue[el.id] = true;
      });
      LoggerUtil.debug(this.selectedValue);
    } else if (this.modelValue) {
      this.selectedValue = { [this.modelValue]: true };
    }
    this.addNew = this.$refs.addNew;
    this.$watch("modelValue", () => {
      loggerUtil.debug(this.modelValue);
      if (this.modelValue == null) {
        this.selectedValue = {};
        return;
      }
      if (typeof this.modelValue == "object" && this.modelValue.length == 0) {
        this.selectedValue = {};
        return;
      }
      if (!Number.isNaN(parseInt(String(this.modelValue)))) {
        this.selectedValue = { [this.modelValue]: true };
        return;
      }
      if (this.modelValue[0].id) return;
      loggerUtil.debug("Model value", this.modelValue);
      this.selectedValue = { [this.modelValue]: true };
      loggerUtil.debug("Selected value", this.selectedValue);
    });
  },
  computed: {
    filteredNodes() {
      return this.filterNodes(this.nodes, this.searchText.toLowerCase(), true);
    },
    selectionMode() {
      loggerUtil.debug(this.multiselect ? "multiple" : "single");
      return this.multiselect ? "multiple" : "single";
    },
  },
  methods: {
    localize(key, module = "components") {
      return PrintUtil.localize(key, module);
    },
    toggle(event) {
      this.addNew.toggle(event);
    },
    handleChange() {
      loggerUtil.debug("From handle", this.selectedValue);
      this.$emit(
        "update:modelValue",
        this.multiselect
          ? Object.keys(this.selectedValue)
              .filter((el) => el != "" && !Number.isNaN(parseInt(el)))
              .map((el) => ({
                id: parseInt(el),
              }))
          : Object.keys(this.selectedValue)[0],
      );
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
