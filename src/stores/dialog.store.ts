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
  showCheckbox: true,
  checkboxValues: {},
  remove: null,
  showInput: true,
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
      },
      update = null,
      transformMethod = (state) => ({}),
      remove = null,
      showInput = true,
      showCheckbox = false,
      checkboxValues = {},
    ) {
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
        loggerUtil.debug(this.showSelect, this.selectItems, this.selectName);
      }
      this.inputName = inputName;
      this.methodOnSave = methodOnSave;
    },
    async saveAndClose() {
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
