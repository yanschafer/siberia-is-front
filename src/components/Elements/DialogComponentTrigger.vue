<template>
  <Button class="btn-outlined-black utility-btn" @click="handleBtn">
    {{ buttonText }}
  </Button>
</template>

<script lang="ts">
import Button from "primevue/button";
import { useCreationDialogStore } from "@/stores/creation-dialog.store.js";
export default {
  name: "DialogComponentTrigger",
  components: {
    Button,
  },
  props: {
    buttonText: String,
    initObject: Object,
  },
  data: () => ({
    dialogStore: useCreationDialogStore(),
  }),
  methods: {
    handleBtn() {
      this.dialogStore.show(this.initObject);
    },
  },
};
</script>

<style scoped></style>
