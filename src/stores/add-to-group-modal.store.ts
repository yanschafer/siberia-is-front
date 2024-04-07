import { defineStore } from "pinia";
import ProductGroupDto from "@/api/modules/product/dto/groups/product-group.dto";
import LoggerUtil from "@/utils/logger/logger.util";

export const useAddToGroupModalStore = defineStore({
  id: "add-to-group-modal-store",
  state: () => ({
    addToGroupOpen: false,
    name: "",
    selectedRows: [],
    buttonLabel: "",
    callback: () => {},
    searchTerm: "",
    title: "",
    id: 0,
  }),
  getters: {
    isAddToGroupModalOpened: (state) => state.addToGroupOpen,
    getOutput: (state) => ({
      id: state.id,
      name: state.name,
      products: state.selectedRows,
    }),
  },
  actions: {
    create() {
      /*

        Shadow action to catch create event. Look at AddToGroupComponent.vue created hook

      */
    },
    openCreateModal() {
      this.name = "";
      this.selectedRows = [];
      this.addToGroupOpen = true;
      this.buttonLabel = "+ Create";
      this.title = "Create group";
      this.callback = () => this.create();
    },
    openEditModal(selectedGroup: ProductGroupDto, callback: Function) {
      this.id = selectedGroup.id;
      this.name = selectedGroup.name;
      this.selectedRows = selectedGroup.products;
      LoggerUtil.debug(this.getOutput);
      this.addToGroupOpen = true;
      this.buttonLabel = "Save";
      this.title = "Edit group";
      this.callback = () => callback(this.getOutput);
    },
  },
});
