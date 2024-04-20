<template>
  <MultiSelect
    v-model="items"
    :options="options"
    filter
    :optionLabel="optionLabel"
    :placeholder="placeholder"
    class="w-full md:w-20rem"
    @change="handleChange"
    :disabled="disabled"
    :selectAll="selectAll"
    @selectall-change="handleSelectAll($event)"
    :virtualScrollerOptions="{ itemSize: 44 }"
  />
</template>
<script lang="ts">
import MultiSelect from "primevue/multiselect";
import LoggerUtil from "@/utils/logger/logger.util";
export default {
  components: { MultiSelect },
  data: () => ({
    lastItems: [],
    items: [],
    selectAll: false,
  }),
  props: {
    startItems: Array,
    options: Array,
    optionLabel: String,
    placeholder: String,
    disabled: Boolean,
    modelValue: Array,
  },
  emits: ["itemsAdded", "itemsRemoved", "itemsChanged"],
  created() {
    LoggerUtil.debug("START ITEMS", this.startItems);
    if (this.startItems)
      this.selectAll = this.options?.length == this.startItems?.length;
    this.items = [...this.startItems];
    this.updateLastItems();
  },
  mounted() {
    this.$watch("modelValue", () => {
      this.items = this.modelValue || [];
    });
  },
  methods: {
    listContains(list, item) {
      return list.filter((el) => el.id == item).length > 0;
    },
    updateLastItems() {
      this.items.forEach((el) => {
        this.lastItems[el.id] = true;
      });
    },
    getAddedItems() {
      const items = [];
      this.items.forEach((el) => {
        if (!this.lastItems[el.id]) {
          this.lastItems[el.id] = true;
          items.push(el.id);
          return true;
        }
        return false;
      });
      return items;
    },
    getRemovedItems() {
      const items = { ...this.lastItems };
      this.lastItems = {};
      this.items.forEach((el) => {
        this.lastItems[el.id] = true;
        delete items[el.id];
      });
      return Object.keys(items);
    },
    handleSelectAll(event) {
      this.selectAll = event.checked;
      LoggerUtil.debug("Handle select all");
      if (event.checked) {
        this.items = [];
        const added = [];
        this.options.forEach((el) => {
          if (!this.lastItems[el.id]) {
            added.push(el.id);
            this.lastItems[el.id] = true;
          }
          this.items.push(el);
        });
        this.$emit("itemsAdded", added);
        LoggerUtil.debug("For each stopped", added, this.lastItems);
      } else {
        if (this.items.length == 0) return;
        const removedItems = this.items.map((el) => el.id);
        this.items = [];
        this.lastItems = {};
        this.$emit("itemsRemoved", removedItems);
      }
      this.$emit("itemsChanged", this.items);
    },
    async handleChange() {
      if (Object.keys(this.lastItems).length > this.items.length) {
        const removedItems = this.getRemovedItems();
        if (removedItems.length > 0) {
          this.$emit("itemsRemoved", removedItems);
        }
      } else {
        const addedItems = this.getAddedItems();
        if (addedItems.length > 0) {
          this.$emit("itemsAdded", addedItems);
        }
      }
      LoggerUtil.debug(this.items, this.lastItems);
      this.$emit("itemsChanged", this.items);
    },
  },
};
</script>
<style></style>
