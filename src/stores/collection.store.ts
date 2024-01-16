import { defineStore } from "pinia";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import LoggerUtil from "@/utils/logger/logger.util";
import BrandUpdateDto from "@/api/modules/brand/dto/brand-update.dto";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CollectionUpdateDto from "@/api/modules/collection/dto/collection-update.dto";

export const useCollectionStore = defineStore({
  id: "collection",
  state: () => ({
    searchTerm: "",
    collectionItems: [],
  }),
  getters: {
    getCollectionList: (state) => state.collectionItems,
  },
  actions: {
    async loadList() {
      await this.loadCollectionList();
    },
    async loadCollectionList() {
      const collectionModel = new CollectionModel();
      try {
        const collectionList = await collectionModel.getAll();
        if (collectionList.success) {
          this.collectionItems = collectionList.getData();
          LoggerUtil.debug(this.collectionItems);
        } else {
          console.error("Failed to load brand list");
        }
      } catch (error) {
        console.error("An error occurred while loading brand list:", error);
      }
    },
    async remove(collectionId: number) {
      const collectionModel = new CollectionModel();
      return await collectionModel.remove(collectionId);
    },
    async update(brandId: number, data: CollectionUpdateDto) {
      const collectionModel = new CollectionModel();
      return await collectionModel.update(brandId, data);
    },
  },
});
