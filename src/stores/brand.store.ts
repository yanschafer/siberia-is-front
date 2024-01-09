import { defineStore } from "pinia";
import BrandModel from "@/api/modules/brand/models/brand.model";
import LoggerUtil from "@/utils/logger/logger.util";

export const useBrandStore = defineStore({
    id: 'brands',
    state: () => ({
        searchTerm: '',
        brandItems: [],
    }),
    getters: {
        getBrandList: (state) => {
            return () => state.brandItems;
        },
    },
    actions: {
        async loadBrandsList() {
            const brandModel = new BrandModel();
            try {
                const brandList = await brandModel.getAll();
                if (brandList.success) {
                    this.brandItems = brandList.getData();
                    LoggerUtil.debug(this.brandItems)
                } else {
                    console.error("Failed to load brand list");
                }
            } catch (error) {
                console.error("An error occurred while loading brand list:", error);
            }
        },
    },
});