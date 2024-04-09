import { defineStore } from "pinia";

export const useCollectionSelectorStore = defineStore({
  id: "collection-selector-store",
  state: () => ({
    validateRes: true,
    value: null,
  }),
});
