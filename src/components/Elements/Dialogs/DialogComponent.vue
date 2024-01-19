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
    <MDBContainer class="d-flex gap-2 flex-column">
      <template v-if="showInput">
        <span>{{ inputName }}</span>
        <InputText
          :placeholder="inputName"
          v-model="inputValue"
          :class="{ 'p-invalid': inputError }"
          @input="inputError = false"
        />
      </template>
      <template v-if="showCheckbox">
        <p class="text-center">
          {{ localize("message", "components") }}
        </p>
        <MDBBtn outline="black" @click="checkboxValue = !checkboxValue">
          {{ checkboxValues[checkboxValue] }}
        </MDBBtn>
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
      <MDBRow
        class="btn-row d-flex flex-row align-items-center justify-content-center"
      >
        <MDBBtn class="btn-black save-btn" @click="save">{{
          saveButtonText
        }}</MDBBtn>
      </MDBRow>
    </MDBContainer>
  </Dialog>
</template>
<script lang="ts">
import TreeDropdownComponent from "@/components/Elements/Selectors/TreeDropdownComponent.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-vue-ui-kit";
import { useDialogStore } from "@/stores/dialog.store";
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";

export default {
  name: "DialogComponent",
  components: {
    MDBContainer,
    MDBRow,
    TreeDropdownComponent,
    Button,
    MDBBtn,
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
      saveButtonText: this.localize("saveCapslock", "default"),
      isVisible: false,
      checkboxValue: false,
      inputError: false,
    };
  },
  created() {
    this.$watch("checkboxValue", () => {
      loggerUtil.debug(this.checkboxValue);
    });
    this.$watch("isVisible", () => {
      this.inputError = false;
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
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
    handleDialogClose() {
      loggerUtil.debug(this.isVisible);
    },
    async save() {
      this.dialogStore.value = {
        name: this.inputValue == "" ? null : this.inputValue,
        parent: this.selectedDropdownItem,
        checkbox: this.checkboxValue,
      };

      loggerUtil.debug(
        this.inputError,
        this.selectedDropdownItem,
        this.checkboxValue,
      );

      if (this.showInput && this.inputValue == "") {
        this.$toast.add({
          severity: "error",
          summary: this.localize("validateError", "components"),
          detail: this.localize("checkDataProvided", "components"),
          life: 3000,
        });
        this.inputError = true;
        return;
      }

      const res = await this.dialogStore.saveAndClose(
        this.$toast,
        this.$nextTick,
      );
      if (!res) return;
      if (res.success) {
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
<style scoped>
.save-btn {
  width: 90%;
}
.btn-row {
  width: 105%;
  margin-top: 2rem;
}
</style>
