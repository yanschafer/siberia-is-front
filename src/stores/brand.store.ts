import { defineStore } from "pinia";
import BrandModel from "@/api/modules/brand/models/brand.model";
import LoggerUtil from "@/utils/logger/logger.util";
import BrandUpdateDto from "@/api/modules/brand/dto/brand-update.dto";

export const useBrandStore = defineStore({
  id: "brands",
  state: () => ({
    searchTerm: "",
    brandItems: [],
  }),
  getters: {
    getBrandList: (state) => state.brandItems,
  },
  actions: {
    async loadList() {
      await this.loadBrandsList();
    },
    async loadBrandsList() {
      const brandModel = new BrandModel();
      try {
        const brandList = await brandModel.getAll();
        if (brandList.success) {
          this.brandItems = brandList.getData();
          LoggerUtil.debug(this.brandItems);
        } else {
          console.error("Failed to load brand list");
        }
      } catch (error) {
        console.error("An error occurred while loading brand list:", error);
      }
    },
    async remove(brandId: number) {
      const brandModel = new BrandModel();
      return await brandModel.remove(brandId);
    },
    async update(brandId: number, data: BrandUpdateDto) {
      const brandModel = new BrandModel();
      return await brandModel.update(brandId, data);
    },
  },
});
