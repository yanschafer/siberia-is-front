import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "ModalStore",
  state: () => ({
    visible: false,
    title: "",
    disclaimer: "",
    text: "",
  }),
  getters: {
    getIsVisible: (state) => state.visible,
    getTitle: (state) => state.title,
    getDisclaimer: (state) => state.disclaimer,
    getText: (state) => state.text,
  },
  actions: {
    show({ title, disclaimer, text }) {
      this.visible = true;
      this.title = title;
      this.disclaimer = disclaimer;
      this.text = text;
    },
    hide() {
      this.$state = {
        visible: false,
        title: "",
        disclaimer: "",
        text: "",
      };
    },
  },
});
