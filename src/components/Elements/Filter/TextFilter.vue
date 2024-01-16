<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <InputText @change="handleOnchange" type="text" v-model="value" />
    <hr class="hr">
  </div>
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
.hr {
  border: 1px solid #ececec;
}
</style>
