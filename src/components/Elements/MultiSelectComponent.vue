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
  />
</template>
<script lang="ts">
import MultiSelect from "primevue/multiselect";
export default {
  components: { MultiSelect },
  data: () => ({
    lastItems: [],
    items: [],
  }),
  props: {
    startItems: Array,
    options: Array,
    optionLabel: String,
    placeholder: String,
    disabled: Boolean,
  },
  emits: ["itemsAdded", "itemsRemoved"],
  created() {
    this.items = [...this.startItems];
    this.lastItems = [...this.startItems];
  },
  methods: {
    listContains(list, item) {
      return list.filter((el) => el.id == item).length > 0;
    },
    async handleChange() {
      if (this.lastItems.length > this.items.length) {
        const removedItems = this.lastItems
          .filter((el) => !this.listContains(this.items, el.id))
          .map((el) => el.id);
        if (removedItems.length > 0) {
          this.$emit("itemsRemoved", removedItems);
        }
      } else {
        const addedItems = this.items
          .filter((el) => !this.listContains(this.lastItems, el.id))
          .map((el) => el.id);
        if (addedItems.length > 0) {
          this.$emit("itemsAdded", addedItems);
        }
      }
      this.lastItems = [...this.items];
    },
  },
};
</script>
<style></style>
