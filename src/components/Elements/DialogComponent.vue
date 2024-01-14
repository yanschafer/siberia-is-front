<template>
  <Dialog
    v-if="visible"
    v-model:visible="isVisible"
    modal
    :header="header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @change="handleDialogClose"
  >
    <MDBContainer class="d-flex flex-column">
      <span>{{ inputName }}</span>
      <InputText :placeholder="inputName" v-model="inputValue" />
      <template v-if="selectorVisible">
        <span>{{ selectorName }}</span>
        <TreeDropdownComponent
          :placeholder="selectorName"
          class="animate__animated animate__flipInX animate__faster"
          :nodes="selectorItems"
          v-model="selectedDropdownItem"
        />
      </template>
      <MDBRow>
        <Button @click="save">{{ saveButtonText }}</Button>
      </MDBRow>
    </MDBContainer>
  </Dialog>
</template>
<script lang="ts">
import TreeDropdownComponent from "@/components/Elements/TreeDropdownComponent.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import { useCreationDialogStore } from "@/stores/creation-dialog.store";
import loggerUtil from "@/utils/logger/logger.util";

export default {
  name: "DialogComponent",
  components: {
    MDBContainer,
    MDBRow,
    TreeDropdownComponent,
    Button,
    InputText,
    Dialog,
  },
  setup() {
    const createDialogStore = useCreationDialogStore();

    return {
      createDialogStore,
    };
  },
  data() {
    return {
      inputValue: "",
      selectedDropdownItem: null,
      saveButtonText: "Save",
      isVisible: false,
    };
  },
  created() {
    this.$watch("isVisible", () => {
      if (!this.isVisible) this.createDialogStore.cancelAndClose();
    });
  },
  methods: {
    handleDialogClose() {
      loggerUtil.debug(this.isVisible);
    },
    async save() {
      this.createDialogStore.value = {
        name: this.inputValue == "" ? null : this.inputValue,
        parent: this.selectedDropdownItem,
      };
      const res = await this.createDialogStore.saveAndClose();
      if (!res.success) {
        loggerUtil.debug("error", res.getError());
        //TODO: Show errors
      } else {
        this.inputValue = "";
        this.selectedDropdownItem = null;
      }
    },
  },
  computed: {
    visible() {
      this.isVisible = this.createDialogStore.getIsVisible;
      return this.createDialogStore.getIsVisible;
    },
    header() {
      return this.createDialogStore.dialogData.header;
    },
    inputName() {
      return this.createDialogStore.dialogData.inputName;
    },
    selectorVisible() {
      return this.createDialogStore.dialogData.showSelect;
    },
    selectorName() {
      return this.createDialogStore.dialogData.selectName;
    },
    selectorItems() {
      return this.createDialogStore.dialogData.selectItems;
    },
  },
};
</script>
<style scoped></style>
