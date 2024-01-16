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
      <template v-if="showInput">
        <span>{{ inputName }}</span>
        <InputText :placeholder="inputName" v-model="inputValue" />
      </template>
      <template v-if="showCheckbox">
        <button @click="checkboxValue = !checkboxValue">
          {{ checkboxValues[checkboxValue] }}
        </button>
      </template>
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
import { useDialogStore } from "@/stores/dialog.store";
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
    const dialogStore = useDialogStore();

    return {
      dialogStore,
    };
  },
  data() {
    return {
      inputValue: "",
      selectedDropdownItem: null,
      saveButtonText: "Save",
      isVisible: false,
      checkboxValue: false,
    };
  },
  created() {
    this.$watch("checkboxValue", () => {
      loggerUtil.debug(this.checkboxValue);
    });
    this.$watch("isVisible", () => {
      if (this.dialogStore.update) {
        this.inputValue = this.dialogStore.update.input;
        this.selectedDropdownItem = this.dialogStore.update.selected;
        this.checkboxValue = false;
      }
      if (this.dialogStore.remove) {
        this.inputValue = this.dialogStore.remove.input;
        this.checkboxValue = false;
      }
      if (!this.isVisible) this.dialogStore.cancelAndClose();
    });
  },
  methods: {
    handleDialogClose() {
      loggerUtil.debug(this.isVisible);
    },
    async save() {
      this.dialogStore.value = {
        name: this.inputValue == "" ? null : this.inputValue,
        parent: this.selectedDropdownItem,
        checkbox: this.checkboxValue,
      };
      const res = await this.dialogStore.saveAndClose();
      if (!res) return;
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
      this.isVisible = this.dialogStore.getIsVisible;
      return this.dialogStore.getIsVisible;
    },
    header() {
      return this.dialogStore.dialogData.header;
    },
    showInput() {
      return this.dialogStore.dialogData.showInput;
    },
    inputName() {
      return this.dialogStore.dialogData.inputName;
    },
    selectorVisible() {
      const showSelect = this.dialogStore.dialogData.showSelect;
      if (!this.showCheckbox) return showSelect;
      else return this.checkboxValue && showSelect;
    },
    selectorName() {
      return this.dialogStore.dialogData.selectName;
    },
    selectorItems() {
      return this.dialogStore.dialogData.selectItems;
    },
    showCheckbox() {
      return this.dialogStore.dialogData.showCheckbox;
    },
    checkboxValues() {
      return this.dialogStore.dialogData.checkboxValues;
    },
  },
};
</script>
<style scoped></style>
