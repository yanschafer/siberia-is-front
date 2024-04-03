import { defineStore } from "pinia";

export const useAddToGroupModalStore = defineStore({
  id: "add-to-group-modal-store",
  state: () => ({
    addToGroupOpen: false,
  }),
  getters: {
    isAddToGroupModalOpened: (state) => state.addToGroupOpen,
  },
  actions: {
    openModal() {
      this.addToGroupOpen = true;
    },
  },
});
