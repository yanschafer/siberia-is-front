import { defineStore } from "pinia";
import GalleryInputDto from "@/api/modules/gallery/dto/gallery-input.dto";
import GalleryModel from "@/api/modules/gallery/models/gallery.model";
import GalleryUpdateDto from "@/api/modules/gallery/dto/gallery-update.dto";

export const useMediaStore = defineStore({
  id: "media-store",
  state: () => ({
    uploadOpen: false,
    searchTerm: "",
    galleryItems: [],
  }),
  getters: {
    isUploadModalOpened: (state) => state.uploadOpen,
  },
  actions: {
    async loadGallery() {
      const galleryModel = new GalleryModel();

      const loadRes = await galleryModel.getAll({});
      if (loadRes.success) {
        this.galleryItems = loadRes
          .getData()
          .map((el) => ({ ...el, selected: false }));
      }

      return loadRes;
    },
    async uploadFile(file: File, base64Encoded: string) {
      const galleryModel = new GalleryModel();
      const galleryInputDto = new GalleryInputDto(
        file.name,
        file.name,
        base64Encoded,
        "",
      );
      const createRes = await galleryModel.create([
        galleryInputDto,
      ] as GalleryInputDto);

      this.loadGallery();

      return createRes;
    },
    async updateImage(id: number, updateDto: GalleryUpdateDto) {
      const galleryModel = new GalleryModel();

      const updateRes = await galleryModel.update(id, updateDto);
      if (updateRes.success) {
        this.galleryItems = this.galleryItems.map((el) => {
          if (el.id == id) return updateRes.getData();
          else return el;
        });
      }

      return updateRes;
    },
    async removeImage(id: number, sync = true) {
      const galleryModel = new GalleryModel();

      const removeRes = await galleryModel.remove(id);
      if (removeRes.success && sync) {
        this.galleryItems = this.galleryItems.filter((el) => el.id != id);
      }

      return removeRes;
    },
    removeFromList(ids: number[]) {
      this.galleryItems = this.galleryItems.filter(
        (el) => !ids.includes(el.id),
      );
    },
    clearList() {
      this.galleryItems = [];
    },
    toggleAll(value: boolean) {
      this.galleryItems = this.galleryItems.map((el) => ({
        ...el,
        selected: value,
      }));
    },
    openUploadModel() {
      this.uploadOpen = true;
    },
  },
});
