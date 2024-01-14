import { defineStore } from "pinia";
import loggerUtil from "@/utils/logger/logger.util";

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
};

export const useCreationDialogStore = defineStore({
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
  }),
  getters: {
    getIsVisible: (state) => state.visible,
    dialogData: (state) => ({
      ...state,
    }),
  },
  actions: {
    show({
      header,
      showSelect,
      selectItems,
      selectName,
      inputName,
      model,
      methodOnSave,
      methodOnClose,
    }) {
      this.visible = true;
      this.header = header;
      this.model = model;
      if (showSelect) {
        this.showSelect = showSelect;
        this.selectItems = selectItems;
        this.selectName = selectName;
        loggerUtil.debug(this.showSelect, this.selectItems, this.selectName);
      }
      this.inputName = inputName;
      this.methodOnSave = methodOnSave;
    },
    async saveAndClose() {
      const res = await this.model.create(this.value);
      if (res.success) {
        this.visible = false;
        this.methodOnSave(this.value);
        this.methodOnClose();
        this.$state = { ...defaultValues };
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
