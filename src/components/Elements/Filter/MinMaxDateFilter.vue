<template>
  <span class="filtername">{{ title }}</span>
  <span class="filtername">{{ localize("min") }}</span>
  <input type="datetime-local" v-model="min" @change="handleChange" />
  <span class="filtername">{{ localize("max") }}</span>
  <input type="datetime-local" v-model="max" @change="handleChange" />
  <hr class="hr" />
</template>

<script lang="ts">
import loggerUtil from "@/utils/logger/logger.util.js";
import PrintUtil from "@/utils/localization/print.util";

export default {
  name: "MinMaxDateFilter",
  data: () => ({
    min: null,
    max: null,
  }),
  props: {
    title: String,
    clear: Boolean,
  },
  emits: ["change"],
  mounted() {
    this.$watch("clear", () => {
      this.min = null;
      this.max = null;
    });
  },
  methods: {
    localize(key, module = "filters") {
      return PrintUtil.localize(key, module);
    },
    handleChange() {
      let minTimestamp = new Date(this.min).getTime();
      let maxTimestamp = new Date(this.max).getTime();

      if (Number.isNaN(minTimestamp) || minTimestamp == 0) minTimestamp = null;
      if (Number.isNaN(maxTimestamp) || maxTimestamp == 0) maxTimestamp = null;

      this.$emit("change", { min: minTimestamp, max: maxTimestamp });
    },
  },
};
</script>

<style scoped>
.filtername {
  color: black;
}
.hr {
  border: 1px solid #ececec;
}
</style>
