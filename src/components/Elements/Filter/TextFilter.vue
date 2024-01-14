<template>
  <span class="filtername">{{ title }}</span>
  <InputText @change="handleOnchange" type="text" v-model="value" />
</template>

<script lang="ts">
import InputText from "primevue/inputtext";

export default {
  components: { InputText },
  name: "TextFilter",
  props: {
    title: String,
  },
  emits: ["change"],
  data: () => ({
    value: "",
  }),
  methods: {
    handleOnchange() {
      this.$emit("change", this.value);
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
</style>
