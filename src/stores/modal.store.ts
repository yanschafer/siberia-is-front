import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "ModalStore",
  state: () => ({
    visible: false,
    nested: false,
    title: "",
    disclaimer: "",
    text: "",
  }),
  getters: {
    getIsVisible: (state) => state.visible,
    getTitle: (state) => state.title,
    getDisclaimer: (state) => state.disclaimer,
    getText: (state) => state.text,
    getIsNested: (state) => state.nested,
  },
  actions: {
    show({ title, disclaimer, text }, nested = false) {
      this.visible = true;
      this.title = title;
      this.disclaimer = disclaimer;
      this.text = text;
      this.nested = nested;
    },
    hide() {
      this.$state = {
        visible: false,
        nested: false,
        title: "",
        disclaimer: "",
        text: "",
      };
    },
  },
});
