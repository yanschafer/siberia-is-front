<template>
  <div class="container d-flex flex-column m-0 p-1">
    <span class="filtername">{{ title }}</span>
    <InputText @change="handleOnchange" type="text" v-model="value" />
    <hr class="hr" />
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import loggerUtil from "@/utils/logger/logger.util";

export default {
  components: { InputText },
  name: "TextFilter",
  props: {
    title: String,
    modelValue: {
      required: true,
    },
  },
  emits: ["change"],
  data: () => ({
    value: "",
  }),
  setup(props, { emit }) {
    const handleOnchange = (event) => {
      emit("update:modelValue", event.value);
      emit("change", event.value);
    };

    return { handleOnchange };
  },
  mounter() {
    this.$watch("modelValue", () => {
      loggerUtil.debug("model value changed");
      this.value = this.modelValue;
    });
  },
  methods: {},
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
