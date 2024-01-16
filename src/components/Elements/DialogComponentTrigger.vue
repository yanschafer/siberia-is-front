<template>
  <MDBBtn outline="black" class="btn-outlined-black utility-btn" @click="handleBtn">
    {{ buttonText }}
  </MDBBtn>
</template>

<script lang="ts">
import Button from "primevue/button";
import {MDBBtn} from "mdb-vue-ui-kit";
import { useDialogStore } from "@/stores/dialog.store";
export default {
  name: "DialogComponentTrigger",
  components: {
    Button,
    MDBBtn
  },
  props: {
    buttonText: String,
    initObject: Object,
  },
  data: () => ({
    dialogStore: useDialogStore(),
  }),
  methods: {
    handleBtn() {
      this.dialogStore.show(this.initObject);
    },
  },
};
</script>

<style scoped>

</style>
