<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <MultiSelectComponent
      v-model="selected"
      :start-items="[]"
      :options="items"
      option-label="name"
      :placeholder="title"
      :disabled="false"
      @items-changed="handleChange"
    />
    <hr class="hr" />
  </div>
</template>

<script lang="ts">
import SelectComponent from "../../Selectors/SelectComponent.vue";
import MultiSelectComponent from "@/components/Elements/Selectors/MultiSelectComponent.vue";
export default {
  components: { MultiSelectComponent, SelectComponent },
  name: "SelectorFilter",
  props: {
    title: String,
    items: {
      type: Array,
      default: [],
    },
    clear: Boolean,
  },
  emits: ["change"],
  data: () => ({
    selected: [],
  }),
  mounter() {
    this.$watch("clear", () => {
      this.selected = [];
    });
  },
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
.hr {
  border: 1px solid #ececec;
}
</style>
