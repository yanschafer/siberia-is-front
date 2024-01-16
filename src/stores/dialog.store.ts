import { defineStore } from "pinia";
import loggerUtil from "@/utils/logger/logger.util";
import ApiResponseDto from "@/api/dto/api-response.dto";

const defaultValues = {
  visible: false,
  header: "",
  showSelect: false,
  selectItems: [],
  inputName: "",
  selectName: "",
  model: {},
  methodOnSave: (value) => {},
  methodOnClose: () => {},
  value: {},
  update: null,
  transformMethod: (state) => ({}),
  showCheckbox: false,
  checkboxValues: {},
  remove: null,
  showInput: true,
  toastSuccessText: "",
  toastErrorText: "",
};

export const useDialogStore = defineStore({
  id: "CreationDialog",
  state: () => ({
    visible: false,
    header: "",
    showSelect: false,
    selectItems: [],
    inputName: "",
    selectName: "",
    model: {},
    methodOnSave: (value) => {},
    methodOnClose: () => {},
    value: {},
    update: null,
    transformMethod: (state) => ({}),
    remove: null,
    showCheckbox: false,
    checkboxValues: {},
    showInput: true,
    toastSuccessText: "",
    toastErrorText: "",
  }),
  getters: {
    getIsVisible: (state) => state.visible,
    dialogData: (state) => ({
      ...state,
    }),
  },
  actions: {
    show(
      {
        header,
        showSelect,
        selectItems,
        selectName,
        inputName,
        model,
        methodOnSave,
        methodOnClose,
        toastSuccessText = "",
        toastErrorText = "",
      },
      update = null,
      transformMethod = (state) => ({}),
      remove = null,
      showInput = true,
      showCheckbox = false,
      checkboxValues = {},
    ) {
      this.cancelAndClose();
      this.toastSuccessText = toastSuccessText;
      this.toastErrorText = toastErrorText;
      this.showInput = showInput;
      if (update) {
        this.update = update;
        this.transformMethod = transformMethod;
      }
      if (remove) {
        this.showCheckbox = showCheckbox;
        this.remove = remove;
        this.checkboxValues = checkboxValues;
        this.transformMethod = transformMethod;
      }
      this.visible = true;
      this.header = header;
      this.model = model;
      if (showSelect) {
        this.showSelect = showSelect;
        this.selectItems = selectItems;
        this.selectName = selectName;
      }
      this.inputName = inputName;
      this.methodOnSave = methodOnSave;
    },
    async saveAndClose(toast, nextTick) {
      let res: ApiResponseDto<any>;
      if (this.update) {
        const data = this.transformMethod(this.$state);
        if (data.parent == this.update.id) return null;
        res = await this.model.update(this.update.id, data);
      } else if (this.remove) {
        const data = this.transformMethod(this.$state);
        if (data.transferChildrenTo == this.remove.id) return null;
        res = await this.model.remove(this.remove.id, data);
      } else res = await this.model.create(this.value);

      if (res.success) {
        this.visible = false;
        this.methodOnSave(res.getData());
        this.methodOnClose();
        toast.add({
          severity: "success",
          summary: "Success",
          detail: this.toastSuccessText,
          life: 3000,
        });
        this.$state = { ...defaultValues };
      } else {
        res.toastIfError(toast, nextTick);
      }

      return res;
    },
    cancelAndClose() {
      this.visible = false;
      this.methodOnClose();
      this.$state = { ...defaultValues };
    },
  },
});
