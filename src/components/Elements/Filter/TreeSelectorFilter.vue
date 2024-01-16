<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <TreeDropdownComponent
        :placeholder="title"
        :nodes="items"
        v-model="value"
        :multiselect="true"
        @change="handleChange"
    />
    <hr class="hr" />
  </div>
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

<style scoped>
.hr {
  border: 1px solid #ececec;
}
.filtername {
  color: black;
}
</style>
