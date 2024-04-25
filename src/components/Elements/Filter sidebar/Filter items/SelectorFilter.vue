<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <MultiSelectComponent
      v-model="selected"
      :start-items="startItems"
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
import { useFiltersStore } from "@/stores/filters.store";
import LoggerUtil from "@/utils/logger/logger.util";
export default {
  components: { MultiSelectComponent, SelectComponent },
  name: "SelectorFilter",
  props: {
    title: String,
    items: {
      type: Array,
      default: [],
    },
    defaultValue: {
      type: Array,
      default: [],
    },
  },
  emits: ["change"],
  data: () => ({
    startItems: [],
    selected: [],
  }),
  mounted() {},
  created() {
    if (this.defaultValue) {
      LoggerUtil.debug("SET DEFAULT VALUE");
      this.startItems = [...this.defaultValue.map((el) => ({ ...el }))];
      LoggerUtil.debug(this.startItems, this.selected);
    }
    const filtersStore = useFiltersStore();
    filtersStore.$onAction(({ name }) => {
      if (name == "clearFilter") {
        this.selected = [];
        this.$emit("change", []);
      }
    });
  },
  methods: {
    handleChange(items) {
      LoggerUtil.debug("LOGGG");
      LoggerUtil.debug("items", items);
      LoggerUtil.debug("selected", this.selected);
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
