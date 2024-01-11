import { defineStore } from "pinia";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import LoggerUtil from "@/utils/logger/logger.util";

export const useCollectionStore = defineStore({
    id: 'collection',
    state: () => ({
        searchTerm: '',
        collectionItems: [],
    }),
    getters: {
        getCollectionList: (state) => {
            return () => state.collectionItems;
        },
    },
    actions: {
        async loadCollectionList() {
            const collectionModel = new CollectionModel();
            try {
                const collectionList = await collectionModel.getAll();
                if (collectionList.success) {
                    this.collectionItems = collectionList.getData();
                    LoggerUtil.debug(this.collectionItems)
                } else {
                    console.error("Failed to load brand list");
                }
            } catch (error) {
                console.error("An error occurred while loading brand list:", error);
            }
        },
    },
});