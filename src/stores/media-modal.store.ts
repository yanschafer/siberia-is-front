import { defineStore } from "pinia";

export const useMediaModalStore = defineStore({
  id: "media-modal-store",
  state: () => ({
    uploadOpen: false,
    imageOpen: false,
    selectedImage: null,
  }),
  getters: {
    isUploadModalOpened: (state) => state.uploadOpen,
  },
  actions: {
    openUploadModal() {
      this.uploadOpen = true;
    },
    openImage(image) {
      this.imageOpen = true;
      this.selectedImage = image;
    },
  },
});
